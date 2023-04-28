const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'userId',
      passwordField: 'userPassword',
      session: false
    }, async (userId, userPassword, done) => {
      try {
        const user = await User.findOne({
          where: { userId: userId }
        });
        if (user) {
          const result = await bcrypt.compare(userPassword, user.userPassword)

          if (result) {
            return done(null, user);
          } else {
            return done(null, false, { message: '아이디 혹은 비밀번호가 일치하지 않습니다.' })
          }
        } else {
          return done(null, false, { message: '아이디 혹은 비밀번호가 일치하지 않습니다.' })
        }

        // return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  ))
}