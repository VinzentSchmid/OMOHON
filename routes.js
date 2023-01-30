const express = require("express")
const getAllLocations = require("./views/list");
const router = express.Router();
const db = require('./database')

router.use("/static", express.static('public'));

router.get("/", (req, res) => {
    res.redirect('/overview');
});
router.get("/overview", (req, res) => {
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
router.get("/addLocation", (req, res) => {
    //TODO implement addLocation
});
router.get("/updateLocation", (req, res) => {
    //TODO implement updateLocation
});
router.get("/deleteLocation", (req, res) => {
    //TODO implement deleteLocation
});
router.get("/detailLocation", (req, res) => {
    //TODO implement detailLocation
});
router.get("/search", (req, res) => {
    const query = req.query.q;
    db.searchLocations(query).then(
        locations => {
            res.status(200).send(getAllLocations(locations));
        },
        error => {
            console.log("Error", error);
        }
    );
});


module.exports = router;