const Error = require("../modules/errorHandler");
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  try {
    console.log('headerssz', req.headers);
    const { token, userKey } = req.cookies;
    if (!userKey && !token) {
        const error = new Error(501, "비정상적인 접근이군요.");
        throw error;
    }
    if (!userKey && token) {
      res.cookie("token", "", {
        sameSite: "none",
        //   secure: true,
        httpOnly: true,
        maxAge: 0,
      });
      res.cookie("userKey", "", {
        sameSite: "none",
        //   secure: true,
        httpOnly: true,
        maxAge: 0,
      });
      const error = new Error(501, "비정상적인 접근이군요.");
      throw error;
    }

    if (userKey) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        res.locals = result;
      } else {
        const error = new Error(501, "비정상적인 접근이군요.");
        throw error;
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn };
