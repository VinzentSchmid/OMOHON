const express = require("express")
const router = express.Router();

router.use("/static", express.static('public'));

router.get("/", (req, res) => {
    res.redirect('/overview')
});
router.get("/overview", (req, res) => {
    //TODO implement overview
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

module.exports = router;