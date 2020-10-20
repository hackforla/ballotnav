const { Op } = require('sequelize')
const logger = require('@log')

exports.listJurisdictions = async (req, res, next) => {
  const data = await req.db.Jurisdiction.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        association: 'state',
        attributes: ['id', 'name', 'abbreviation'],
      },
      {
        model: req.db.UserJurisdiction,
        as: 'userJurisdictions',
        attributes: ['id', 'jurisdictionId', 'userId'],
      },
    ],
  })
  return res.json(data)
}

// TODO: not sure if this will be needed

// exports.listUnassignedJurisdictions = async (req, res) => {
//   const assigned = await req.db.UserJurisdiction.findAll({
//     attributes: [
//       'id',
//       ['jurisdiction_id', 'jurisdictionId'],
//     ]
//   });
//   const assignedIds = assigned.map(({ jurisdictionId }) => jurisdictionId);
//   const unassignedJurisdictions = await req.db.Jurisdiction.findAll({
//     include: {
//       association: 'state',
//     },
//     where: {
//       id: {
//         [req.db.Sequelize.Op.notIn]: assignedIds,
//       },
//     },
//   });
//   res.json(unassignedJurisdictions);
// }

exports.listReleasedJurisdictions = async (req, res, next) => {
  const rows = await req.db.sequelize.query(
    `
    SELECT u.last_name, u.first_name, u.slack_name, uj.*
    FROM user_jurisdiction_with_currwip uj
    JOIN "user" u
    ON (uj.user_id = u.id)
    WHERE uj.wip_jurisdiction_is_released = true
  `,
    {
      type: req.db.Sequelize.QueryTypes.SELECT,
    }
  )

  const data = rows.map((row) => ({
    wipJurisdictionId: row.wip_jurisdiction_id,
    editorUserId: row.user_id,
    editorName: `${row.first_name} ${row.last_name}`,
    editorSlackName: row.slack_name,
    jurisdictionName: row.jurisdiction_name,
    jurisdictionStatus: row.jurisdiction_status,
    stateName: row.state_name,
  }))

  return res.json(data)
}

exports.getReleasedJurisdiction = async (req, res, next) => {
  const { wipJurisdictionId } = req.params
  const data = await req.db.WipJurisdiction.findByPk(wipJurisdictionId, {
    include: [
      { all: true },
      {
        association: 'locations',
        include: { association: 'hours' },
      },
    ],
  })
  return res.json(data)
}

exports.listMyJurisdictions = async (req, res, next) => {
  const userId = req.user.id

  const userJurisdictions = await req.db.UserJurisdiction.findAll({
    where: { userId },
    include: {
      association: 'jurisdiction',
      include: { association: 'state' },
    },
  })

  const statuses = await req.db.sequelize.query(
    `
      SELECT jurisdiction_id, jurisdiction_status
        FROM user_jurisdiction_with_currwip
        WHERE user_id = ':userId'
    `,
    {
      replacements: { userId },
      type: req.db.Sequelize.QueryTypes.SELECT,
    }
  )

  const data = userJurisdictions.map((uJ) => ({
    ...uJ.dataValues.jurisdiction.dataValues,
    jurisdictionStatus: (() => {
      const status = statuses.find(
        (status) => status.jurisdiction_id === uJ.jurisdictionId
      )
      return status ? status.jurisdiction_status : 'Unknown'
    })(),
  }))

  res.json(data)
}

// get all child models of jurisdiction plus hours within each location
exports.getJurisdiction = async (req, res, next) => {
  const data = await req.db.Jurisdiction.findByPk(req.params.id, {
    include: [
      { all: true },
      {
        association: 'locations',
        include: { association: 'hours' },
      },
    ],
  })
  return res.json(data)
}

