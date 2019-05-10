const mongoose = require('mongoose');

const dbConnection = () => mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, })

module.exports = dbConnection;
