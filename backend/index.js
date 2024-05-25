// Need to install
// npm install mysql
// npm install express
// npm install cors
// npm install body-parser
// npm install nodemon
// to open node post-end-point.js or nodemon index.js

// Basic setup of library
let mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  // database: 'hr'
  database: "Sumaya",
});

database.connect((err) => {
  if (err) {
    console.log("error from database connection: ", err);
  } else {
    const createAccountTableQuery = `CREATE TABLE IF NOT EXISTS Account(
                id INT AUTO_INCREMENT NOT NULL primary key,
                fname VARCHAR(100) NOT NULL,
                lname VARCHAR(100) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                dob date NOT NULL,
                gender VARCHAR(10) NOT NULL,
                password VARCHAR(255) NOT NULL
              )`;

              database.query(createAccountTableQuery, (err) => {
      if (err) {
        console.log("Error creating account table :", err);
      } else {
        console.log("Database connected");
      }
    });
  }
});

// GET API end point defination
// app.get("/", function (req, res) {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);
//   return res.json(a + b);
// });

app.post("/register/post", function (req, res) {
  const { fname, lname, email, dob, gender, password } = req.body;
  // console.log(fname, lname, email, dob, gender, password);

  database.query(
    `INSERT INTO Account (fname, lname, email, gender, dob, password) VALUES ('${fname}', '${lname}', '${email}', '${gender}', '${dob}', '${password}');`,
    function (err, result) {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        // console.log(result);
        if (result) {
          res.json("success")
        }
        else{
          res.json("error")
        }
      }
    }
  );
});


// GET API end point defination
// app.get('/', function (req, res) {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);
//   return res.json(a + b);
// });

// POST API end point defination
// app.post('/test-post', function (req, res) {
//   console.log(req.body);
//   return res.json('success');
// });

// DB
// app.post('/add_user', function (req, res) {

//   const user = {
//       fname: req.body.fname,
//       lname: req.body.lname,
//       email: req.body.email,
//       dob: req.body.dob,
//       gender: req.body.gender,
//       password: req.body.password
//   };

app.post("/login/post", function (req, res) {
  const { email, password } = req.body;

  const user = `SELECT * FROM account WHERE email = '${email}' and password = '${password}'`;


  // connection.query(`INSERT INTO user (fname, lname, email, gender, dob, password) VALUES ('${user.fname}', '${user.lname}', '${user.email}', '${user.gender}', '${user.dob}', '${user.password}');`,
  //       function (err, result) {
  //           if (err) {
  //               res.json({
  //                   error: err,
  //               })
  //           } else {
  //               res.json({
  //                   result: result,
  //               })
  //           }
  //       }

  database.query(user, function (err, result) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      // console.log(result[0]);
      if (result[0]) {
        res.json("success")
      }
      else{
        res.json("error")
      }
    }
  });
});

app.listen(3000);
