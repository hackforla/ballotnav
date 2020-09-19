const express = require("express");

const sequelize = require('sequelize');

const fs = require('fs');
const csv = require('csvtojson');
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
const router = express.Router();
const port = 8080;
const Dropoffs = require("./models/Dropoffs.js");
const db = require('./models/index');
const loadDropoffs = require('./seeders/loadDropoffs');

app.get("/status", (req, res) => {
  res.send(`ok at ${new Date()}`)
})

app.get("/seed", (req, res, next) => {
  db.sequelize.sync({ force: true }) // reset db
    .then(loadDropoffs)
    .then(() => res.json({ message: "database seeded" }))
    .catch(next)
})

app.get("/dropoff/:state.:state_county", function(req, res) {
  let state = req.params["state"];
  let state_county = req.params["state_county"];
  db.Dropoffs.findAll(
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

app.post("/dropoff", (req, res, next) => {
  db.Dropoffs.create(req.body)
    .then(data => res.json(data))
    .catch(next)
})

app.post("/dropoffs", (req, res, next) => {
  db.Dropoffs.bulkCreate(req.body, { validate: true })
    .then(data => res.json(data))
    .catch(next)
})

// handle errors
app.use((err, req, res, next) => {
  if (
    err instanceof db.Sequelize.ValidationError ||
    err instanceof db.Sequelize.AggregateError
  )
    res.status(400).send(err)
  else
    res.status(500).send(err.message)
})

app.listen(port, function () {
  console.log("App listening on port 8080!");
});
