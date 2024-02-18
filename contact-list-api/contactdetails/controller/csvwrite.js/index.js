const express = require("express");
const con = require("../../mysqlConfig/dp_connection");
const fastcsv = require('fast-csv');
const fs = require('fs');

const router = express.Router();

// Function to fetch contacts from the database
function fetchContacts(callback) {
    const connection = con.getConnection();
    connection.connect();
    connection.query('SELECT c.contact_id, c.name, c.Image_url, p.phone_no, p.Mobile_No FROM contacts c JOIN phone_numbers p ON c.contact_id = p.contact_id;', (err, results) => {
        connection.end(); // Close the database connection
        if (err) {
            console.error('Error fetching contacts:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

// Route handler to export contacts to CSV
router.get('/', (req, res) => {
    fetchContacts((err, results) => {
        if (err) {
            res.status(500).send({"error": "Failed to fetch contacts"});
            return;
        }

        const jsonData = JSON.parse(JSON.stringify(results));
        const ws = fs.createWriteStream("contact-list.csv");

        fastcsv.write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to contact list CSV successful");
                res.status(200).send("Contacts exported to CSV successfully");
            })
            .on("error", function(err) {
                console.error("Error writing to contact list CSV:", err);
                res.status(500).send({"error": "Failed to export contacts to CSV"});
            })
            .pipe(ws);
    });
});

module.exports = router;