exports.assignJurisdictions = async (req, res) => {
  let jurisdictionIds = [...req.body.jurisdictionIds];
  let removedJurisdictionIds = [...req.body.removedJurisdictionIds];
  let userId = req.body.userId;

  logger.info({
    message: 'Updating jurisdiction assignments',
    userId,
    jurisdictionIds,
    removedJurisdictionIds,
  });

  try {
    let assignedJdxs = jurisdictionIds.map(jid => ({
      userId: userId,
      jurisdictionId: jid,
      status: 'editor',
    }));
    let created = await req.db.UserJurisdiction.bulkCreate(assignedJdxs)
    let removed = await req.db.UserJurisdiction.destroy({
        where: {
          userId: userId,
          jurisdictionId: {
            [req.db.Sequelize.Op.in]: removedJurisdictionIds,
          },
        }
    })
    logger.info({
      message: 'Success: updated jurisdiction assignments',
      created: created,
      removedCount: removed,
    })
    return res.status(201).json({ status: 'ok', results: { created, removed} })
  } catch (err) {
    return handleError(err, 400, res)
  }
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

///////////////////////// WIP STUFF ////////////////////////

exports.getWipJurisdiction = async (req, res, next) => {
  const { jurisdictionId } = req.params
  const userId = req.user.id

  let wipJurisdictionId
  try {
    const response = await req.db.sequelize.query(
      'SELECT wip_jurisdiction_selectorcreate(:jurisdictionId, :userId)',
      {
        replacements: {
          jurisdictionId,
          userId,
        },
        type: req.db.Sequelize.QueryTypes.SELECT,
      }
    )
    wipJurisdictionId = response[0].wip_jurisdiction_selectorcreate
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    })
  }

  const wipJurisdiction = await req.db.WipJurisdiction.findByPk(
    wipJurisdictionId,
    {
      include: [
        { all: true },
        {
          association: 'locations',
          include: { association: 'hours' },
        },
      ],
    }
  )

  return res.json(wipJurisdiction)
}

exports.releaseWipJurisdiction = async (req, res, next) => {
  const { wipJurisdictionId } = req.params
  const editorUserId = req.user.id

  const data = await req.db.WipJurisdiction.update(
    { isReleased: true },
    {
      where: {
        id: wipJurisdictionId,
        editorUserId,
      },
    }
  )

  if (data[0] === 1) return res.json({ success: true })
  else
    return res.status(500).json({
      success: false,
      message: 'Release failed.',
    })
}

exports.publishWipJurisdiction = async (req, res, next) => {
  const { wipJurisdictionId } = req.params
  const publisherUserId = req.user.id

  try {
    await req.db.sequelize.query(
      'SELECT wip_jurisdiction_publish(:wipJurisdictionId, :publisherUserId)',
      {
        replacements: {
          wipJurisdictionId,
          publisherUserId,
        },
      }
    )
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    })
  }

  return res.json({ success: true })
}

/**
 * update a wip_jurisdiction and all associated tables
 *
 * updates on any wip_* models are a hard DELETE and create from
 * the request input.
 */
