const createSidebar = require("./sidebar");

function addError(error){
    return `<!DOCTYPE html>
    <html>
        <head>
            <title>ErrorPage</title>
            <link rel="stylesheet" href="/public/css/style.css" />
            <meta charset="utf-8">
        </head>
        <body>
        <h1>Error</h1>
        ${createSidebar()}
        <div class="main">
            <div class="error">
                ${error}
             </div>
        </div>
        </body>
    </html>`;
}

module.exports = addError;