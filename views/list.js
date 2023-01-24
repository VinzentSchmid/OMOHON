// creates and returns complete overview page with HTML and CSS reference
// TODO: manage which rows are shown
function getLocationList(locations) {
    console.log("getLocationsList")
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
        <a href="/new"><img class="icon" src="/static/images/new.png" alt="new location" title="New Location" /></a>
     </body>
 </html>`;
}
// TODO: add elements, which you like add to the table
function createRow(location) {
    return `<tr>
                <td>${location.id}</td>
                <td><a href="/delete/${liquid.id}"><img class="icon" src="/public/images/delete.png" alt="delete liquid" title="delete liquid"/></a></td>
                <td><a href="/edit/${liquid.id}"><img class="icon" src="/public/images/edit.png" alt="edit liquid" title="edit liquid"/></a></td>
            </tr>`;
}