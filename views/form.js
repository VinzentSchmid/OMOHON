
const createSidebar = require('./sidebar');
function getWaterEntryForm(liquid, locations, types) {
    if (liquid === undefined) {
        liquid = {
            id: '',
            ml: 0,
            type: ''
        };
    }
    let header = "Add New Water Entry";
    if (liquid.id) {
        header = "Edit Water Entry";
    }

    return `<!DOCTYPE html>
<html>
 <head> 
 <title>${header}</title>
  <link rel="stylesheet" href="/public/css/style.css" />
 <meta charset="utf-8">
 <script defer>
 document.addEventListener('DOMContentLoaded', function() {
  const data = ${JSON.stringify(locations)};
 const select = document.getElementById('location');
 const liquid = ${JSON.stringify(liquid)};
 const typeList = ${JSON.stringify(types)};
 
 const selectOption = document.createElement('option');
 selectOption.textContent = liquid.locations_id === undefined ? 'Select Location':'No Location';
 select.appendChild(selectOption);
 data.forEach(location => { 
      const option = document.createElement('option');
      option.value = location.id;
      option.textContent = location.street + ' ' + location.housenumber + ' ' + location.postalcode + ' ' + location.city + ' ' + location.country;
      select.appendChild(option);
     if(liquid.locations_id === location.id){
          option.selected = true;
      }
 });
 const option = document.createElement('option');
 option.value = 'submit';
 option.id = 'submitOption';
 option.textContent = 'Create New';
 option.classList.add('submitOption');
 select.appendChild(option);
 
  select.addEventListener("change", function() {
    if (select.value === "submit") {
      window.location = "/newLocation";
    }
  });
 const liquid_choice = document.getElementById('liquid-list');
  for(let i = 0; i < typeList.length; i++) {
    const option = document.createElement('option');
    option.value = typeList[i].type;
    option.textContent = typeList[i].type;
    liquid_choice.appendChild(option);
  }
});
</script>
 </head>
 <body>

 <h1>${header}</h1>
 ${createSidebar()}
 <div class="main">
     <form class="waterEntryForm" action="/addWaterEntry" method="POST">
     <input type="hidden" id="id" name="id" value="${liquid.id}" />
     <div class="form-group">
    
     <label class="form-label" for="liquid-choice">Was hast du
    getrunken?:</label>
     <input list="liquid-list" id="liquid-choice" name="type"
    class="form-control" value="` + liquid.type + `" required pattern="[A-Za-z]*">
     <datalist id="liquid-list">
     </datalist>
     </div>
     <div class="form-group">
     <label class="form-label"  for="amount" >Welche Anzahl an Getränken hast du getruken?:</label>
     <input type="number"  id="amount" name="amount" value="` + liquid.amount + `"  required>
     </div>
     <div class="form-group border">
     <div>Welche Menge hast du getrunken?</div>
         <div class="form-check">
         <input type="radio" id="amount300ml" name="ml" value="300"
        class="form-check-input" ` + (!liquid.ml || liquid.ml === 300 ? 'checked' : '') + ` >
         <label class="form-label" for="amount300ml" >Glas 300ml</label>
         </div>
         <div class="form-check">
         <input type="radio" id="amount500ml" name="ml" value="500" class="form-check-input" ` + (liquid.ml === 500 ? 'checked' : '') + `>
         <label class="form-check-label" for="amount500ml">Krug 500ml</label>
         </div>
     </div>
     <div class="form-group">
  <label class="form-label" for="location">Location</label>
  <select name="location" id="location" value="${liquid.locations_id}"></select>
</div>
     <button class="save" type="submit">SAVE</button>
    
     </form>
 </div>

 </form>
 </body>
</html>`;
}

function getNewLocationForm(location, error, waterEntryID){
    if (location === undefined) {
        location = {
            id: '',
            latitude: '',
            longitude: '',
            street: '',
            housenumber: '',
            postalcode: '',
            city: '',
            country: ''
        };
    }
    let header = "Add New Location";

    if (location.id) {
        header = "Edit Location";
    }
    return `<!DOCTYPE html>
<html>
 <head> 
 <title>${header}</title>
 <meta charset="utf-8">
 <link rel="stylesheet" href="/public/css/style.css" />
 </head>
 <body>
 <h1>${header}</h1>
 
${createSidebar()}
    <div class="main">
 <form class="locationEntryForm" action="/addLocation/${waterEntryID}" method="POST" enctype="multipart/form-data">
 <input type="hidden" id="id" name="id" value="${location.id}">
 ${error ? `<div class="error">${error}</div>` : ''}
 
 <div>
   <div class="form-group">
 <label class="form-label" for="street">Street:</label>
     <input type="text" id="street" name="street" value="${location.street}" required pattern="^[a-zA-ZßöäüÖÄÜ\\s]+$"></div>
 
    <div class="form-group">
 <label class="form-label" for="housenumber">Housenumber:</label>
 <input type="text" id="housenumber" name="housenumber" value="${location.housenumber}" required pattern="[\\d]+"></div>
 
     <div class="form-group">
 <label class="form-label" for="postalcode">Postal Code:</label>
 <input type="text" id="postalcode" name="postalcode" value="${location.postalcode}" required pattern="[\\d]+"></div>
 
     <div class="form-group">
 <label class="form-label" for="city">City:</label>
 <input type="text" id="city" name="city" value="${location.city}" required pattern="^[a-zA-ZßöäüÖÄÜ\\s]+$"></div>
 
      <div class="form-group">
 <label class="form-label" for="country">Country:</label>
 <input type="text" id="country" name="country" value="${location.country}" required pattern="^[a-zA-ZßöäüÖÄÜ\\s]+$"></div>
 
  <input type="file" id="image" name="image" accept="image/png, image/jpeg" >
   ${location.image ? `<img class="imageDetail" id="imageDetail" src="data:image/png;base64,${location.image}"><button class="delete" type="button">DELETE</button>` : `<span></span>`}
 <button class="save" type="submit">SAVE</button>

 <script>
    const deleteButton = document.querySelector('.delete');
   deleteButton.addEventListener('click', () => {
     const imageDetail = document.querySelector('.imageDetail');
     imageDetail.remove();
     deleteButton.remove();
   });
</script>

 </form>
 </div>
 </body>
</html>`;
}

module.exports = {getWaterEntryForm, getNewLocationForm};