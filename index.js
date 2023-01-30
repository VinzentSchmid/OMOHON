const express = require("express")
const app = express()

const router = require('./routes');
app.use('/', router);

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});
