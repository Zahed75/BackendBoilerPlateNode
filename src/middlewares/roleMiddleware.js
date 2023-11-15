const { SUPER_ADMIN } = require('../config/constants');
const { Unauthorized } = require('../utility/errors');

module.exports = (roles) => (req, res, next) => {
  if (!roles.includes(req.role) && !roles.includes(SUPER_ADMIN))
    throw new Unauthorized('You dont have permissions for this action');
  next();
};
