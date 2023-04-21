const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const indexRouter = require("./routes/index");
const errorHandler = require('./modules/errorHandler');

dotenv.config();
const app = express();

app.set("port", process.env.PORT || "3000");

const { sequelize } = require("./models");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 되었습니다.");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use(function (err, req, res, next) {
  console.log('error 로킹 필ㅇ요');
  console.error(err);
  res.status(err.status || 500).json({ message: err.message })
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
