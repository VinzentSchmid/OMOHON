const connection = require('./config')

function getAllLocations() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM locations;';
        connection.query(query, (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getLocationByID(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM locations WHERE id = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
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
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM locations WHERE id = ?';
        connection.query(query, [id],(error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function updateLocation(location) {
}
function searchLocations(query) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM locations WHERE street LIKE '%${query}%';`;
        connection.query(sql, (error, results) => {
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

function getAllWaterEntries() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM `waterentries`, `locations` WHERE waterentries.locations_id = locations.id or locations.id IS NULL';
        connection.query(query, (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });

}

function getWaterEntryByID(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM waterentries WHERE id = ?';
        connection.query(query, [id],(error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

function addWaterEntry(liquid) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO waterentries (ml, type, amount) VALUES (?, ?, 1)';
        connection.query(query, [liquid.ml, liquid.type],(error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
function removeWaterEntry(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM waterentries WHERE id = ?';
        connection.query(query, [id],(error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

function updateWaterEntry(liquid) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE waterentries SET ml = ?, type = ? WHERE id = ?';
        connection.query(query, [liquid.ml, liquid.type, liquid.id],(error,
                                                                     results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    getAllLocations,
    searchLocations,

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
    },
    getAllWaterEntries,
    getWaterEntryByID(id){
        return getWaterEntryByID(id)
    },
    removeWaterEntry(id){
        return removeWaterEntry(id)
    },
    addWaterEntry(waterEntry){
        if(!waterEntry.id){
            return addWaterEntry(waterEntry);
        } else {
            return updateWaterEntry(waterEntry);
        }
    }
}