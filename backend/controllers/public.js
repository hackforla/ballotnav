const logger = require('@log')
const { handleError } = require('@controllers/error')

/**
 * Get list of jurisdictions from user lat/lon
 */
exports.getJurisdictionsFromLatLon = async (req, res) => {
  const { lon, lat } = req.query

  try {
    const jurisdictions = await req.db.sequelize.query(
      `SELECT * FROM jurisdictions_from_lonlatstring('${lon} ${lat}')`,
      {
        type: req.db.Sequelize.QueryTypes.SELECT,
      }
    )

    return res.json(
      jurisdictions.map((j) => ({
        id: j.jurisdiction_id,
        name: j.jurisdiction_name,
        stateId: j.state_id,
        stateName: j.state_name,
        isEaj: j.is_eaj,
        isEajExclusive: j.is_eaj_exclusive,
        isPublished: j.is_published,
      }))
    )
  } catch (err) {
    return handleError(err, 400, res)
  }
}

exports.listStates = async (req, res) => {
  const data = await req.db.State.findAll({
    attributes: ['id', 'name'],
  })
  return res.json(data)
}

exports.listStatesAndJurisdictions = async (req, res) => {
  const data = await req.db.State.findAll({
    attributes: ['id', 'name'],
    order: [['name', 'ASC']],
    include: {
      association: 'jurisdictions',
      attributes: ['id', 'name'],
      separate: true,
      order: [['name', 'ASC']],
    },
  })
  return res.json(data)
}

exports.getState = async (req, res) => {
  const { stateId } = req.params
  logger.info({
    message: `getState on state id ${stateId}`,
  })

  try {
    const data = await req.db.State.findByPk(stateId, {
      include: [
        { association: 'importantDates' },
        { association: 'infoTabs' },
        { association: 'news' },
        { association: 'notices' },
        { association: 'urls' },
      ],
    })
    if (data === null) {
      logger.error({
        message: `Error: getState called on invalid state id: ${stateId}`,
      })
      return handleError({ message: 'Invalid state request' }, 400, res)
    }
    return res.json(data)
  } catch (err) {
    logger.error({
      message: `Error: getState`,
      error: err,
    })
    return handleError(err, 400, res)
  }
}

exports.listJurisdictionsInState = async (req, res) => {
  const { stateId } = req.params
  const data = await req.db.Jurisdiction.findAll({
    where: { stateId },
    attributes: ['id', 'name'],
  })
  return res.json(data)
}

exports.getJurisdiction = async (req, res) => {
  const { jurisdictionId } = req.params
  const data = await req.db.Jurisdiction.findByPk(jurisdictionId, {
    include: [
      {
        association: 'locations',
        include: { association: 'hours' },
      },
      { association: 'importantDates' },
      { association: 'infoTabs' },
      { association: 'news' },
      { association: 'notices' },
      { association: 'phones' },
      {
        association: 'urls',
        include: {
          association: 'urlType',
          attributes: ['name', 'isEmail'],
        },
      },
    ],
  })
  return res.json(data)
}
