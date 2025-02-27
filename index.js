require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const database = require('./db');
const handoverRoute = require('./routes/handover.route');
const patientRoute = require('./routes/patient.route');
const chartingRoute = require('./routes/charting.route');

async function startServer() {
    await database();

    app.use(express.json());
    app.use('/handovers', handoverRoute);
    app.use('/patients', patientRoute);
    app.use('/charts', chartingRoute);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

startServer();