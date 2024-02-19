# Data base configuration
- configuar the data base properties in db_properties.js file
- create the data base contact_list in your mysql database

# create table 
- for create the table run the createTable.js file 
- node createTable.js 

# Run the project
- in terminal run this command 
- node server.js

# my host link-https://contact-list-q1kk.onrender.com/

# Test the API in PostMan
 
# For Delete
  Endpoint:  - https://contact-list-q1kk.onrender.com/delete/(enter the name to delete )
# fetchallcontacts
  Endpoint:  - https://contact-list-q1kk.onrender.com/fetchallcontacts
# insert
  Endpoint:  - https://contact-list-q1kk.onrender.com/insert
  body data: - enter the data
  {
    "Name":"",
    "Image_url":"",
    "Mobile_No":"",
    "Phone_No":""
  }
# update
  Endpoint:  - https://contact-list-q1kk.onrender.com/contact_id
  body data: - enter the data
  {
    "Name":"",
    "Image_url":"",
    "Mobile_No":"",
    "Phone_No":""
  }
# search
  Endpoint:  - https://contact-list-q1kk.onrender.com/search/(name or PhoneNumber)
# csv file
  Endpoint:  - https://contact-list-q1kk.onrender.com/csv
# UnitTesting
-For unit testing, ensure you've entered the test data as commented out in the code.
-Then, run the index.test.js file.



