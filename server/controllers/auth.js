const User = require('../database/models/User');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  console.log('res.body', req.body);
  User.findOne({ email })
    .then(user => {
      console.log('user', user);
      if (!user) {
        return res.status(401).json({ error: 'Incorrect email or password' })
      }
      user.isCorrectPassword(password)
        .then(isMatch => {
          console.log(isMatch, 'sisisis')
          if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect email or password' });
          }

          // issue a token
          const payload = {email};
          const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h'});
          console.log('todken', token);
          return res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        })
        .catch(err => {
          return res.status(500).json({ error: 'Internal server error, try again'});
        })
    })
}

exports.register = (req, res, next) => {
  const { email, password } = req.body;
  // validation (usually should be Joi)
  if (!email || !password) {
    res.send({err: 'Required fields'});
    return;
  }

  const newUser = new User({ email, password })

  newUser.save()
    .then(ress => {
      res.status(200).send({ msg: "welcome to the clup"})
    })
    .catch(err => res.status(500).send("Error registering new user please try again."))
}

exports.checkToken = (req, res, next) => {
  res.send();
};
