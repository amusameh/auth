const jwt = require('jsonwebtoken');
const User = require('../database/models/User');

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }
    return user
      .isCorrectPassword(password)
      .then(isMatch => {
        if (!isMatch) {
          return res.status(401).json({ error: 'Incorrect email or password' });
        }

        // issue a token
        const payload = { email };
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: '1h',
        });
        return res.cookie('token', token, { httpOnly: true }).sendStatus(200);
      })
      .catch(err => {
        return res
          .status(500)
          .json({ error: `Internal server error, try again ${err}` });
      });
  });
};

exports.register = (req, res) => {
  const { email, password } = req.body;
  // validation (usually should be Joi)
  if (!email || !password) {
    res.send({ err: 'Required fields' });
    return;
  }

  const newUser = new User({ email, password });

  newUser
    .save()
    .then(() => {
      res.status(200).send({ msg: 'welcome to the clup' });
    })
    .catch(err =>
      res.status(500).send(`Error registering new user please try again.${err}`)
    );
};

exports.checkToken = (req, res) => {
  res.send();
};
