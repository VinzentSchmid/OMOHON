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

function addLocation(location, image64){
    return new Promise((resolve, reject) => {
        console.log(location);
        const query = 'INSERT INTO locations (street, housenumber, postalcode, city, country, image) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [location.street, Number(location.housenumber), Number(location.postalcode), location.city, location.country, image64], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
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
function search(query) {
    return new Promise((resolve, reject) => {
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

function getAllWaterEntries() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM locations RIGHT JOIN waterentries ON waterentries.locations_id = locations.id;';
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

function getWaterEntryByID2(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM locations RIGHT JOIN waterentries ON waterentries.id = ? AND waterentries.locations_id = locations.id';
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

const insertImage = (image, callback) => {
    connection.query('INSERT INTO locations SET images = ?', { image: image }, (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};


module.exports = {
    getAllLocations,
    search,
    insertImage,
    getLocationByID(id){
        return getLocationByID(id)
    },
    removeLocation(id){
        return removeLocation(id)
    },
    addLocation(location, image64){
        if(!location.id){
            return addLocation(location, image64);
        } else {
            return updateLocation(location, image64);
        }
    },
    getAllWaterEntries,
    getWaterEntryByID(id){
        return getWaterEntryByID(id)
    },
    getWaterEntryByID2(id){
        return getWaterEntryByID2(id)
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