require("dotenv").config();

const express = require("express");
const { connect, set } = require("mongoose");
const bodyParser = require("body-parser");
const dbConf = require("./app/config/db.config");
const cors = require("cors");
const app = express();

const port = process.env.NODE_DOCKER_PORT || 8000;
const routes = require("./app/routes");

var corsOptions = {
  origin: "http://localhost:8888",
  credentials: true
};
app.use(cors(corsOptions));

console.log(dbConf.DB_URL);

(async () => {
  try {
    const db = await connect(`${dbConf.DB_URL}`);
    console.log("Db connectect to", dbConf.NAME);
  } catch (error) {
    console.error(error);
  }
})();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => {
  console.log("We are live on " + port);
});
app.use((req, res, next) => {
  res.status(404).send("404");
});
