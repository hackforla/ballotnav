const logger = require('@log')
const { handleError } = require('@controllers/error')

exports.list = async (req, res) => {
  let route = req.route.path

  logger.info({
    message: 'List jurisdictions',
    route: route,
  })

  try {
    const data = await req.db.Jurisdiction.findAll()
    res.json(data)
  } catch (err) {
    return handleError(err, 500, res)
  }
}

exports.create = (req, res, next) => {
  req.db.Jurisdiction.create(req.body)
    .then((data) => res.json(data))
    .catch(next)
}

exports.delete = (req, res, next) => {
  req.db.Jurisdiction.destroy({
    where: { id: req.body.id },
  })
    .then((data) => res.json(data))
    .catch(next)
}

exports.assign = (req, res, next) => {
  const { userId, jurisdictionId } = req.body
  req.db.UserJurisdiction.create({
    userId,
    jurisdictionId,
    status: 'editor',
  })
    .then((data) => res.json(data))
    .catch(next)
}

// list user jurisdictions
// TODO: this should use the User/UserJurisdiction/Jurisdiction
// association but it's not working
exports.listMine = async (req, res, next) => {
  const userId = req.user.id

  const assigns = await req.db.UserJurisdiction.findAll({
    where: { userId },
  })
  const jurisIds = assigns.map((assign) => assign.jurisdictionId)
  const jurisdictions = await req.db.Jurisdiction.findAll({
    where: {
      id: {
        [req.db.Sequelize.Op.in]: jurisIds,
      },
    },
    attributes: ['id', 'name'],
  })
  res.json(jurisdictions)
}

/**
 * list wip jurisidictions
 */
exports.listWip = async (req, res) => {
  let editorUserId = req.query.editor
  let queryBy = { where: {} }
  logger.info({
    message: 'List wip jurisdictions',
    route: req.route.path,
    editorUserId: editorUserId || 'all',
  })

  if (editorUserId !== undefined) {
    // we are listing wip created by a given editor
    queryBy.where = { editorUserId: editorUserId }
  }

  try {
    const data = await req.db.WipJurisdiction.findAll(queryBy)
    return res.status(201).json({ status: 'ok', results: data })
  } catch (err) {
    return handleError(err, 400, res)
  }
}

/**
 * list any wip locations for a given wip jurisdiction
 */
exports.listWipJurisdictionsWipLocation = async (req, res) => {
  let wipJurisdictionId = req.params.wipJurisdictionId
  if (wipJurisdictionId === null || wipJurisdictionId === undefined) {
    return handleError({ message: 'Missing required field' }, 400, res)
  }
  logger.info({
    message: 'Listing wip locations by jurisdiction',
    route: req.route.path,
    wipJurisdictionId: wipJurisdictionId,
  })

  try {
    let results = await req.db.WipLocation.findAll({
      where: { wipJurisdictionId: wipJurisdictionId },
    })
    logger.info({
      message: 'Success: Got wip location results',
      count: results.length,
      wipJurisdictionId: wipJurisdictionId,
    })
    return res.status(200).json({ status: 'ok', results: results })
  } catch (err) {
    return handleError(err, 400, res)
  }
}

exports.createWip = async (req, res, next) => {
  const { jurisdictionId } = req.body
  const editorUserId = req.user.id

  const publishedData = await req.db.Jurisdiction.findByPk(jurisdictionId)

  try {
    const newWip = await req.db.WipJurisdiction.create({
      ...publishedData.dataValues,
      editorUserId,
      jurisdictionId,
      editBasisWipJurisdictionId: publishedData.wipJurisdictionId,
    })
    return res.json(newWip)
  } catch (err) {
    // wip already exists
    return res.status(200).send({ alreadyExists: true })
  }
}

/**
 * creates a WipJurisdiction entry
 */
// exports.createWip = async (req, res) => {
//   let data = req.body
//   let editorUserId = req.user.id
//   logger.info({
//     message: 'Creating a wip jurisdiction',
//     route: req.route.path,
//     editorUserId: editorUserId,
//   })
//
//   try {
//     let results = await req.db.WipJurisdiction.create({
//       ...data,
//       editorUserId: editorUserId,
//     })
//     logger.info({
//       message: 'Success: Created WipJurisdiction',
//       results: results,
//       route: req.route.path,
//       editorUserId: editorUserId,
//     })
//     return res.status(201).send({ status: 'ok', results: results })
//   } catch (err) {
//     return handleError(err, 400, res)
//   }
// }

/**
 * update a wip jurisdiction
 */
exports.updateWip = async (req, res) => {
  let wipJurisdictionId = req.params.wipJurisdictionId
  let editorUserId = req.user.id

  if (wipJurisdictionId === undefined || wipJurisdictionId === null) {
    return handleError(
      { message: 'Missing required field: wipJurisdictionId' },
      400,
      res
    )
  }

  logger.info({
    message: 'Updating wip jurisdiction',
    route: req.route.path,
    wipJurisdictionId: wipJurisdictionId,
    updateData: { ...req.body },
    editorUserId: editorUserId,
  })
  try {
    let results = await req.db.WipJurisdiction.update(
      { ...req.body, editorUserId: editorUserId },
      { where: { id: wipJurisdictionId } }
    )
    logger.info({
      message: 'Success: Updated wip jurisdiction',
      wipJurisdictionId: wipJurisdictionId,
    })
    return res.status(200).send({ status: 'ok' })
  } catch (err) {
    return handleError(err, 400, res)
  }
}
