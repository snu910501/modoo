const Error = require("../modules/errorHandler");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const isLoggedIn = async (req, res, next) => {
  try {
    console.log('headerssz', req.headers);
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || '').split(' ');
    if (!authToken || authType !== 'Bearer') {
      throw new Error(501,'잘못된 접근입니다.');
    }
    const [accessToken, userKey] = authToken.split(':');
    console.log(userKey);
    const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET);
    res.locals.user = userId

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn };
