let User = require("./models/user.model");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Routing defines the way in which the client requests are handled by the application endpoints.
require("dotenv").config();
const migzapp = express(); // framwework to be used
const port = process.env.PORT || 5000; // the port .env give port if 5000 already used

// migzapp.use(express.static(__dirname + "/views"));
// migzapp.use('controllers', express.static(__dirname + "/views"));

migzapp.use(cors()); // migzapp will use cors
migzapp.use(express.json()); // migzapp use express.json

// FOR THE VALIDATIONS
const { body, validationResult } = require("express-validator");

// DISPLAY

migzapp.get("/", (req, res) => {
  // res.send('./views/errors');
  User.find() // PROMISE IF ELSE
    .then((user) => res.json(user)) // IF TRUE CHECK
    .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR
});

// ADD DATA

migzapp.post(
  "/add",
  [
    body("email")
      .isLength({ min: 1 })
      .withMessage("*Email Address field cannot be blank")

      .isLength({ max: 45 })
      .withMessage("*Email Address field accept up to 45 in size only")

      .isEmail()
      .withMessage("*Email Address field should have email domain"),

    body("fullname")
      .isLength({ min: 1 })
      .withMessage("*Full Name field cannot be blank")

      .isLength({ max: 30 })
      .withMessage("*Full Name field accept up to 30 in size only")

      .matches(/^[aA-zZ\s]+$/)
      .withMessage("*Full Name field accept characters values only"),

    body("contactNumber")
      .isLength({ min: 11 })
      .withMessage("*Contact Number field cannot be blank")

      .isLength({ max: 11 })
      .withMessage("*Contact Number field accept up to 11 in size only")

      .matches(/^\d+$/)
      .withMessage("*Contact Number field accept numeric values only"),

    body("location")
      .isLength({ min: 1 })
      .withMessage("*Location field cannot be blank"),

    // body("dateFormatted")
    //   .isLength({ min: 1 })
    //   .withMessage("*Registered date field cannot be blank"),
  ],
  (req, res, next) => {
    try {
      //HERE WE PROCESS THE VALIDATION AND STORE IT ON const errors
      const error = validationResult(req);
      let arrayofErrors = {}; // STORE HERE THE ERROR MESSAGES as an Array

      //MEANS THAT THERE IS AN ERROR EXISTING!
      if (!error.isEmpty()) {
        //EXECUTE  ONLY THE FIRST ERROR
        error.array({ onlyFirstError: true }).forEach((error) => {
          //CONDITIONING / CHECKING IF THE said errors param exist on the arrayofErrors
          if (!arrayofErrors[error.param]) {
            arrayofErrors[error.param] = [];
          }
          //IF THE ERROR PARAMS EXIST.
          arrayofErrors[error.param] = [
            ...arrayofErrors[error.param],
            error.msg,
          ];
        });
        console.log(error);

        //HERE WE SEND BACK ALL OF THE ERRORS TO THE FRONTEND WITH THE STATUS CODE OF 400
        return res.status(400).json(arrayofErrors);

      } else {
        const fullname = req.body.fullname;
        const location = req.body.location;
        const email = req.body.email;
        const contactNumber = req.body.contactNumber;
        const date = req.body.date;

        const newUser = new User({
          fullname,
          location,
          email,
          contactNumber,
          date,
        }); // Instantiate the User in user.model

        newUser
          .save() //PROMISE
          .then((user) => res.json("New record added!")) // IF TRUE CHECK
          .catch((err) => res.status(400).json("Error: " + err)); // CATCH THE ERROR
        re;
      }
    } catch (err) {}
  }
);

// //details

