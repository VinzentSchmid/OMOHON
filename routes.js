const express = require("express")
const formidable = require("formidable");
const db = require('./database')
const {getWaterEntriesList, getAllLocations} = require("./views/overview");
const router = express.Router();
const details = require("./views/details");
const path = require("path");
const {getWaterEntryForm, getNewLocationForm} = require("./views/form")
const csv = require('fast-csv');
const options = {
    headers: true,
    delimiter: ';',
    quoted_string: true,
    encoding: 'utf8',

};
const fs = require('fs');

const nodeGeocoder = require('node-geocoder');
const errorView = require("./views/errorview");
const {getLocationbyLatAndLong} = require("./database");

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
                    db.getDistinctWaterEntriesTypes().then(
                        types => {
                            res.send(getWaterEntryForm(liquid, locations, types))
                        },
                        error => {
                            res.send(errorView(error));
                        }
                    )
                },
                error => {
                    res.send(errorView(error));
                }
            )

        },
        error => {
            res.send(errorView(error));
        }
    )

});
router.get("/removeWaterEntry/:id", (req, res) => {
    db.removeWaterEntry(req.params.id).then(
        () => {
            res.redirect('/waterEntries')
        },
        error => {
            res.send(errorView(error));
        }
    )
});
router.get("/newWaterEntry", (req, res) => {
    db.getAllLocations().then(
        locations => {
            db.getDistinctWaterEntriesTypes().then(
                types => {
                    res.send(getWaterEntryForm(undefined, locations, types))
                },
                error => {
                    res.send(errorView(error));
                }
            )

        },
        error => {
            res.send(errorView(error));
        }
    )
});
router.post("/addWaterEntry", (req, res) => {
    const form = new formidable.IncomingForm();
    const requiredFields = ["type", "ml", "amount"];
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
            try {
                Number.parseInt(value)
            } catch (e) {
                form._error("housenumber name must be an Integer!")
            }
            if (value > 500) {
                form._error('Please select 500ml or lower!');
            }
        }
        if (name === "amount") {
            try {
                Number.parseInt(value)
            } catch (e) {
                form._error("housenumber name must be an Integer!")
            }
            if (value <= 1) {
                form._error('Please select a number!');
            }

        }
    });

    form.parse(req, (err, liquid) => {

        if (err) {
            res.send(errorView(err));
            return
        }

        db.addWaterEntry(liquid).then(
            () => {
                res.writeHead(302, {
                    location: '/waterentries', 'content-type':
                        'text/plain'
                });
                res.end('302 Redirecting to /waterentries');
            },
            error => {
                res.send(errorView(error));
            }
        );
    });

});

router.get("/mapLocationToWaterEntry/:entryID/:locationID", (req, res) => {
    db.mapLocationToWaterEntry(req.params.entryID, req.params.locationID).then(
        () => {
            res.writeHead(302, {
                location: '/waterEntries', 'content-type': 'text/plain'
            });
            res.end('302 Redirecting to /waterEntries');
        },
        error => {
            res.send(errorView(error));
        }
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
            res.send(errorView(error));
        }
    )
});

router.get("/detailWaterEntry/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.getWaterEntryByID(id).then(
        entry => {
            res.status(200).send(details.getDetailWaterEntry(entry));
        },
        error => {
            res.send(errorView(error));
        }
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
            res.send(errorView(error));
        }
    );
});
router.get("/newLocation/:id", (req, res) => {
    res.send(getNewLocationForm(undefined, undefined, req.params.id))
});
router.get("/newLocation", (req, res) => {
    res.send(getNewLocationForm())
});
router.get("/editLocation/:id", (req, res) => {
    db.getLocationByID(req.params.id).then(
        location => {
            res.send(getNewLocationForm(location[0]))
        },
        error => {
            res.send(errorView(error));
        }
    )
});

