//Creates and return detail page with HTML and CSS reference
//TODO
const createSidebar = require('./sidebar');
function getDetailLocation(location) {
    return `<!DOCTYPE html>
    <html>
        <head>
            <title>Location Detail</title>
            <link rel="stylesheet" href="/public/css/style.css" />
            <meta charset="utf-8">
            <script src="https://maps.googleapis.com/maps/api/js?key=&callback=initMap&v=weekly" defer>
            </script>
            <script>
                function initMap() {
                  // The location
                  const location = { lat: ${location.map(value => value.latitude)}, lng: ${location.map(value => value.longitude)} };
                  // The map, centered at location
                  const map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 20,
                    center: location,
                  });
                  // The marker, positioned at location
                  const marker = new google.maps.Marker({
                    position: location,
                    map: map,
                  });
                }
                
                window.initMap = initMap;
            </script>
        </head>
        <body>
        <h1>LOCATION DETAIL</h1>
        ${createSidebar()}
        ${location.map(createRow).join('')}
        <div id="map"></div>
        </body>
    </html>`;
}

function createRow(location) {
    return ` <div id="locationDetail">
                  <div class="locationLabel">Street:</div> 
                  <div class="locationValue">${location.street}</div>
  
                  <div class="locationLabel">Housenumber: </div> 
                  <div class="locationValue">${location.housenumber}</div>
  
                  <div class="locationLabel">Postalcode:</div> 
                  <div class="locationValue">${location.postalcode}</div>
  
                  <div class="locationLabel">City:</div>
                  <div class="locationValue"> ${location.city}</div>
  
                  <div class="locationLabel">Country: </div>
                  <div class="locationValue">${location.country}</div>
  
                  ${location.latitude ? `<div class="locationLabel">Latitude: </div><div class="locationValue">${location.latitude}</div>` : ''}
  
                  ${location.longitude ? `<div class="locationLabel">Longitude: </div><div class="locationValue">${location.longitude}</div>` : ''}
            </div>`;

    return `<div id="STREET">Street: ${location.street}</div>
            <div id="HOUSENUMBER">Housenumber: ${location.housenumber}</div>
            <div id="POSTALCODE">Postalcode: ${location.postalcode}</div>
            <div id="CITY">City: ${location.city}</div>
            <div id="COUNTRY">Country: ${location.country}</div>
            ${location.latitude ? `<div id="LATITUDE">Latitude: ${location.latitude}</div>` : ''}
            ${location.longitude ? `<div id="LONGITUDE">Longitude: ${location.longitude}</div>` : ''}`;
}

module.exports = getDetailLocation;
