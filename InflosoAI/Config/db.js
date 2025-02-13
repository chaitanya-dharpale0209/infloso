const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully.');
    } catch (e) {
        console.error('MongoDB connection error:', e.message);
    }
};

module.exports = connectDb;
