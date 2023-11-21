require("dotenv").config(); // for environment variables
const express = require("express");
const workoutRoutes = require("./Routes/workouts");
const userRoutes = require("./Routes/user");
const mongoose = require("mongoose");

//express App
const app = express();

//Middleware
/* if we dont use this and try to get the body "res.body", 
we get undefined; this how we tell that we are recieving a lot of JSON */
app.use(express.json()); 
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

//Router
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//connect to database
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    console.log("connected successfully");
    // listen to the port 4000
    app.listen(process.env.PORT, () => {
      console.log("Listening now at port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// //Routes
// app.get("/", (req, res) => {
//     res.json({mssg: 'Welcome this is a test string'});
// });
