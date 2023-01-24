const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'omohon'
});

function getAllLocations() {
    return new Promise((resolve, reject) => {
        const query = '';
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
}

function addLocation(location) {
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