migzapp.get("/view/:id",(req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// //DELETE
migzapp.delete("/delete/:id",(req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json("Record was deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// //UPDATE

migzapp.put(
  "/update/:id",
  [
    body("email")
      .isLength({ min: 1 })
      .withMessage("*Email Address field cannot be blank")

      .isLength({ max: 45 })
      .withMessage("*Email Address field accept up to 45 in size only")

      .isEmail()
      .withMessage("*Email Address field should have email domain"),

    body("contactNumber")
      .isLength({ min: 1 })
      .withMessage("*Contact Number field cannot be blank")

      .isLength({ max: 11 })
      .withMessage("*Contact Number field accept up to 11 in size only")

      .matches(/^\d+$/)
      .withMessage("*Contact Number field accept numeric values only"),

    body("location")
      .isLength({ min: 1 })
      .withMessage("*Location field cannot be blank"),

  
  ],
  (req, res, next) => {
    try {
      //HERE WE PROCESS THE VALIDATION AND STORE IT ON const errors
      const error = validationResult(req);
      let arrayofErrors = {}; // STORE HERE THE ERROR MESSAGES as an Array

      //MEANS THAT THERE IS AN ERROR EXISTING!
      if (!error.isEmpty()) {
        //EXECUTE  ONLY THE FIRST ERROR
        error.array({ onlyFirstError: true }).forEach((error) => {
          //CONDITIONING / CHECKING IF THE said errors param exist on the arrayofErrors
          if (!arrayofErrors[error.param]) {
            arrayofErrors[error.param] = [];
          }
          //IF THE ERROR PARAMS EXIST.
          arrayofErrors[error.param] = [
            ...arrayofErrors[error.param],
            error.msg,
          ];
        });
        console.log(error);

        //HERE WE SEND BACK ALL OF THE ERRORS TO THE FRONTEND WITH THE STATUS CODE OF 400
        return res.status(400).json(arrayofErrors);

      } else {
        User.findById(req.params.id)
        .then((user) => {
    
          user.location = req.body.location;
          user.email = req.body.email;
          user.contactNumber = req.body.contactNumber;
    
          user.save()
    
            .then((user) => res.json("Record was updated."))
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
      }
    } catch (err) {}
  }
);



//UPDATE WAS CANCEL

migzapp.put(
  "/updatecancel/:id",
 
  (req, res, next) => {
   
        User.findById(req.params.id)
        .then((user) => {   
          user.location = req.body.location;
          user.email = req.body.email;
          user.contactNumber = req.body.contactNumber;
    
          user.save()
    
            .then((user) => res.json("Record was updated."))     
        })
      }
);





//VIEW REPORTS functionalities
const months =["/Jan", "/Feb", "/Mar", "/Apr", "/May", "/Jun", "/Jul", "/Aug", "/Sep", "/Oct", "/Nov","/Dec"]

  const jan=/^01/;
  const feb=/^02/;
  const mar=/^03/;
  const apr=/^04/;
  const may=/^05/;
  const jun=/^06/;
  const jul=/^07/;
  const aug=/^08/;
  const sep=/^09/;
  const oct=/^10/;
  const nov=/^11/;
  const dec=/^12/;

const regexforMonth = [jan, feb, mar, apr,may,jun,jul,aug,sep,oct,nov,dec]

for (let i = 0; i <months.length; i++){
  console.log(regexforMonth[i])

  
  migzapp.get(`${months[i]}`, (req, res) => {

    User.find({
      $and: [
          {date:{$regex:regexforMonth[i], $options: 'm' }},
          {date:{$regex:/2020/}}
             
      ]
  }) // PROMISE IF ELSE
      .then((user) => res.json(user)) // IF TRUE CHECK
      .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR
   
  });
  
 
}


///FOR 2021


//VIEW REPORTS functionalities
const months1 =["/Jan1", "/Feb1", "/Mar1", "/Apr1", "/May1", "/Jun1", "/Jul1", "/Aug1", "/Sep1", "/Oct1", "/Nov1","/Dec1"]

  const jan1=/^01/;
  const feb1=/^02/;
  const mar1=/^03/;
  const apr1=/^04/;
  const may1=/^05/;
  const jun1=/^06/;
  const jul1=/^07/;
  const aug1=/^08/;
  const sep1=/^09/;
  const oct1=/^10/;
  const nov1=/^11/;
  const dec1=/^12/;

const regexforMonth1 = [jan1, feb1, mar1, apr1,may1,jun1,jul1,aug1,sep1,oct1,nov1,dec1]

for (let i = 0; i <months1.length; i++){
  console.log(regexforMonth1[i])

  
  migzapp.get(`${months1[i]}`, (req, res) => {

    User.find({
      $and: [
          {date:{$regex:regexforMonth1[i], $options: 'm' }},
          {date:{$regex:/2021/}}
             
      ]
  }) // PROMISE IF ELSE
      .then((user) => res.json(user)) // IF TRUE CHECK
      .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR
   
  });
  
 
}

///COUNT USER IN THE MANILA

migzapp.get("/Manila", (req, res) => {
  User.find({location:{$regex:/^Manila/}})
           
// PROMISE IF ELSE
    .then((user) => res.json(user)) // IF TRUE CHECK
    .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR
 
});

///COUNT USER IN THE CEBU

migzapp.get("/Cebu", (req, res) => {
  User.find({location:{$regex:/^Cebu/}})
           
// PROMISE IF ELSE
    .then((user) => res.json(user)) // IF TRUE CHECK
    .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR
 
});


























const uri = process.env.ATLAS_URI; // getting the datas in the .env which is the mongo database

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
); // MONGO DB NEEDED CONFIG.

const connection = mongoose.connection; // CONNECT NOW TO DATABASE / MONGO DB

connection.once("open", () => {
  console.log("MONGO DB CONNECTION ESTABLISHED! HINAMPAK");
});

migzapp.listen(port, () => {
  console.log("Server is running in port:" + port);
});
