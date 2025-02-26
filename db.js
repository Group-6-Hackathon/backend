/*
* File for database configuration once database is confirmed
*/
const uri = process.env.MONGODB_URI;
const mongoose = require('mongoose');

async function database() {
    try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB!");
    } catch (err) {
      console.error(err);
      };
    }

module.exports = database;