const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.get('/', (req,res) => {
    res.json('hi')
})

app.get('/', (req,res) => {
    async function getData () {
    }
})

app.listen(8000, () => console.log("the backend is running!"));