const Error = require("../modules/errorHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isLoggedIn = async (req, res, next) => {
  try {
    console.log("headerssz", req.headers);
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");
    if (!authToken || authType !== "Bearer") {
      throw new Error(501, "잘못된 접근입니다.");
    }
    const { userkey } = req.headers;
    console.log("heoo", authToken, userkey);
    const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);

    res.locals.userId = userId;
    console.log("ppa");
    next();
  } catch (err) {
    next(err);
  }
};

const isApproved = async (req, res, next) => {
  try {
    const { approved } = req.headers;
    console.log(typeof approved, approved);
    if (approved == 'true') {
      next();
    } else {
      throw new Error(501, "승인되지 않은 회원입니다.");
    }
  } catch (err) {
    next(err);
  }
};

const isAdmin = async(req,res,next) => {
  try{
    const {admin} = req.headers;

    if(admin == 'true') {
      next();
    } else {
      throw new Error(501, '관리자가 아닙니다');
    }
  } catch(err){
    next(err);
  }
}

module.exports = { isLoggedIn, isApproved, isAdmin };