router.post("/addLocation/:id", (req, res) => {
    const form = new formidable.IncomingForm();
    const requiredFields = ["street", "housenumber", "postalcode", "city", "country"];
    form.on("field", function (name, value) {

        if (requiredFields.indexOf(name) > -1 && !value) {
            form._error('Required field is empty!');
        }

        if (name === "street") {
            const regexStreet = /^[a-zA-ZßöäüÖÄÜ\s]+$/;
            if (value.trim() === "" || !regexStreet.test(value)) {
                form._error("Street name wrong!")
            }
        }

        if (name === "housenumber") {
            const regexHousenumber = /\s?[\d]+\s?/;
            if (value.trim() === "" || !regexHousenumber.test(value)) {
                form._error("Housenumber wrong!")
            }
            try {
                Number.parseInt(value)
            } catch (e) {
                form._error("housenumber name must be an Integer!")
            }
        }

        if (name === "postalcode") {
            const regexPostalcode = /\s?[\d]+\s?/;
            if (value.trim() === "" || !regexPostalcode.test(value)) {
                form._error("Postal Code must be entered!")
            }
            try {
                Number.parseInt(value)
            } catch (e) {
                form._error("Postal Code must be an Integer!")
            }
        }

        if (name === "city") {
            const regexCity = /^[a-zA-ZßöäüÖÄÜ\s]+$/;
            if (value.trim() === "" || !regexCity.test(value)) {
                form._error("City must be entered!")
            }
        }

        if (name === "country") {
            const regexCountry = /^[a-zA-ZßöäüÖÄÜ\s]+$/;
            if (value.trim() === "" || !regexCountry.test(value)) {
                form._error("Country must be entered!")
            }
        }
    });

    form.parse(req, (err, location, files) => {
        if (err) {
            res.send(getNewLocationForm(location, err));
            return;
        }

        let optionsMap = {
            provider: 'openstreetmap'
        };

        let geoCoder = nodeGeocoder(optionsMap);
        geoCoder.geocode(location)
            .then((geocode) => {
                if (geocode.length === 0) {
                    res.send(getNewLocationForm(location, "Please enter an existing location!"));
                    return;
                }
                location.latitude = geocode[0].latitude;
                location.longitude = geocode[0].longitude;
                if (files.image.originalFilename !== "") {
                    if (files.length > 1) {
                        res.send(getNewLocationForm(location, "Please select only one image!"));
                        return;
                    }

                    const extension = files.image.originalFilename.split('.').pop();

                    // Validate the file extension
                    if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                        res.send(getNewLocationForm(location, "Image must be an jpg, jpeg or png!"));
                        return;
                    }

                    // Validate the file size
                    if (files.image.size > 50000) {
                        res.send(getNewLocationForm(location, "Image must be smaller than 50kB!"));
                        return;

                    }
                }
                fs.readFile(files.image.filepath, (err, data) => {
                    if (err) {
                        res.send(getNewLocationForm(location, err));
                        return;
                    }
                    location.image = data.toString('base64');
                    getLocationbyLatAndLong(location.latitude, location.longitude).then(
                        checkList => {
                            if (checkList.length > 0) {
                                res.send(getNewLocationForm(location, "Location already exists!"));
                                return;
                            }else{
                                db.addLocation(location).then(
                                    location => {
                                        if (!isNaN(req.params.id)) {
                                            db.mapLocationToWaterEntry(req.params.id, location.insertId).then(
                                                () => {
                                                    res.writeHead(302, {
                                                        location: '/waterentries', 'content-type': 'text/plain'
                                                    });
                                                    res.end('302 Redirecting to /waterentries');
                                                },

                                                error => {
                                                    res.send(errorView(error));
                                                }
                                            )
                                        } else {
                                            res.writeHead(302, {
                                                location: '/locations', 'content-type': 'text/plain'
                                            });
                                            res.end('302 Redirecting to /locations');
                                        }
                                    },
                                    error => {
                                        res.send(errorView(error));
                                    }
                                )
                            }
                        },
                        error => {
                            res.send(errorView(error));
                        });
                });
            })
            .catch((err) => {
                res.send(err);
            });
    });
});
router.get("/editLocation/:id", (req, res) => {
    db.getLocationByID(req.params.id).then(
        location => {
            res.send(getNewLocationForm(location[0]))
        },
        error => {
            res.send(errorView(error));
        }
    )
});
router.get("/deleteLocation/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.removeLocation(id).then(
        () => {
            res.writeHead(302, {location: '/locations', 'content-type': 'text/plain'});
            res.end('302 Redirecting to /locations');
        },
        error => {
            res.send(errorView(error));
        }
    );
});
router.get("/detailLocation/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.getLocationByID(id).then(
        location => {
            res.status(200).send(details.getDetailLocation(location));
        },
        error => {
            res.send(errorView(error));
        }
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
                     WHERE street LIKE '%${req.query.q}%'
                        OR housenumber LIKE '%${req.query.q}%'
                        OR postalcode LIKE '%${req.query.q}%'
                        OR city LIKE '%${req.query.q}%'
                        OR country LIKE '%${req.query.q}%'`;
            db.search(query).then(
                locations => {
                    res.status(200).send(getAllLocations(locations, req.query.q));
                },
                error => {
                    res.send(errorView(error));
                }
            );
            break;
        case "water":
            //SELECT * FROM locations RIGHT JOIN waterentries ON waterentries.locations_id = locations.id
            query = `SELECT *
                     FROM locations
                              RIGHT JOIN waterentries ON waterentries.locations_id = locations.id
                     WHERE type LIKE '%${req.query.q}%'`;

            db.search(query).then(
                waterentries => {
                    db.getAllLocations().then(
                        locations => {
                            res.send(getWaterEntriesList(waterentries, locations, req.query.q));
                        },
                        error => {
                            res.send(errorView(error));
                        }
                    )
                },
                error => {
                    res.send(errorView(error));
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
            res.setHeader('Content-Type', 'text/csv; charset=UTF-8');
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
            res.send(errorView(error));
            res.status(500).send(error);
        });
});


module.exports = router;