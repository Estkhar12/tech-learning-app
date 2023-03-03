require("dotenv").config()

const  path = require("path");

const mongoose = require('mongoose');

const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions"
});

app.set("view engine", "ejs");
app.set("views", "views");

const userRoutes = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store })
);

app.use(userRoutes);



mongoose.connect(process.env.MONGODB_URI)
.then(result => {
  app.listen(process.env.PORT || 3000,  () => {
    console.log("server start on 3000 port.");
  });
}).catch( err => {
  console.log(err);
})
