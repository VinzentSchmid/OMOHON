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
        <script>
            document.addEventListener("DOMContentLoaded", function () {
        const linkToDetailElements = document.getElementsByClassName("linkToDetail");
        for (let i = 0; i < linkToDetailElements.length; i++) {
            linkToDetailElements[i].addEventListener("click", function (event) {
                window.location = '/detailLocation/' + location.id;
            });
        }
    });
        </script>
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


module.exports = getAllLocations;
