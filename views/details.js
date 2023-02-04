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

    return ` <div class="locationDetail">
                  <div class="locationPair">
                      <div class="locationLabel">STREET:</div> 
                      <div class="locationValue">${location.street}</div>
                  </div>  
                  <div class="locationPair">
                      <div class="locationLabel">HOUSENUMBER: </div> 
                      <div class="locationValue">${location.housenumber}</div>
                  </div>
                  
                  <div class="locationPair">
                      <div class="locationLabel">POSTALCODE:</div> 
                      <div class="locationValue">${location.postalcode}</div>
                  </div>
                   
                  <div class="locationPair">
                      <div class="locationLabel">CITY:</div>
                      <div class="locationValue"> ${location.city}</div>
                  </div>
                  
                  <div class="locationPair">
                      <div class="locationLabel">COUNTRY: </div>
                      <div class="locationValue">${location.country}</div>
                  </div>
                  <div class="locationPair">
                    ${location.latitude ? `<div class="locationLabel">LATITUDE: </div><div class="locationValue">${location.latitude}</div>` : ''}
                  </div>
                  <div class="locationPair">
                    ${location.longitude ? `<div class="locationLabel">LONGITUDE: </div><div class="locationValue">${location.longitude}</div>` : ''}
                  </div>
            </div>`;
}

function getDetailWaterEntry(entry) {
    return `<!DOCTYPE html>
    <html>
        <head>
            <title>Water Entry Detail</title>
            <link rel="stylesheet" href="/public/css/style.css" />
            <meta charset="utf-8">
        </head>
        <body>
        <h1>WATER ENTRY DETAIL</h1>
        ${createSidebar()}
        ${createRow2(entry)}
        </body>
    </html>`;
}

function createRow2(entry) {
    console.log(entry);
    return ` <div class="locationDetail">
                  <div class="locationPair">
                      <div class="waterLabel">TYPE:</div> 
                      <div class="waterValue">${entry.type}</div>
                  </div>
                  
                  <div class="locationPair">
                      <div class="waterLabel">AMOUNT: </div> 
                      <div class="waterValue">${entry.amount}</div>
                  </div>
                  
                  <div class="locationPair">
                      <div class="waterLabel">ML:</div> 
                      <div class="waterValue">${entry.ml}</div>
                  </div>
                  
                  <div class="locationPair">
                      <div class="waterLabel">CREATED:</div>
                      <div class="waterValue"> ${entry.created}</div>
                  </div>
                  
                  <div class="locationPair">
                      <div class="waterLabel">LOCATION: </div>
                      ${entry.street ? `<div class="waterValue">${entry.street} ${entry.housenumber} ${entry.postalcode} ${entry.city} ${entry.country}</div>` : '<a class="add" href="/newLocation"><img class="icon" src="/public/images/new.png" alt="new location" title="New Location" /><span>Add location</span></a>'}
                  </div>
            </div>`;
}
module.exports = {
    getDetailLocation,
    getDetailWaterEntry
};
