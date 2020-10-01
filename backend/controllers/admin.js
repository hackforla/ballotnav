
function convertModelName(modelName) {
  switch(modelName) {
    case 'state': return 'State'
    case 'jurisdiction': return 'Jurisdiction'
    case 'location': return 'Location'
    case 'location_hours': return 'LocationHours'
    case 'jurisdiction_importantdate': return 'JurisdictionImportantDate'
    case 'jurisdiction_infotab': return 'JurisdictionInfoTab'
    case 'jurisdiction_news': return 'JurisdictionNews'
    case 'jurisdiction_notice': return 'JurisdictionNotice'
    case 'jurisdiction_phone': return 'JurisdictionPhone'
    case 'jurisdiction_url': return 'JurisdictionUrl'
    case 'state_importantdate': return 'StateImportantDate'
    case 'state_infotab': return 'StateInfoTab'
    case 'state_news': return 'StateNews'
    case 'state_notice': return 'StateNotice'
    case 'state_phone': return 'StatePhone'
    case 'state_url': return 'StateUrl'
  }
}

function cleanPath(req) {
  return req.originalUrl
    .replace(req.baseUrl, '')
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .split('/')
    .slice(1)
}

function parseModelPath(req) {
}

function parseInstancePath(req) {

}

exports.listInstances = async (req, res, next) => {
  const sections = cleanPath(req).reverse()
  const modelName = convertModelName(sections[0])
  const hasParentModel = sections.length > 1
  const parentId = hasParentModel ? +sections[1] : null
  const parentModelName = hasParentModel ? sections[2] : null
  const parentIdField = parentModelName + 'Id'
  const filter = hasParentModel
    ? { where: { [parentIdField]: parentId } }
    : { where: {} }

  req.db[modelName].findAll(filter)
    .then((data) => res.json(data))
    .catch(next)
}

exports.getInstance = async (req, res, next) => {
  const sections = cleanPath(req).reverse()
  const instanceId = +sections[0]
  const modelName = convertModelName(sections[1])

  req.db[modelName].findByPk(instanceId)
    .then((data) => res.json(data))
    .catch(next)
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

// TODO: modify so that it returns the user's assigned jurisdictions
exports.listMyJurisdictions = async (req, res, next) => {
  const data = await req.db.Jurisdiction.findAll({
    limit: 10,
    include: { association: 'state' },
  })
  return res.json(data)
}

exports.listJurisdictions = async (req, res, next) => {
  const data = await req.db.Jurisdiction.findAll({
    include: { association: 'state' },
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
