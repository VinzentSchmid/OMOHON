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
const options = {
    headers: true,
    delimiter: ';',  // Change the delimiter to ';'
    quoteColumns: true,
    encoding: 'utf8',

};
const nodeGeocoder = require('node-geocoder');

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
            db.getAllLocations().then(
                locations => {
                    res.send(getWaterEntryForm(liquid, locations))
                },
                error => {
                    console.log("ERROR")
                }
            )

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
    db.getAllLocations().then(
        locations => {
            res.send(getWaterEntryForm(undefined, locations))
        },
        error => {
            console.log("ERROR")
        }
    )
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

router.get("/mapLocationToWaterEntry/:entryID/:locationID", (req, res) => {
    console.log(req.params.entryID)
    console.log(req.params.locationID)
    db.mapLocationToWaterEntry(req.params.entryID, req.params.locationID).then(
        success => {
            res.writeHead(302, {
                location: '/waterEntries', 'content-type': 'text/plain'
            });
            res.end('302 Redirecting to /waterEntries');
        },
        error => console.log("ERROR")
    );
});
router.get("/waterentries", (req, res) => {
    db.getAllWaterEntries().then(
        liquids => {
            db.getAllLocations().then(
                locations => {
                    res.send(getWaterEntriesList(liquids, locations))
                },
                error => {
                    console.log("ERROR");
                }
            )

        },
        error => {
            console.log("ERROR")
        }
    )
});

router.get("/detailWaterEntry/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.getWaterEntryByID(id).then(
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
    // TODO: Add Image

    // TODO: Backend Validation

    form.on("event", function (name, value) {

        if (name === "street" && value.trim() === "") {
            form._error("Street name must be entered!")
        }

        if (name === "housenumber") {
            if (value.trim() === "") {
                form._error("housenumber name must be entered!")
            }try {
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

    form.parse(req, (err, location) => {
        if (err) {
            res.send(getNewLocationForm(location, err));
            return;
        }

        let optionsMap = {
            provider: 'openstreetmap'
        };

        let geoCoder = nodeGeocoder(optionsMap);
        geoCoder.geocode(location)
            .then((geocode)=> {
                if(geocode.length === 0){
                    res.send(getNewLocationForm(location, "No Location found!"));
                    return;
                }
                location.latitude = geocode[0].latitude;
                location.longitude = geocode[0].longitude;
                db.addLocation(location).then(
                    location => {
                        res.writeHead(302, {
                            location: '/locations', 'content-type': 'text/plain'
                        });
                        res.end('302 Redirecting to /locations');
                    },
                    error => res.send(err)
                );
            })
            .catch((err)=> {
                res.send(err);
            });
    });
});
router.get("/editLocation/:id", (req, res) => {
    db.getLocationByID(req.params.id).then(
        location => {
            res.send(getNewLocationForm(location))
        },
        error => {
            console.log("ERROR")
        }
    )
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
            query = `SELECT *
                     FROM locations
                     WHERE street LIKE '%${req.query.q}%';`;
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
            query = `SELECT *
                     FROM waterentries,
                          locations
                     WHERE type LIKE '%${req.query.q}%' AND waterentries.locations_id = locations.id
                        or locations.id IS NULL;`;
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
            const data = results.map((location) => {
                return {
                    id: location.id,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    street: location.street,
                    housenumber: location.housenumber,
                    postalcode: location.postalcode,
                    city: location.city,
                    country: location.country
                };
            });
            // Stream the data to the response object
            csv.write(data, options).pipe(res);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
});


module.exports = router;