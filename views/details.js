//Creates and return detail page with HTML and CSS reference
//TODO

function getDetailLocation(location) {
    console.log("getDetailLocation")
    console.log(location);
    return `<!DOCTYPE html>
    <html>
        <head>
            <title>Location Detail</title>
            <link rel="stylesheet" href="/public/css/style.css" />
            <meta charset="utf-8">
            <style>
                #map {
                    height: 400px;
                    width: 50%;
                }
            </style>
        </head>
        <body>
        ${location.map(createRow).join('')}
        <div id="map"></div>
        <script>
            function initMap() {
              // The location of Uluru
              const uluru = { lat: ${location.map(value => value.latitude)}, lng: ${location.map(value => value.longitude)} };
              // The map, centered at Uluru
              const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 20,
                center: uluru,
              });
              // The marker, positioned at Uluru
              const marker = new google.maps.Marker({
                position: uluru,
                map: map,
              });
            }
            
            window.initMap = initMap;
        </script>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=&callback=initMap&v=weekly"
          defer>
              
        </script>
        </body>
    </html>`;
}

function createRow(location) {
    return `<h1>Location Detail</h1>
            <div id="Street">Street: ${location.street}</div>
            <div id="Housenumber">Housenumber: ${location.housenumber}</div>
            <div id="Postalcode">Postalcode: ${location.postalcode}</div>
            <div id="City">City: ${location.city}</div>
            <div id="Country">Country: ${location.country}</div>
            ${location.latitude ? `<div id="Latitude">Latitude: ${location.latitude}</div>` : ''}
            ${location.longitude ? `<div id="Longitude">Longitude: ${location.longitude}</div>` : ''}`;
}

module.exports = getDetailLocation;
