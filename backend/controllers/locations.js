const logger = require('@log')
const { handleError } = require('@controllers/error')

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

/**
 * list wip locations under a wip jurisdiction id
 */
exports.listWip = async (req, res) => {
  let wipJurisdictionId = req.params.wipJurisdictionId
  let wipLocationId = req.query.location
  let queryBy = { where: { wipJurisdictionId: wipJurisdictionId } }
  logger.info({
    message: 'List wip locations',
    route: req.route.path,
    editorUserId: req.user.id,
    wipJurisdictionId: wipJurisdictionId
  })
  if (wipLocationId !== undefined) {
    // we are getting a list of 1 or more specific wip location ids
    queryBy.where.id = [...wipLocationId]
  }

  try {
    const data = await req.db.WipLocation.findAll(queryBy)
    return res.status(201).json({status: 'ok', results: data})
  } catch (err) {
    return handleError(err, 400, res)
  }
}

/**
 * creates a wip location entry
 */
exports.createWip = async (req, res) => {
  let data = req.body
  let editorUserId = req.user.id
  let wipJurisdictionId = req.params.wipJurisdictionId
  logger.info({
    message: 'Creating a wip location',
    route: req.route.path,
    editorUserId: editorUserId,
    wipJurisdictionId: wipJurisdictionId,
  })

  try {
    let results = await req.db.WipLocation.create({
      ...data,
      editorUserId: editorUserId,
      wipJurisdictionId: wipJurisdictionId
    })
    logger.info({
      message: 'Success: Created WipLocation',
      results: results,
      route: req.route.path,
      editorUserId: editorUserId,
      wipJurisdictionId: wipJurisdictionId
    })
    return res.status(201).json({ status: 'ok', results: results })
  } catch (err) {
    return handleError(err, 400, res)
  }
}

/**
 * update a wip location
 * example: 
 *  update location id 11 under jurisidtion 42:
 *
 * PUT /locations/42/wip/11 
 *  { "address_1": "22 E. 2nd Street" }
 */
exports.updateWip = async (req, res) => {
  let wipJurisdictionId = req.params.wipJurisdictionId
  let wipLocationId = req.params.wipLocationId
  let editorUserId = req.user.id

  logger.info({
    message: 'Updating wip jurisdiction',
    route: req.route.path,
    wipJurisdictionId: wipJurisdictionId,
    wipLocationId: wipLocationId,
    updateData: { ...req.body },
    editorUserId: editorUserId,
  })
  try {
    let results = await req.db.WipLocation.update(
      { ...req.body, editorUserId: editorUserId, wipJurisdictionId: wipJurisdictionId},
      { where: { id: wipLocationId } }
    )
    logger.info({
      message: 'Success: Updated wip location',
      wipJurisdictionId: wipJurisdictionId,
      wipLocationId: wipLocationId,
      editorUserId: editorUserId
    })
    return res.status(200).json({ status: 'ok' })
  } catch (err) {
    return handleError(err, 400, res)
  }
}
