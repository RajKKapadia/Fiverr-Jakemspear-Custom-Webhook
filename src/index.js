const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Path ${req.path} with Method ${req.method}`);
  next();
});

const API = require('../helper/helper_api');

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/salesdialer/appointment', async (req, res) => {

    let data = req.body.data;

    let contact = {
      first_name: `Test ${data.client_name}`,
      email: data.email,
      phone: data.phone,
      date_of_birth: data.birthday,
      credit_score: data.custom_fields.CreditScore,
      customField: {
        'kuADixXBKDFhcjVvf7JV': data.call_recording
      },
      dnd: data.do_not_call_again,
      tags: ['appointment set']
    };
    
    await API.createContact(contact);

    res.sendStatus(200);
});

app.post('/salesdialer/future', async (req, res) => {

  let data = req.body.data;

  let contact = {
    first_name: `Test ${data.client_name}`,
    email: data.email,
    phone: data.phone,
    date_of_birth: data.birthday,
    credit_score: data.custom_fields.CreditScore,
    customField: {
      'kuADixXBKDFhcjVvf7JV': data.call_recording
    },
    dnd: data.do_not_call_again,
    tags: ['appointment set']
  };
  
  await API.createContact(contact);

  res.sendStatus(200);
});

app.post('/gohighlevel/gsheet', async (req, res) => {

  console.log(req.body);

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is listening on the port ${port}.`)
});