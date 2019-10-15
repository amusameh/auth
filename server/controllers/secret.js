exports.secret = (req, res) => {
  res.json({ msg: "This Data comes from the  server, and it's private data" });
};

exports.admin = (req, res) => {
  res.json({ msg: 'This data is for admin only' });
};

exports.user = (req, res) => {
  res.json({ msg: 'This data is for user only' });
};

exports.both = (req, res) => {
  res.json({ msg: 'This data is for user and admin' });
};
