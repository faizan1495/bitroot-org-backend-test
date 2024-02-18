const request = require("supertest");
const con = require("../../mysqlConfig/dp_connection");
const { createServer } = require("../../server/server");

beforeAll(async () => {
    // Establish database connection before running tests
    await con.getConnection(); // Assuming getConnection() is the appropriate method to establish a database connection
});

describe("Rest API", () => {
    test('create contact', async () => { 
        const app = createServer(); // Moved createServer() inside the test to ensure a new instance is created for each test
        const response = await request(app)
            .post("/insert")
            .send({                //enter the data to create
                Name: " ",
                Image_url: "",
                Mobile_No: "",
                Phone_No: ""
            });
        expect(response.statusCode).toEqual(200);
    });

    //update
    test("update contact", async () => {
        const app = createServer();
        // Define the updated contact data
        const updatedContactData = {
            //enter the data 
            Name: "",
            Image_url: "",
            Mobile_No: "",
            Phone_No: ""
        };
        // Send a PUT request to the update endpoint with the updated contact data
        const response = await request(app)
            .put('/update/3') 
            .send(updatedContactData);
    
        // Check if the response status code is 200
        expect(response.statusCode).toEqual(200);
    });
    
    // searchBynameornumber
    test("search by name", async() => {
        const app=createServer();
        const response = await request(app).get('/search/faizan').send();
        expect(response.statusCode).toEqual(200);
    });

    //get all contacts
    test("fetch all contacts", async () => {
        const app = createServer();
        const response = await request(app).get('/fetchallcontacts').send();
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([
            //enter the data 
            {
                name: "",
                Image_url: "",
                Mobile_No: "",
                phone_no: "",
                contact_id: 
            },
            {
                name: "",
                Image_url: "",
                Mobile_No: "",
                phone_no: "",
                contact_id: 
            },
            {
                name: "",
                Image_url: "",
                Mobile_No: "",
                phone_no: "",
                contact_id: 5
            },
            {
                name: "",
                Image_url: "",
                Mobile_No: "",
                phone_no: "",
                contact_id: 
            },

    ])
    });

    // //delete
    test("delete contact", async () => {
        const app = createServer();
        // Send a DELETE request to the delete endpoint with the contact ID to be deleted
        const response = await request(app)
            .delete('/delete/enter_the_name') 
            .send();
    
        // Check if the response status code is 200
        expect(response.statusCode).toEqual(200);
    
        // Check if the response body contains the expected message confirming the deletion
    });

});
