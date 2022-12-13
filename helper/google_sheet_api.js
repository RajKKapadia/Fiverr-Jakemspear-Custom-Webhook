// Google sheet npm package
const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

// spreadsheet key is the long id in the sheets URL
const RESPONSES_SHEET_ID = process.env.RESPONSES_SHEET_ID;

// Create a new document
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

// Credentials for the service account
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const addRow = async (rows) => {

    // use service account creds
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo();

    // Index of the sheet
    let sheet = doc.sheetsByIndex[0];

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        await sheet.addRow(row);
    }
};