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
        const payload = {
          email,
          name: user.name,
          role: user.role,
          id: user._id,
        };
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: '1h',
        });
        return res
          .status(200)
          .cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
          })
          .json(payload);
      })
      .catch(err => {
        return res
          .status(500)
          .json({ error: `Internal server error, try again ${err}` });
      });
  });
};

exports.register = (req, res) => {
  const { email, password, name, role } = req.body;
  // validation (usually should be Joi)
  if (!email || !password) {
    res.send({ err: 'Required fields' });
    return;
  }

  const newUser = new User({ email, name, role, password });

  newUser
    .save()
    .then(() => {
      const payload = { email, name, role, id: newUser._id };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '1h',
      });
      return res
        .status(200)
        .cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
        })
        .json(payload);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .send(`Error registering new user please try again.${err}`);
    });
};

exports.checkToken = (req, res) => {
  const { user } = req;
  res.send(user);
};
