require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const database = require('./db');
const routes = require('./routes/route');

async function startServer() {
    await database();

    app.use(express.json());
    // app.use('', routes); // to include when route is created

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

startServer();