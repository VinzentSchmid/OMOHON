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
      <script>
            document.addEventListener("DOMContentLoaded", function () {
        const linkToDetailElements = document.getElementsByClassName("linkToDetail");
        for (let i = 0; i < linkToDetailElements.length; i++) {
            linkToDetailElements[i].addEventListener("click", function (event) {
                console.log(event);
                console.log(${locations});
                window.location = '/detailLocation/' + location.map(value => i);
            });
        }
    });
        </script>
        <h1>Locations Overview</h1>
        <form action="/search" method="get">
          <input type="text" name="q" placeholder="Search locations...">
          <button type="submit">Search</button>
        </form>
        <table>
            <tr>
                <th>street</th>
                <th>housenumber</th>
                <th>postalcode</th>
                <th>city</th>
                <th>country</th>
            </tr>
            ${locations.map(createRow).join('')}
        </table>
        <a href="/new"><img class="icon" src="/public/images/new.png" alt="new location" title="New Location" /></a>
     </body>
 </html>`;
}
// TODO: add elements, which you like add to the table
function createRow(location) {

    return `<tr id="row">
                <td class="linkToDetail">${location.street}</td>
                <td class="linkToDetail">${location.housenumber}</td>
                <td class="linkToDetail">${location.postalcode}</td>
                <td class="linkToDetail">${location.city}</td>
                <td class="linkToDetail">${location.country}</td>
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