exports.updateWipJurisdiction = async (req, res, next) => {
  const wipJurisdictionId = Number(req.params.wipJurisdictionId)
  const userId = req.user.id
  const userRole = req.user.role
  const updatedWip = req.body
  logger.info({
    message: 'Upating WipJurisdiction',
    id: wipJurisdictionId,
    editorUserId: userId,
    updatedDataKeys: Object.keys(updatedWip),
  })
  const updater = updateWipJurisdictionChild(wipJurisdictionId)
  const locationsUpdater = updateWipJurisdictionLocation(wipJurisdictionId)
  let result = {}

  try {
    // wip_jurisdiction_url
    const urls = await updater(req.db.WipJurisdictionUrl, updatedWip.urls)
    logger.info({
      message: 'Success: updated urls',
      count: urls.length,
      wipJurisdictionId: wipJurisdictionId,
    })
    delete updatedWip.urls

    // wip_jurisidiction_phone
    const phones = await updater(req.db.WipJurisdictionPhone, updatedWip.phones)
    logger.info({
      message: 'Success: updated phones',
      count: phones.length,
      wipJurisdictionId: wipJurisdictionId,
    })
    delete updatedWip.phones

    // wip_notices
    const notices = await updater(
      req.db.WipJurisdictionNotice,
      updatedWip.notices
    )
    logger.info({
      message: 'Success: updated notices',
      count: notices.length,
      wipJurisdictionId: wipJurisdictionId,
    })
    delete updatedWip.notices

    // wip news
    const news = await updater(req.db.WipJurisdictionNews, updatedWip.news)
    logger.info({
      message: 'Success: updated news',
      count: news.length,
      wipJurisdictionId: wipJurisdictionId,
    })
    delete updatedWip.news

    // wip infoTab
    const infoTabs = await updater(
      req.db.WipJurisdictionInfoTab,
      updatedWip.infoTabs
    )
    logger.info({
      message: 'Success: updated infoTabs',
      count: infoTabs.length,
      wipJurisdictionId: wipJurisdictionId,
    })
    delete updatedWip.infoTabs

    // wip important dates
    const importantDates = await updater(
      req.db.WipJurisdictionImportantDate,
      updatedWip.importantDates
    )
    logger.info({
      message: 'Success: updated importantDates',
      count: importantDates.length,
      wipJurisdictionId: wipJurisdictionId,
    })
    delete updatedWip.importantDates

    // handle locations
    const locations = await locationsUpdater(req.db, updatedWip.locations)
    logger.info({
      message: 'Success: updated wip locations and wip location hours',
      count: locations.length,
      wipJurisdictionId: wipJurisdictionId,
    })
    delete updatedWip.locations

    // update the instance of wipJurisdiction
    await req.db.WipJurisdiction.update(
      {
        ...updatedWip,
        ...(userRole === 'admin' ? {} : { isReleased: false }), // volunteer edits after release set released to false
      },
      {
        where: { id: wipJurisdictionId },
      }
    )
    const wj = await req.db.WipJurisdiction.findOne({
      where: { id: wipJurisdictionId },
    })

    logger.info({
      message: 'Success: updated wip jurisdiction',
      count: locations.length,
      wipJurisdictionId: wj.id,
    })
    return res.status(200).json({
      ...wj.dataValues,
      locations,
      importantDates,
      infoTabs,
      news,
      notices,
      phones,
      urls,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * delete and then create any available records
 */
function updateWipJurisdictionChild(wipJurisdictionId) {
  return async function _updateChild(_model, records, ...rest) {
    if (_model === undefined) {
      throw Error('Cannot update items without defined model')
    }
    try {
      let deleted = await _model.destroy({
        where: { wipJurisdictionId: wipJurisdictionId },
        paranoid: false,
      })
      logger.info({
        message: `Deleted #${deleted} records on update wip jurisdiction`,
        wipJurisdictionId: wipJurisdictionId,
        count: deleted,
        modelName: _model.getTableName(),
      })
    } catch (err) {
      logger.error({
        message: `Error deleting records on update wip jurisdiction related model`,
        modelName: _model.getTableName(),
        wipJurisdictionId: wipJurisdictionId,
        error: err,
      })
      throw err
    }

    if (records === undefined || records.length < 1) {
      // don't bother creating records if there are none
      logger.info({
        message: `Skipping update on ${_model.getTableName()} no records to update`,
        wipJurisdictionId: wipJurisdictionId,
        modelName: _model.getTableName(),
      })
      return []
    }

    try {
      // add in the wipJurisdictionId to each of the records
      let recordsToInsert = records.map((r) => ({ wipJurisdictionId, ...r }))
      let updates = await _model.bulkCreate(recordsToInsert)
      logger.info({
        message: `Success: Updated model ${_model.getTableName()}`,
        wipJurisdictionId: wipJurisdictionId,
        count: updates.length,
        modelName: _model.getTableName(),
      })
      return updates
    } catch (err) {
      logger.error({
        message: `Error creating new records on update model ${_model.getTableName()}`,
        wipJurisdictionId: wipJurisdictionId,
        modelName: _model.getTableName(),
        error: err,
      })
      throw err
    }
  }
}

/**
 * special handling for locations and locations hours
 */
function updateWipJurisdictionLocation(wipJurisdictionId) {
  return async function (db, locations) {
    try {
      let existingLocations = await db.WipLocation.findAll({
        where: { wipJurisdictionId },
      })
      let existingLocationsIds = existingLocations.map((loc) => loc.id)
      // remove all hours from the existing locations
      let deletedWipLocationHours = await db.WipLocationHours.destroy({
        where: {
          wipLocationId: {
            [Op.in]: existingLocationsIds,
          },
        },
      })
      logger.info({
        message: 'Success: deleted wip location hours',
        count: deletedWipLocationHours,
        wipJurisdictionId: wipJurisdictionId,
      })
    } catch (err) {
      logger.error({
        message: 'Error: failed to delete wip location hours. ',
        err: err.original,
        wipJurisdictionId: wipJurisdictionId,
      })
      throw Error('Error updating wip location hours ', err)
    }

    // delete all previous WipLocations
    try {
      let deletedWipLocations = await db.WipLocation.destroy({
        where: {
          wipJurisdictionId: wipJurisdictionId,
        },
        paranoid: false,
      })
      logger.info({
        message: 'Success: deleted wip locations',
        count: deletedWipLocations,
        wipJurisdictionId: wipJurisdictionId,
      })
    } catch (err) {
      logger.error({
        message:
          'Error: failed to find wip locations and delete wip location hours. ',
        err: err,
        wipJurisdictionId: wipJurisdictionId,
      })
      throw Error('Error updating wip locations. ', err)
    }

    // create the WipLocations
    try {
      let results = await db.WipLocation.bulkCreate(
        locations.map((l) => ({
          ...l,
          wipJurisdictionId,
        })),
        { include: { association: 'hours' } }
      )
      logger.info({
        message: 'Success: created wip locations and wip location hours',
        count: results.length,
        wipJurisdictionId: wipJurisdictionId,
      })
      return results
    } catch (err) {
      logger.error({
        message: 'Error: failed to create wip locations. ',
        err: err,
        wipJurisdictionId: wipJurisdictionId,
      })
      throw Error('Error updating wip locations. ', err)
    }
  }
}
