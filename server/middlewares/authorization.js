module.exports = allowedRoles => (req, res, next) => {
  const { user } = req;
  const { role } = user;

  if (!allowedRoles.includes(role)) return res.status(403).send('Forbidden');
  return next();
};
