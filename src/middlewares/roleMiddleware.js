const { HEAD_OFFICE, BRANCH_ADMIN, CUSTOMER } = require('../config/constants');
const { Unauthorized } = require('../utility/errors');

module.exports = (roles) => (req, res, next) => {
    const userRole = req.role; // Retrieve role from req object
    if (!roles.includes(userRole) && !roles.includes(HEAD_OFFICE, BRANCH_ADMIN, CUSTOMER)) {
        throw new Unauthorized('You dont have permissions for this action');
    }
    next();
};