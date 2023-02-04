function getWaterEntryForm(liquid, locations) {
    if (liquid === undefined) {
        liquid = {
            id: '',
            ml: 0,
            type: ''
        };
    }
    let header = "Add new water entry";
    if (liquid.id) {
        header = "Edit water entry";
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
 data.forEach(location => { 
      const option = document.createElement('option');
      option.value = location.id;
      option.textContent = location.street + ' ' + location.housenumber + ' ' + location.postalcode + ' ' + location.city + ' ' + location.country;
      select.appendChild(option);
 });
 const option = document.createElement('option');
 option.value = 'submit';
 option.id = 'submitOption';
 option.textContent = 'Submit';
 select.appendChild(option);
 
  select.addEventListener("change", function() {
    if (select.value === "submit") {
      window.location = "/newLocation";
    }
  });
});
</script>
 </head>
 <body>
 <h1 id="a">${header}</h1>
 <form class="waterEntryForm" action="/addWaterEntry" method="POST">
 <input type="hidden" id="id" name="id" value="${liquid.id}" />
 <div class="form-group">

 <label class="form-label" for="liquid-choice">Was hast du
getrunken?:</label>
 <input list="liquid-list" id="liquid-choice" name="type"
class="form-control" value="` + liquid.type + `" required pattern="[A-Za-z]*">

 <datalist id="liquid-list">
 <option value="Kaffee">
<option value="Wasser">
<option value="Apfelsaft">
 </datalist>
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
 <div>
  <label for="location">Location</label>
  <select name="location" id="location"></select>
</div>

 <button class="save" type="submit">SAVE</button>

 </form>
 </body>
</html>`;
}

// TODO: Check location Object (edit)

// TODO: Front End validation

function getNewLocationForm(location){
    // if (location == undefined) {
    //     liquid = {
    //         id: '',
    //         ml: 0,
    //         type: ''
    //     };
    // }
    // define different header(s)
    let header = "Add new location";
    // check if alredy exists and fill object

    // if (location.id) {// note = notes.find(nte => nte.id === parseInt(id));
    //     header = "Edit location";
    // }

    // build form within javascript
    const form = `<!DOCTYPE html>
<html>
 <head> 
 <title>${header}</title>
 <meta charset="utf-8">
 <link rel="stylesheet" href="/public/css/style.css" />
 </head>
 <body>
 <h1>${header}</h1>
 
 <form class="locationEntryForm" action="/addLocation" method="POST">
<!--TODO: See other add form (location.id)-->
<!-- TODO: Form Check Validation, Regex, ...-->

 <div>
<!-- Note: For -> id --> 
   <div class="form-group">
 <label class="form-label" for="street">Street:</label>
 <input type="text" id="street" name="street"></div>
 
    <div class="form-group">
 <label class="form-label" for="housenumber">Housenumber:</label>
 <input type="text" id="housenumber" name="housenumber"></div>
 
     <div class="form-group">
 <label class="form-label" for="postalcode">Postal Code:</label>
 <input type="text" id="postalcode" name="postalcode"></div>
 
     <div class="form-group">
 <label class="form-label" for="city">City:</label>
 <input type="text" id="city" name="city"></div>
 
      <div class="form-group">
 <label class="form-label" for="country">Country:</label>
 <input type="text" id="country" name="country"></div>
 
<!-- TODO: Image-->


 <button class="save" type="submit">SAVE</button>

 </form>
 </body>
</html>`;
    return form;
}

module.exports = {getWaterEntryForm, getNewLocationForm};