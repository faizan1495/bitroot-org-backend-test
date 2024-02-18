var con = require("../../mysqlConfig/dp_connection");
var connection = con.getConnection();
connection.connect();
var express = require("express");

var router = express.Router();

router.post('/', function insertContact(req, res)  {
    var Name = req.body.Name;
    var Mobile_No = req.body.Mobile_No;
    var Phone_No = req.body.Phone_No;
    var Image_url = req.body.Image_url;
    var contact_id; //  contact_id is auto-generated 

    // Insert the contact first
    connection.query('INSERT INTO contacts (Name, Image_url) VALUES (?, ?)', [Name, Image_url], (err, result) => {
        if (err) {
            console.error('Error inserting contact:', err);
            res.send({"insert": "fail"});
        } else {
            console.log('Contact inserted successfully');
            contact_id = result.insertId; // Get the ID of the inserted contact

            // Insert the phone number associated with the contact
            connection.query('INSERT INTO phone_numbers (contact_id, Mobile_No, Phone_No) VALUES (?, ?, ?)', [contact_id, Mobile_No, Phone_No], (err, result) => {
                if (err) {
                    console.error('Error inserting phone number:', err);
                    res.send({"insert": "fail"});
                } else {
                    console.log('Phone number inserted successfully');
                    res.send({"insert": "success"});
                }
            });
        }
    });
});

module.exports = router;
