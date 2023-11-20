const config = require("config");
const express = require("express");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);

const connectDB = require("./config/db");

const appController = require("./controllers/AppController");
const isAuth = require("./middleware/IsAuth");

const MONGO_DB_URI = config.get("MONGO_DB_URI");
const SERVER_PORT = config.get("SERVER_PORT");

const app = express();

connectDB();



const store = new mongodbStore({
  uri: MONGO_DB_URI,
  collection: "sessions",
});



app.disable("etag");



app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));



app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);




app.listen(SERVER_PORT, () => {
  console.log(`Server is Running on Port ${SERVER_PORT}`);
});

app.get("/test", (req, res) => {
  // req.session.isAuth = true;

  // console.log(req.session);

  // console.log(`session id: ${req.session.id}`);

  res.status(200).send({
    status: "success",
    message: "server is running",
    session: req.session,
  });
});




app.get("/", appController.landing_page);




app.get("/register", appController.register_get);
app.post("/register", appController.register_post);




app.get("/login", appController.login_get);
app.post("/login", appController.login_post);




app.get("/dashboard", isAuth, appController.dashboard_get);




app.post("/logout", appController.logout_post);
