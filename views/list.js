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
        <a href="/export"><img class="icon" src="/public/images/export.png" alt="export" title="export locations" /></a>
     </body>
 </html>`;
}
// TODO: add elements, which you like add to the table
function createRow(location) {
    return `<tr>
                <td>${location.street}</td>
                <td>${location.housenumber}</td>
                <td>${location.postalcode}</td>
                <td>${location.city}</td>
                <td>${location.country}</td>
                <td><a href="/delete/${location.id}"><img class="icon" src="/public/images/delete.png" alt="delete location" title="delete location"/></a></td>
                <td><a href="/edit/${location.id}"><img class="icon" src="/public/images/edit.png" alt="edit location" title="edit location"/></a></td>
            </tr>`;
}
module.exports = getAllLocations;
