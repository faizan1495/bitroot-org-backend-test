var con = require("../../mysqlConfig/dp_connection");
var connection =con.getConnection();
connection.connect();
var express = require("express");

var router = express.Router();

router.get('/',(req,res)=>{
    connection.query('SELECT c.contact_id, c.name, c.Image_url, p.phone_no,p.Mobile_No FROM contacts c JOIN phone_numbers p ON c.contact_id = p.contact_id;', 
    (err, results) => {
        if (err) {
            console.error('Error fetching contacts:', err);
        } else {
            console.log('Contacts:', results);
            res.send(results);
        }
    });
});
module.exports = router;