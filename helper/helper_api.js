const axios = require("axios").default;
require('dotenv').config();

const createContact = async (contact) => {

    var options = {
        method: 'POST',
        url: 'https://rest.gohighlevel.com/v1/contacts/',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GOHIGH_API}`
        },
        data: contact
      };
      
      await axios.request(options);
};

module.exports = {
    createContact
};
