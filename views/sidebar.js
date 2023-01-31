//create a sidebar

function createSidebar(){
    return `<div id="sidebar">
                <ul>
                    <li><a href="/waterEntries">Water Entries</a></li>
                    <li><a href="/locations">Locations</a></li>
                </ul>
            </div>`;
}

module.exports = createSidebar;