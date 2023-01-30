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
        </head>
        <body>
        <h1>Location Detail</h1>
        <div id="return">
            <a href="/overview"><img class="icon" src="../public/images/return.png" alt="return" title="return" /></a>
            <a href="/overview"><span id="returnText">Go Back</span></a>
        </div>
        ${location.map(createRow).join('')}
        <div id="map"></div>
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
        <script
          src="https://maps.googleapis.com/maps/api/js?key=&callback=initMap&v=weekly"
          defer>
        </script>
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

    return `<div id="Street">Street: ${location.street}</div>
            <div id="Housenumber">Housenumber: ${location.housenumber}</div>
            <div id="Postalcode">Postalcode: ${location.postalcode}</div>
            <div id="City">City: ${location.city}</div>
            <div id="Country">Country: ${location.country}</div>
            ${location.latitude ? `<div id="Latitude">Latitude: ${location.latitude}</div>` : ''}
            ${location.longitude ? `<div id="Longitude">Longitude: ${location.longitude}</div>` : ''}`;
}

module.exports = getDetailLocation;
