var con =require("../../mysqlConfig/dp_connection");
var connection =con.getConnection();
connection.connect();
var express=require("express");

var router=express.Router();

router.put('/:contact_id', (req, res) => {
    var Name = req.body.Name;
    var Mobile_No = req.body.Mobile_No;
    var Phone_No = req.body.Phone_No;
    var Image_url = req.body.Image_url;
    var contact_id = req.params.contact_id;

    // Update the contact
    connection.query('UPDATE contacts SET Name = ?,  Image_url = ? WHERE contact_id = ?', 
                     [Name, Image_url, contact_id], 
                     (err, result) => {
        if (err) {
            console.error('Error updating contact:', err);
            res.send({"update": "fail"});
        } else {
            console.log('Contact updated successfully');

            // Update the associated phone number
            connection.query('UPDATE phone_numbers SET Mobile_No = ?, Phone_No = ? WHERE contact_id = ?', 
                             [Mobile_No, Phone_No, contact_id], 
                             (err, result) => {
                if (err) {
                    console.error('Error updating phone number:', err);
                    res.send({"update": "fail"});
                } else {
                    console.log('Phone number updated successfully');
                    res.send({"update": "success"});
                }
            });
        }
    });
});
module.exports = router;