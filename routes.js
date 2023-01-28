const express = require("express")
const formidable = require("formidable");
const db = require('./database')
const {getWaterEntriesList} = require("./views/list");
const router = express.Router();
const form = new formidable.IncomingForm();



router.use("/static", express.static('public'));

router.get("/", (req, res) => {
});

// ---------------------------- //
//         Watertracking        //
// ---------------------------- //
router.get("/editWaterEntry/:id", (req, res) => {
    db.getWaterEntryByID(req.params.id).then(
        liquid => {
            res.send('getForm(liquid)')
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
    res.send('getForm()')
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

        console.log()
        db.addWaterEntry(liquid).then(
            liquid => {
                res.writeHead(302, {
                    location: '/overview', 'content-type':
                        'text/plain'
                });
                res.end('302 Redirecting to /overview');
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

// ---------------------------- //
//         Locations            //
// ---------------------------- //
router.get("/locations", (req, res) => {
    //TODO implement overview
});
router.get("/newLocation", (req, res) => {
});
router.get("/addLocation", (req, res) => {
    //TODO implement addLocation
});
router.get("/editLocation:id", (req, res) => {
    //TODO implement updateLocation
});
router.get("/removeLocation:id", (req, res) => {
    //TODO implement deleteLocation
});
router.get("/detailLocation:id", (req, res) => {
    //TODO implement detailLocation
});

module.exports = router;