const mongoose = require('mongoose');
const User = require('./models/User');
const dbConnection = require('./dbConnection');
require('dotenv').config();

const buildData = async () => {
  await dbConnection();
  await User.deleteMany({});

  const user = {
    name: 'John Rees',
    email: 'john@rees.com',
    password: '123456',
    role: 'user',
  };

  const admin = {
    name: 'The Boss',
    email: 'big@boss.com',
    password: '123456',
    role: 'admin',
  };

  return User.create([user, admin]);
};

buildData().then(() => {
  mongoose.disconnect();
});
