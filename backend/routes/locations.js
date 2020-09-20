const router = require('express').Router()
const db = require('@models')

router.get('/', async (req, res) => {
  const states = await db.Locatiion.findAll()
  res.json(states)
})

router.post('/', (req, res, next) => {
  db.Location.create(req.body)
    .then((data) => res.json(data))
    .catch(next)
})

// app.get("/dropoff/:state.:state_county", function(req, res) {
//   let state = req.params["state"];
//   let state_county = req.params["state_county"];
//   db.Dropoffs.findAll(
//     {where: {state_short_code: state,
//     county: state_county}}).then( function(dropoffs)
//     {
//         if (!dropoffs) {
//           res.send([])
//         }
//         res.send({"Dropoffs": dropoffs})
//     }).catch(function(err) {
//       res.send({"Error": "Error occurred"})
//     });
// });

module.exports = router
