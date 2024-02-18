var con =require("../../mysqlConfig/dp_connection");
var connection =con.getConnection();
connection.connect();
var express=require("express");

var router=express.Router();

router.delete('/:Name',(req,res)=>{
    var Name=req.params.Name;
     // First, delete associated phone numbers
     connection.query('DELETE FROM phone_numbers WHERE contact_id IN (SELECT contact_id FROM contacts WHERE Name = ?)', [Name], (err, result) => {
        if (err) {
            console.error('Error deleting associated phone numbers:', err);
            res.send({"delete": "fail"});
        } else {
            console.log('Associated phone numbers deleted successfully');

            // Now, delete the contact
            connection.query('DELETE FROM contacts WHERE Name = ?', [Name], (err, result) => {
                if (err) {
                    console.error('Error deleting contact:', err);
                    res.send({"delete": "fail"});
                } else {
                    console.log('Contact deleted successfully');
                    res.send({"delete": "success"});
                }
            });
        }
    });
});
module.exports=router;