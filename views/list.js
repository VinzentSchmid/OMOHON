// creates and returns complete overview page with HTML and CSS reference
// TODO: manage which rows are shown
function getAllLocations(locations) {
    console.log("getAllLocations")
    console.log(locations);
    return `<!DOCTYPE html>
 <html>
    <head>
        <title>Locations Overview</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/public/css/style.css" />
    </head>
     <body>
        <h1>Locations Overview</h1>
        <table>
            <tr>
                <th>id</th><th>Location</th><th>Amount</th><th colspan="2">actions</th>
            </tr>
    
            ${locations.map(createRow).join('')}
    
        </table>
        <a href="/new"><img class="icon" src="/public/images/new.png" alt="new location" title="New Location" /></a>
     </body>
 </html>`;
}
// TODO: add elements, which you like add to the table
function createRow(location) {
    return `<tr>
                <td>${location.id}</td>
                <td><a href="/delete/${location.id}"><img class="icon" src="/public/images/delete.png" alt="delete location" title="delete location"/></a></td>
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
 <a href="/new"><img class="icon" src="/static/images/new.png"
alt="new liquid" title="new liquid" /></a>
 </body>
 </html>`;
}

// create each row with TR and TD Elements
function createWaterEntryRow(entry) {
    console.log(entry)
    return `<tr>
 <td>${entry.id}</td>
 <td>${entry.type}</td>
 <td>${entry.ml}</td>
 <td>${entry.location_id}</td>
 <td><a href="/delete/${entry.id}"><img class="icon"
src="/static/images/delete.png" alt="delete liquid" title="delete liquid"
/></a></td>
 <td><a href="/edit/${entry.id}"><img class="icon"
src="/static/images/edit.png" alt="edit liquid" title="edit liquid"
/></a></td>
 </tr>`;
}

module.exports = {
    getWaterEntriesList,
}