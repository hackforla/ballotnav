exports.list = async (req, res) => {
  const data = await req.db.State.findAll()
  res.json(data)
}

exports.create = (req, res, next) => {
  req.db.State.create(req.body)
    .then((data) => res.json(data))
    .catch(next)
}

exports.delete = (req, res, next) => {
  req.db.State.destroy({
    where: { id: req.body.id },
  })
    .then((data) => res.json(data))
    .catch(next)
}
