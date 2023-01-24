const connection = require('./config')

function getAllLocations() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM locations;';
        connection.query(query, (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

function getLocationByID(id) {
}

// function addLocation(location) {
function addLocation(location) {
    const query = "INSERT INTO `locations` (`id`, `latitude`, `longitude`, `street`, `housenumber`, `postalcode`, `city`, `country`) VALUES (NULL, location.latitude, location.longitude, location.street, location.housenumber, location.postalcode, location.city, location.country);"
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted")
    })
}

function removeLocation(id) {
}

function updateLocation(location) {
}

module.exports = {
    getAllLocations,
    getLocationByID(id){
        return getLocationByID(id)
    },
    removeLocation(id){
        return removeLocation(id)
    },
    addLocation(location){
        if(!location.id){
            return addLocation(location);
        } else {
            return updateLocation(location);
        }
    }
}