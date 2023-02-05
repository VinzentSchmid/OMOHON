const connection = require('./config')

function getAllLocations() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM locations ORDER BY street, housenumber;';
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

function addLocation(location) {
    return new Promise((resolve, reject) => {
        const query = location.image !== undefined ? 'INSERT INTO locations (latitude, longitude, street, housenumber, postalcode, city, country, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)' : 'INSERT INTO locations (latitude, longitude, street, housenumber, postalcode, city, country) VALUES (?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [Number(location.latitude), Number(location.longitude), location.street.trim(), Number(location.housenumber.trim()), Number(location.postalcode.trim()), location.city.trim(), location.country.trim(), location.image], (error, results) => {
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
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function updateLocation(location) {
    return new Promise((resolve, reject) => {
        const query = "UPDATE locations SET latitude = ?, longitude = ?, street = ?, housenumber = ?, postalcode = ?, city = ?, country = ?, image = ? WHERE id = ?";
        connection.query(query, [location.latitude, location.longitude, location.street.trim(), Number(location.housenumber.trim()), Number(location.postalcode.trim()), location.city.trim(), location.country.trim(), location.image, location.id], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
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
        const query = 'SELECT * FROM locations RIGHT JOIN waterentries ON waterentries.locations_id = locations.id ORDER BY type, amount;';
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

function getDistinctWaterEntriesTypes() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT DISTINCT type FROM locations RIGHT JOIN waterentries ON waterentries.locations_id = locations.id ORDER BY type, amount;';
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
        const query = 'SELECT * FROM locations RIGHT JOIN waterentries ON waterentries.locations_id = locations.id WHERE waterentries.id = ?;';
        connection.query(query, [id], (error, results) => {
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
        const query = 'INSERT INTO waterentries (ml, type, amount, locations_id) VALUES (?, ?, ?, ?)';
        const location = Number(liquid.location);
        connection.query(query, [liquid.ml, liquid.type.trim(), Number(liquid.amount), location === -1 || isNaN(location) ? null : location], (error, results) => {
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
        connection.query(query, [id], (error, results) => {
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
        const query = 'UPDATE waterentries SET ml = ?, type = ?, amount = ?, locations_id = ? WHERE id = ?';
        const location = Number(liquid.location);
        connection.query(query, [liquid.ml, liquid.type.trim(), Number(liquid.amount), location === -1 || isNaN(location) ? null : location, liquid.id], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function mapLocationToWaterEntry(entryID, locationID) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE waterentries SET locations_id = ? WHERE id = ?';
        connection.query(query, [Number(locationID), Number(entryID)], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getLocationbyLatAndLong(latitude, longitude) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM locations WHERE latitude = ? AND longitude = ?';
        connection.query(query, [latitude, longitude], (error, results) => {
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
    connection.query('INSERT INTO locations SET images = ?', {image: image}, (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};



module.exports = {
    getAllLocations,
    search,
    insertImage,
    getLocationByID(id) {
        return getLocationByID(id)
    },
    removeLocation(id) {
        return removeLocation(id)
    },
    addLocation(location) {
        if (!location.id) {
            return addLocation(location);
        } else {
            return updateLocation(location);
        }
    },
    getAllWaterEntries,
    getWaterEntryByID(id) {
        return getWaterEntryByID(id)
    },
    removeWaterEntry(id) {
        return removeWaterEntry(id)
    },
    addWaterEntry(waterEntry) {
        if (!waterEntry.id) {
            return addWaterEntry(waterEntry);
        } else {
            return updateWaterEntry(waterEntry);
        }
    },
    mapLocationToWaterEntry(entryID, locationID) {
        return mapLocationToWaterEntry(entryID, locationID);
    },
    getDistinctWaterEntriesTypes,
    getLocationbyLatAndLong(latitude, longitude) {
        return getLocationbyLatAndLong(latitude, longitude);
    }
}