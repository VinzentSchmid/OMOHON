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
    }
}