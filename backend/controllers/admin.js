
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function convertModelName(modelName) {
  return capitalize(modelName)
}

exports.listInstances = async (req, res, next) => {
  const path = req.originalUrl.replace(req.baseUrl, '').replace('/instances/', '')
  const sections = path.split('/').reverse()
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

  //return res.json({ path, sections, modelName, parentId, parentModelName, filter })
}

exports.getInstance = async (req, res, next) => {
  res.json('instance')
}
