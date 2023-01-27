//Creates and return detail page with HTML and CSS reference
//TODO
function getDetailLocation(location) {
    console.log("getDetailLocation")
    console.log(location);
    console.log(location.street);
    return `<!DOCTYPE html>
    <html>
        <head>
            <title>Location Detail</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="/public/css/style.css" />
        </head>
        <body>
            <h1>Location Detail</h1>
            <div id="Street">Street: ${location.street}</div>
            <div id="Housenumber">Housenumber: ${location.housenumber}</div>
            <div id="Postalcode">Postalcode: ${location.postalcode}</div>
            <div id="City">City: ${location.city}</div>
            <div id="Country">Country: ${location.country}</div>
        </body>
    </html>`;
}

module.exports = getDetailLocation;
