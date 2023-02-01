function createSidebar(currentPage){
    let waterEntriesClass = "";
    let locationsClass = "";

    if (currentPage === "/waterEntries") {
        waterEntriesClass = "active";
    } else if (currentPage === "/locations") {
        locationsClass = "active";
    }

    return `<div id="sidebar">
                <ul>
                    <li class="${waterEntriesClass}"><a href="/waterEntries">Water Entries</a></li>
                    <li class="${locationsClass}"><a href="/locations">Locations</a></li>
                </ul>
            </div>`;
}
module.exports = createSidebar;