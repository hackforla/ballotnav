
// TODO: probably needs to take state id
exports.listJurisdictions = async (req, res, next) => {
  const data = await req.db.Jurisdiction.findAll({
    include: { association: 'state' },
  })
  return res.json(data)
}

// TODO: modify so that it returns the user's assigned jurisdictions
exports.listMyJurisdictions = async (req, res, next) => {
  const data = await req.db.Jurisdiction.findAll({
    limit: 10,
    include: { association: 'state' },
  })
  return res.json(data)
}

// get all child models of jurisdiction plus hours within each location
exports.getJurisdiction = async (req, res, next) => {
  const data = await req.db.Jurisdiction.findByPk(req.params.id, {
    include: [
      { all: true },
      {
        association: 'locations',
        include: { association: 'hours' },
      }
    ]
  })
  return res.json(data)
}

exports.listStates = async (req, res, next) => {
  const data = await req.db.State.findAll()
  return res.json(data)
}

exports.getState = async (req, res, next) => {
  const data = await req.db.State.findByPk(req.params.id, {
    include: { association: 'jurisdictions' },
  })
  return res.json(data)
}
