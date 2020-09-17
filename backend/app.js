const express = require("express");

const sequelize = require('sequelize');

const fs = require('fs');
const csv = require('csvtojson');
const fetch = require("node-fetch");

const app = express();
const router = express.Router();
const port = 8080;
const Dropoffs = require("./models/Dropoffs.js");

router.use(function (req, res) {
  console.log("/" + req.method);
 res.sendStatus(200);
});

app.use("/", router);


router.get(function (req, res) {
    console.log("/" + req.method);
   res.send("👋Hi Developers!");
  });
  
  
router.get("/status", (req, res) =>{
    res.send("Operating");
});


app.get("/dropoff/:state.:state_county", function(req, res) {
  let state = req.params["state"];
  let state_county = req.params["state_county"];
  Dropoffs.findAll(
    {where: {state_short_code: state,
    county: state_county}}).then( function(dropoffs) 
    {
        if (!dropoffs) {
          res.send([])
        }
        res.send({"Dropoffs": dropoffs})
    }).catch(function(err) {
      res.send({"Error": "Error occurred"})
    });
});

app.listen(port, function () {
  console.log("App listening on port 8080!");
});
