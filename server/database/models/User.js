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
  password: {
    type: String,
    required: true,
  }
});

userSchema.pre('save', async function() {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    try {
      const hashedPassword = await bcrypt.hash(document.password, SALT);
      console.log('hashed', hashedPassword);
      document.password = hashedPassword;
    } catch (err) {
      throw new Error('Something bad happend');
    }

  } else {
    throw new Error('Invalid data');
  }
});

userSchema.methods.isCorrectPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema);

module.exports = User;


// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const saltRounds = 10;

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     unique: true,
//     lowercase: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   }
// })

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

// userSchema.methods.isCorrectPassword = function(password) {
//   return bcrypt.compare(password, this.password)
// }

// const User = mongoose.model('User', userSchema);

// module.exports = User;
