const CustomError = require("../common/CustomError");

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return next(new CustomError("Unauthorized", 401));
};

module.exports = { ensureAuthenticated };
