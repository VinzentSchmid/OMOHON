const {getAllWaterEntries} = require("../database");

function getAllLocations(locations) {
    return `<!DOCTYPE html>
 <html>
    <head>
        <title>Locations Overview</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/public/css/style.css" />
    </head>
     <body>
        <h1>Locations Overview</h1>
        <div id="add">
            <a href="/new"><img class="icon" src="public/images/new.png" alt="new location" title="New Location" /></a>
            <a href="/new"><span id="addText">Add Location</span></a>
        </div>
        
        <table>
            <tr class="headerTable">
                <th>street</th>
                <th>housenumber</th>
                <th>postalcode</th>
                <th>city</th>
                <th>country</th>
                <th>delete</th>
                <th>edit</th>
            </tr>
    
            ${locations.map(createRow).join('')}
    
        </table>
     </body>
 </html>`;
}
function createRow(location) {
    return `<tr id="row" onclick="window.location='/detailLocation/${location.id}';">
                <td>${location.street}</td>
                <td>${location.housenumber}</td>
                <td>${location.postalcode}</td>
                <td>${location.city}</td>
                <td>${location.country}</td>
                <td><a href="/deleteLocation/${location.id}" onclick="return confirm('Are you sure you want to delete this location ?')"><img class="icon" src="/public/images/delete.png" alt="delete location" title="delete location"/></a></td>
                <td><a href="/edit/${location.id}"><img class="icon" src="/public/images/edit.png" alt="edit location" title="edit location"/></a></td>
            </tr>`;
}

function getWaterEntriesList(entry) {
    return `<!DOCTYPE html>
 <html>
 <head>
 <title>liquids Overview</title>
 <meta charset="utf-8">
 <link rel="stylesheet" href="/static/stylesheets/style.css" />
 </head>
 <body>
 <h1>liquids Overview</h1>
 <table>
 <tr>
 <th>id</th><th>Liquid</th><th>Amount</th><th>Location</th><th
colspan="2">actions</th>
 </tr>

 ${entry.map(createWaterEntryRow).join('')}

 </table>
 <a href="/newWaterEntry"><img class="icon" src="/static/images/new.png"
alt="new liquid" title="new liquid" /></a>
 </body>
 </html>`;
}

// create each row with TR and TD Elements
function createWaterEntryRow(entry) {
    console.log(entry);
    return `<tr>
 <td>${entry.id}</td>
 <td>${entry.type}</td>
 <td>${entry.ml}</td>
 <td>${entry.street} ${entry.housenumber} ${entry.postalcode} ${entry.city} ${entry.country}</td>
 <td><a href="/removeWaterEntry/${entry.id}"><img class="icon"
src="/static/images/delete.png" alt="delete liquid" title="delete liquid"
/></a></td>
 <td><a href="/editWaterEntry/${entry.id}"><img class="icon"
src="/static/images/edit.png" alt="edit liquid" title="edit liquid"
/></a></td>
 </tr>`;
}
module.exports = {
    getWaterEntriesList,
    getAllLocations
};
