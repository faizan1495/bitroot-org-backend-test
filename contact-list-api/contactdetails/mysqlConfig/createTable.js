const e = require("express");
var con = require("./dp_connection");
var connection =con.getConnection();

//create tables
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        const createContactsTableQuery = `
            CREATE TABLE IF NOT EXISTS contact_list.contactss (
                contact_id INT NOT NULL AUTO_INCREMENT,
                Name VARCHAR(45) NOT NULL,
                Image_url VARCHAR(255) NULL,
                PRIMARY KEY (contact_id),
                UNIQUE INDEX Image_url_UNIQUE (Image_url ASC)
            );
        `;

        connection.query(createContactsTableQuery, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Contacts table created successfully");

                const createPhoneNumbersTableQuery = `
                CREATE TABLE IF NOT EXISTS contact_list.phone_numberss (
                    phone_number_id INT NOT NULL AUTO_INCREMENT,
                    contact_id INT NULL,
                    mobile_no VARCHAR(10) NOT NULL,
                    phone_no VARCHAR(45) NULL,
                    PRIMARY KEY (phone_number_id),
                    INDEX contact_id_idx (contact_id ASC),
                    UNIQUE INDEX mobile_no_UNIQUE (mobile_no ASC),
                    UNIQUE INDEX phone_no_UNIQUE (phone_no ASC),
                    CONSTRAINT fk_contact_id
                        FOREIGN KEY (contact_id)
                        REFERENCES contact_list.contactss (contact_id)
                        ON DELETE NO ACTION
                        ON UPDATE NO ACTION
                );
                `;

                connection.query(createPhoneNumbersTableQuery, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Phone numbers table created successfully");
                    }
                });
            }
        });
    }
});


