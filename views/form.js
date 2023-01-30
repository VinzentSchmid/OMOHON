function getWaterEntryForm(liquid) {
    if (liquid == undefined) {
        liquid = {
            id: '',
            ml: 0,
            type: ''
        };
    }
    // define different header(s)
    let header = "Add new liquid";
    // check if alredy exists and fill object
    if (liquid.id) {// note = notes.find(nte => nte.id === parseInt(id));
        header = "Edit liquid";
    }
    // build form within javascript
    const form = `<!DOCTYPE html>
<html>
 <head> 
 <title>${header}</title>
 <meta charset="utf-8">
 </head>
 <body>
 <h1>${header}</h1>
 <form action="/addWaterEntry" method="POST">
 <input type="hidden" id="id" name="id" value="${liquid.id}" />
 <div class="form-group">

 <label class="form-label" for="liquid-choice">Was hast du
getrunken?:</label>
 <input list="liquid-list" id="liquid-choice" name="type"
class="form-control" value="` + liquid.type + `" required pattern="[A-Za-z]*">

 <!-- current static list, later will be dynamic through
server logic -->
 <datalist id="liquid-list">
 <option value="Kaffee">
<option value="Wasser">
<option value="Apfelsaft">
 </datalist>
 </div>

 <div class="form-group border">
 Welche Menge hast du getrunken?
 <!-- will be extended by future lessons, add additional amount
by other form -->
 <div class="form-check">
 <input type="radio" id="amount300ml" name="ml" value="300"
class="form-check-input" ` + (!liquid.ml || liquid.ml === 300 ? 'checked' : '') + ` >
 <label class="form-label" for="amount300ml" >Glas
300ml</label>
 </div>
 <div class="form-check">
 <input type="radio" id="amount500ml" name="ml" value="500"
class="form-check-input" ` + (liquid.ml === 500 ? 'checked' : '') + `>
 <label class="form-check-label" for="amount500ml">Krug
500ml</label>
 </div>
 </div>

 <button type="submit">save</button>

 </form>
 </body>
</html>`;
    return form;
}

module.exports = {getWaterEntryForm};