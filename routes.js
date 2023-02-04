const express = require("express")
const formidable = require("formidable");
const db = require('./database')
const {getWaterEntriesList, getAllLocations} = require("./views/overview");
const router = express.Router();
const form = new formidable.IncomingForm();
const details = require("./views/details");
const path = require("path");
const {getWaterEntryForm, getNewLocationForm} = require("./views/form")
const csv = require('fast-csv');
const multer = require('multer');
const {insertImage} = require("./database");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const options = {
    headers: true,
    delimiter: ';'  // Change the delimiter to ';'
};
const fs = require('fs');


router.use("/static", express.static('public'));

router.get("/", (req, res) => {
    res.redirect('/waterEntries')
});

// ---------------------------- //
//         Watertracking        //
// ---------------------------- //
router.get("/editWaterEntry/:id", (req, res) => {
    db.getWaterEntryByID(req.params.id).then(
        liquid => {
            res.send(getWaterEntryForm(liquid))
        },
        error => {
            console.log("ERROR")
        }
    )

});
router.get("/removeWaterEntry/:id", (req, res) => {
    db.removeWaterEntry(req.params.id).then(
        liquids => {
            res.redirect('/waterEntries')
        },
        error => {
            console.log("ERROR")
        }
    )
});
router.get("/newWaterEntry", (req, res) => {
    res.send(getWaterEntryForm())
});
router.post("/addWaterEntry", (req, res) => {
    const form = new formidable.IncomingForm();
    const requiredFields = ["type", "ml"];
    form.on('field', function (name, value) {

        if (requiredFields.indexOf(name) > -1 && !value) {
            form._error('Required field is empty!');
        }

        if (name === "type") {
            const regex = /^[a-zA-Z\s]+$/;
            if (regex.test(value) === false) {
                form._error('Only text allowed!');
            }
        }

        if (name === "ml") {
            if (value > 500) {
                form._error('Please select 500ml or lower!');
            }
        }
    });

    form.parse(req, (err, liquid, files) => {

        if (err) {
            res.send('getError(err)')
            return
        }

        db.addWaterEntry(liquid).then(
            liquid => {
                res.writeHead(302, {
                    location: '/waterentries', 'content-type':
                        'text/plain'
                });
                res.end('302 Redirecting to /waterentries');
            },
            error => res.send("error")
        );
    });

});
router.get("/waterentries", (req, res) => {
    db.getAllWaterEntries().then(
        liquids => {
            res.send(getWaterEntriesList(liquids))
        },
        error => {
            console.log("ERROR")
        }
    )
});

router.get("/detailWaterEntry/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.getWaterEntryByID2(id).then(
        entry => {
            res.status(200).send(details.getDetailWaterEntry(entry));
        },
        error => res.send("error")
    );
});

// ---------------------------- //
//         Locations            //
// ---------------------------- //
router.get("/locations", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    db.getAllLocations().then(
        locations => {
            res.status(200).send(getAllLocations(locations));
        },
        error => {
            console.log("Error", error);
        }
    );
});
router.get("/newLocation", (req, res) => {
    res.send(getNewLocationForm())
});
router.post("/addLocation", (req, res) => {
    const form = new formidable.IncomingForm();

    form.on("event", function (name, value) {

        if (name === "street" && value.trim() === "") {
            form._error("Street name must be entered!")
        }

        if (name === "housenumber") {
            if (value.trim() === "") {
                form._error("housenumber name must be entered!")
                form._error()
                form.error
            }
            try {
                Number.parseInt(value)
            } catch (e) {
                form._error("housenumber name must be an Integer!")
            }
        }

        if (name === "postalcode") {
            if (value.trim() === "") {
                form._error("Postal Code must be entered!")
            }
            try {
                Number.parseInt(value)
            } catch (e) {
                form._error("Postal Code must be an Integer!")
            }
        }

        if (name === "city") {
            if (value.trim() === "") {
                form._error("City must be entered!")
            }
        }

        if (name === "country") {
            if (value.trim() === "") {
                form._error("Country must be entered!")
            }
        }

    });

    form.parse(req, (err, location, files) => {
        if (err) {
            res.send(err);
            return;
        }


        fs.readFile(files.image.filepath, (err, data) => {
            if (err) {
                res.send(err);
            }

            if (files.image.originalFilename.endsWith(".png") || files.image.originalFilename.endsWith(".jpg") || files.image.originalFilename.endsWith(".jpeg")) {
                const image64 = data.toString('base64');
                db.addLocation(location, image64).then(
                    location => {
                        res.writeHead(302, {
                            location: '/locations', 'content-type': 'text/plain'
                        });
                        res.end('302 Redirecting to /locations');
                    },
                    error => res.send(err));
            } else {
                // TODO Snackbar ODER Rückmeldung
                console.log("pango");
                db.addLocation(location, null).then(
                    location => {
                        res.writeHead(302, {
                            location: '/locations', 'content-type': 'text/plain'
                        });
                        res.end('302 Redirecting to /locations');
                    },
                    error => res.send(err));            }


        });
    });
});

router.get("/editLocation:id", (req, res) => {
    //TODO implement updateLocation
});
router.get("/deleteLocation/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.removeLocation(id).then(
        location => {
            res.writeHead(302, {location: '/locations', 'content-type': 'text/plain'});
            res.end('302 Redirecting to /locations');
        },
        error => {
            console.log("Error Remove", error);
        }
    );
});
router.get("/detailLocation/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.getLocationByID(id).then(
        location => {
            res.status(200).send(details.getDetailLocation(location));
        },
        error => res.send("error")
    );
});
router.get("/public/images/:image", (req, res) => {
    const image = req.params.image;
    res.sendFile(path.join(__dirname, 'public/images/' + image));
});
router.get("/public/css/:stylesheet", (req, res) => {
    const stylesheet = req.params.stylesheet;
    res.sendFile(path.join(__dirname, 'public', 'css', stylesheet));
});
router.get("/search", (req, res) => {
    let query;
    switch (req.query.type) {
        case "location":
            query = `SELECT * FROM locations WHERE street LIKE '%${req.query.q}%';`;
            db.search(query).then(
                locations => {
                    res.status(200).send(getAllLocations(locations));
                },
                error => {
                    console.log("Error", error);
                }
            );
            break;
        case "water":
            query = `SELECT * FROM waterentries, locations WHERE type LIKE '%${req.query.q}%' AND waterentries.locations_id = locations.id or locations.id IS NULL;`;
            db.search(query).then(
                waterentries => {
                    res.status(200).send(getWaterEntriesList(waterentries));
                },
                error => {
                    console.log("Error", error);
                }
            );
            break;
    }
});


router.get('/export', (req, res) => {
    // Query the database to get the locations
    db.getAllLocations()
        .then((results) => {
            // Set the response headers
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="locations.csv"');

            // Stream the data to the response object
            csv.write(results, options).pipe(res);
            // Listen to the finish event of the response object
            // res.on('finish', () => {
            //     // Show the toaster message
            //     alert("Download completed");
            // });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
});


module.exports = router;