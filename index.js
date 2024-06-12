const express = require('express')
require('dotenv').config()

const port = process.env.PORT || 4000;
const app = express();


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})