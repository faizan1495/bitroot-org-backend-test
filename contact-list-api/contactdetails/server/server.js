var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import the cors middleware
app.use(cors());


// Import fetchallcontacts module
var fetchallcontacts = require("../controller/fetch/fetchallcontact.js");
app.use('/fetchallcontacts', fetchallcontacts);

// Import insert
var insert = require("../controller/insert/insert.js");
app.use('/insert', insert);

// Import update
var update = require("../controller/update/update.js");
app.use('/update', update);

// Import searchbynameornumber
var search = require("../controller/search/searchbynameornumber.js");
app.use('/search', search);

// Import delete
var remove = require("../controller/delete/delete.js");
app.use('/delete', remove);
//import cvs
var csv = require("../controller/csvwrite.js/index.js");
app.use('/csv', csv);


// Export the createServer function
function createServer () {
    return app;
};

//assign the port no
app.listen(8088);
console.log('server listening on port 8088');
module.exports = {createServer}
