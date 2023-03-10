const createSidebar = require('./sidebar');
function getAllLocations(locations, filter) {
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
                    let id = linkToDetailElements[i].parentElement.children[0].innerHTML;
                    linkToDetailElements[i].addEventListener("click", function (event) {
                        window.location = '/detailLocation/'+ id;
                    });
                }
            });
        </script>
    </head>
     <body>
        <h1>LOCATIONS</h1>
        ${createSidebar('/locations')}
        <div class="main">
            <div class="action">
                <a class="add" href="/newLocation"><img class="icon" src="/public/images/new.png" alt="new location" title="New Location" /><span>Add Location</span></a>
                <a id="csv-download" class="add" href="/export"><img class="icon" src="/public/images/export.png" alt="export all locations" title="download Locations dataset" /><span>Export</span></a>
            </div>
            <form id="searchBar" action="/search" method="get">
              <input type="text" name="q" placeholder="${!filter || filter.length === 0 ? 'Search Locations...' : filter}">
              <input type="hidden" name="type" value="location">
              <button type="submit">Search</button>
              <button type="reset" onClick="window.location.href='/locations'">Reset</button>
            </form>
            <table>
                <tr>
                    <th>STREET</th>
                    <th>HOUSENUMBER</th>
                    <th>POSTALCODE</th>
                    <th>CITY</th>
                    <th>COUNTRY</th>
                </tr>
                ${locations.map(createRow).join('')}
            </table>
        </div>
     </body>
 </html>`;
}
function createRow(location) {
    return `<tr class="row">
                <td class="linkToDetail" hidden="hidden">${location.id}</td>
                <td class="linkToDetail">${location.street}</td>
                <td class="linkToDetail">${location.housenumber}</td>
                <td class="linkToDetail">${location.postalcode}</td>
                <td class="linkToDetail">${location.city}</td>
                <td class="linkToDetail">${location.country}</td>
                <td class="no-hover"><a href="/deleteLocation/${location.id}" onclick="return confirm('Are you sure you want to delete this location?')"><img class="icon" src="/public/images/delete.png" alt="delete location" title="delete location"/></a></td>
                <td class="no-hover"><a href="/editLocation/${location.id}"><img class="icon" src="/public/images/edit.png" alt="edit location" title="edit location"/></a></td>
            </tr>`;
}

function getWaterEntriesList(entries, locations, filter) {
    return `<!DOCTYPE html>
 <html lang="en">
 <head>
 <title>Water Entries Overview</title>
 <meta charset="utf-8">
 <link rel="stylesheet" href="/public/css/style.css" />
         <script>
          const data = ${JSON.stringify(locations)};
            document.addEventListener("DOMContentLoaded", function () {
                const linkToDetailElements = document.getElementsByClassName("linkToEntry");
                const rows = document.getElementsByClassName('row');
                
                for (let i = 0; i < linkToDetailElements.length; i++) {
                    let id = linkToDetailElements[i].parentElement.id;
                    linkToDetailElements[i].addEventListener("click", function (_) {
                        window.location = '/detailWaterEntry/'+ id;
                    });
                }
                for(let i = 0; i < rows.length; i++) {
                  let id = rows[i].id;
                  const select = document.getElementById(id+'select');
                 if(!select){
                     continue;
                 }
                  const selectOption = document.createElement('option');
                      selectOption.value = 'select';
                      selectOption.textContent = 'Select Location';
                      select.appendChild(selectOption);
                      
                 data.forEach(location => { 
                      const option = document.createElement('option');
                      option.value = location.id;
                      option.textContent = location.street + ' ' + location.housenumber + ' ' + location.postalcode + ' ' + location.city + ' ' + location.country;
                      select.appendChild(option);
                 });

                 const optionSubmit = document.createElement('option');
                 optionSubmit.value = 'submit';
                 optionSubmit.id = 'submitOption';
                 optionSubmit.textContent = 'Create New';
                 optionSubmit.classList.add('submitOption');
                 select.appendChild(optionSubmit);
                 
                  select.addEventListener("change", function() {
                    if (select.value === "submit") {
                      window.location = "/newLocation/"+id;
                    }else if(select.value === "select"){}
                    else{
                        window.location = "/mapLocationToWaterEntry/" + id + '/' + select.value;
                    }
                  });
                }  
                 const resetBtn = document.getElementById('reset');
            if(!${JSON.stringify(filter)}){
                resetBtn.disabled = true;
            }
            });   
           
        </script>
        
 </head>
 <body>
 <h1>WATER ENTRIES</h1>
 ${createSidebar("/waterEntries")}
 <div class="main">
<div class="action">
 <a class="add" href="/newWaterEntry"><img class="icon" src="../public/images/new.png"
alt="new liquid" title="new liquid" /><span>Add Water Entry</span></a>
</div>

<form id="searchBar" action="/search" method="get">
  <input type="text" name="q" placeholder="${!filter || filter.length === 0 ? 'Search Drinks...' : filter}">
  <input type="hidden" name="type" value="water">
  <button type="submit">Search</button>
  <button id="reset" type="reset" onClick="window.location.href='/waterEntries'">Reset</button>
</form>
 <table>
 <tr>
    <th>LIQUID</th>
    <th>ML</th>
    <th>AMOUNT</th>
    <th>LOCATION</th> 
 </tr>

 ${entries.map(createWaterEntryRow).join('')}

 </table>
</div>
 </body>
 </html>`;
}

function createWaterEntryRow(entry) {
    return `<tr class="row" id="${entry.id}">
                 <td class="linkToEntry">${entry.type}</td>
                 <td class="linkToEntry">${entry.ml}</td>
                 <td class="linkToEntry">${entry.amount}</td>
                 ${entry.street ? `<td class="linkToEntry">${entry.street} ${entry.housenumber} ${entry.postalcode} ${entry.city} ${entry.country}</td>` : `<td class="newLocation"><select name="location" id="${entry.id}select"></select></td>`}
                 <td class="no-hover"><a href="/removeWaterEntry/${entry.id} "onclick="return confirm('Are you sure you want to delete this entry?')"><img class="icon" src="/public/images/delete.png" alt="delete liquid" title="delete liquid"/></a></td>
                 <td class="no-hover"><a href="/editWaterEntry/${entry.id}"><img class="icon" src="/public/images/edit.png" alt="edit liquid" title="edit liquid"/></a></td>
            </tr>`;
}
module.exports = {
    getWaterEntriesList,
    getAllLocations
};
