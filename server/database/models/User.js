const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');

const SALT = 10;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// There are two ways to do this ( double check if this is good enough!!)
// ToDo: check if this will hash the password when UPDATED!!!
userSchema.pre('save', async function hashPasswrod() {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    try {
      const hashedPassword = await bcrypt.hash(document.password, SALT);
      document.password = hashedPassword;
    } catch (err) {
      throw new Error('Something bad happend');
    }
  } else {
    throw new Error('Invalid data');
  }
});

// //commented code for future reference
// userSchema.pre('save', function(next) {
//   // check if the doc is new or a new password has been set
//   if (this.isNew || this.isModified('password')) {
//     // save a ref to this
//     const document = this;
//     bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
//       if (err) {
//         return next(err);
//       }
//       document.password = hashedPassword;
//       next()
//     })
//   } else {
//     next();
//   }
// })

userSchema.methods.isCorrectPassword = function isCorrectPassword(password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
