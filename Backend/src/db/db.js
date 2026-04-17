const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
    if (isConnected) {
        return mongoose.connection;
    }

    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("MONGO_URI is missing in environment variables");
    }

    await mongoose.connect(mongoUri, {
        dbName: process.env.MONGO_DB_NAME || undefined,
    });

    isConnected = true;

    console.log("Connected to MongoDB");

}


module.exports = connectDB;
