require('dotenv').config();
const mongoose = require('mongoose');

// create a connect
const uri = process.env.MONGODB_URI;

const connectWithDB = async () => {
  try {
    const db = await mongoose.connect(uri);
    console.log('Connected to Database');
    return db;
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

const disconnectFromDB = () => {
  return mongoose.connection.close();
};

// export them
module.exports = {
  connectWithDB,
  disconnectFromDB,
};
