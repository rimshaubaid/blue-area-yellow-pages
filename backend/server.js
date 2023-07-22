const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const reviews = require("./routes/api/reviews");
const users = require("./routes/api/users");
const businesses=require("./routes/api/businesses");
const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
const corsConfig = {
  origin: true,
  credentials: true,
};


app.use('/uploads',express.static('uploads'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Credentials", "true");
res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Content-Security-Policy, Cross-Origin-Resource-Policy");
if ('OPTIONS' == req.method) {
  res.sendStatus(200);
  } else {
    next();
  }
 

})

app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true , useUnifiedTopology:true}
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/businesses",businesses);
app.use("/api/reviews",reviews);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));