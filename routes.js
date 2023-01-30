const express = require("express")
const getAllLocations = require("./views/overview");
const getDetailLocation = require("./views/details");
const router = express.Router();
const db = require('./database')
const path = require("path");
const {getLocationByID} = require("./database");

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
router.get("/deleteLocation/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.removeLocation(id).then(
        location => {
            res.writeHead(302, {location: '/overview', 'content-type': 'text/plain'});
            res.end('302 Redirecting to /overview');
        },
        error => res.send("error")
    );
});
router.get("/detailLocation/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.getLocationByID(id).then(
        location => {
            res.status(200).send(getDetailLocation(location));
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

module.exports = router;