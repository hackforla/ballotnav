const fs = require('fs');
const csv = require('csvtojson');
const {Parcer} = require('jsontocsv');
const fetch = require("node-fetch");




(async () =>{
    const locationdata = await csv().fromFile("Kansas County Officials - data.csv")
    const access_token = "pk.eyJ1IjoiYmFsbG90bmF2IiwiYSI6ImNrZjAycnpldzBzdzkzMW51eGdwOWxtaWIifQ.KlkcMSLbgrj8qkX2_RSaog";

    for(i = 1; i < locationdata.length; i++){
        
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locationdata[i].field5}.json?access_token=${access_token}`)
  .then(response => response.json())
  .then(json => console.log(json.features[1].center))
      
          
    }
    
})()