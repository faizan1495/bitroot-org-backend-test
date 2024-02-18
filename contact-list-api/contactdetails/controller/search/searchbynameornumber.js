var con = require("../../mysqlConfig/dp_connection");
var connection = con.getConnection();
connection.connect();
var express = require("express");

var router = express.Router();

router.get('/:name', (req, res) => {
    var searchTerm = req.params.name;

    // Use a JOIN query to fetch data from both tables
    connection.query('SELECT contacts.*, phone_numbers.Mobile_No, phone_numbers.Phone_No FROM contacts LEFT JOIN phone_numbers ON contacts.contact_id = phone_numbers.contact_id WHERE phone_numbers.Phone_No LIKE ? OR contacts.Name LIKE ?', [`%${searchTerm}%`, `%${searchTerm}%`], (err, results) => {
        if (err) {
            console.error('Error searching contacts:', err);
            res.status(500).send({"error": "fail"});
        } else {
            if (results.length === 0) {
                res.status(404).send({"message": "No contacts found with the given name."});
            } else {
                res.status(200).send(results);
            }
        }
    });
});

module.exports = router;
