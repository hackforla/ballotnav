exports.list = async (req, res) => {
  const data = await req.db.Location.findAll()
  res.json(data)
}

exports.create = (req, res, next) => {
  req.db.Location.create(req.body)
    .then((data) => res.json(data))
    .catch(next)
}

exports.delete = (req, res, next) => {
  req.db.Location.destroy({
    where: { id: req.body.id },
  })
    .then((data) => res.json(data))
    .catch(next)
}

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
