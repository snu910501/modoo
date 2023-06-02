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
    };
    const { userkey } = req.headers;

    // 이 부분이 조금 걸리는데 원래는 서버에서 받아와서 확인해야 하는데.........
    // 이부분은 반드시 수정하자.
    if(userkey.length <30 || userkey.length > 40) {
      throw new Error(501,'잘못된 접근입니다.2');
    };

    const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);
    res.locals.userId = userId;
    
    next();
  } catch (err) {
    next(err);
  }
};

const isApproved = async (req, res, next) => {
  try {
    const { approved } = req.headers;
    console.log(typeof approved, approved);
    if (approved == "true") {
      next();
    } else {
      throw new Error(501, "승인되지 않은 회원입니다.");
    }
  } catch (err) {
    next(err);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const { admin, userid } = req.headers;
    const adminList = ["snu910501", "dlzmfflqtm1234"];

    function checkAdmin(arr, userId) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == userId) {
          return;
        }
      }
      throw new Error(501, "관리자가 아닙니다");
    }

    if (admin == "true") {
      checkAdmin(adminList, userid);
      next();
    } else {
      throw new Error(501, "관리자가 아닙니다");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn, isApproved, isAdmin };
