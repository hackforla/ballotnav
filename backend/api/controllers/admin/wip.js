const { Op } = require('sequelize')
const logger = require('@log')

// Version 1: takes directly from user_jurisdiction_with_currwip view
// exports.listMyJurisdictions = async (req, res, next) => {
//   const userId = req.user.id
//
//   const jurisdictions = await req.db.sequelize.query(
//     `
//       SELECT *
//         FROM user_jurisdiction_with_currwip
//         WHERE user_id = ':userId'
//     `,
//     {
//       replacements: { userId },
//       type: req.db.Sequelize.QueryTypes.SELECT,
//     }
//   )
//
//   const transformed = jurisdictions.map((j) => ({
//     stateName: j.state_name,
//     jurisdictionId: j.jurisdiction_id,
//     jurisdictionName: j.jurisdiction_name,
//     jurisdictionStatus: j.jurisdiction_status,
//     wipJurisdictionId: j.wip_jurisdiction_id,
//     wipJurisdictionIsReleased: j.wip_jurisdiction_is_released,
//   }))
//
//   res.json(transformed)
// }

// Version 2: this one changes the 'Published' status to 'Awaiting Edit'
// if the volunteer hasn't started editing yet
exports.listMyJurisdictions = async (req, res, next) => {
  const userId = req.user.id

  const jurisdictions = await req.db.sequelize.query(
    `
    SELECT
    	ujwc.user_id,
    	ujwc.jurisdiction_id,
    	ujwc.state_name,
    	ujwc.jurisdiction_name,
    	ujwc.wip_jurisdiction_id,
    	CASE WHEN ujwc.jurisdiction_status = 'Published'
    		AND j.updated_at < uj.created_at THEN
    		'Awaiting Edit'::text
    	ELSE
    		ujwc.jurisdiction_status
    	END AS jurisdiction_status
    FROM
    	user_jurisdiction_with_currwip AS ujwc
    	JOIN jurisdiction AS j ON j.id = ujwc.jurisdiction_id
    	JOIN user_jurisdiction AS uj ON uj.jurisdiction_id = ujwc.jurisdiction_id
    		AND uj.user_id = ujwc.user_id
    WHERE
    	ujwc.user_id = ':userId'
    `,
    {
      replacements: { userId },
      type: req.db.Sequelize.QueryTypes.SELECT,
    }
  )

  const transformed = jurisdictions.map((j) => ({
    stateName: j.state_name,
    jurisdictionId: j.jurisdiction_id,
    jurisdictionName: j.jurisdiction_name,
    jurisdictionStatus: j.jurisdiction_status,
    wipJurisdictionId: j.wip_jurisdiction_id,
  }))

  res.json(transformed)
}

exports.listReleasedJurisdictions = async (req, res, next) => {
  const jurisdictions = await req.db.sequelize.query(
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

  const transformed = jurisdictions.map((j) => ({
    stateName: j.state_name,
    jurisdictionId: j.jurisdiction_id,
    jurisdictionName: j.jurisdiction_name,
    jurisdictionStatus: j.jurisdiction_status,
    wipJurisdictionId: j.wip_jurisdiction_id,
    wipJurisdictionIsReleased: true,
    editorUserId: j.user_id,
    editorName: `${j.first_name} ${j.last_name}`,
    editorSlackName: j.slack_name,
  }))

  return res.json(transformed)
}

async function getWipJurisdiction(wipJurisdictionId, db) {
  return await db.WipJurisdiction.findByPk(wipJurisdictionId, {
    include: [
      { all: true },
      {
        association: 'locations',
        include: { association: 'hours' },
      },
    ],
  })
}

exports.getReleasedJurisdiction = async (req, res, next) => {
  const { wipJurisdictionId } = req.params
  const data = await getWipJurisdiction(wipJurisdictionId, req.db)
  return res.json(data)
}

exports.getOrCreateWipJurisdiction = async (req, res, next) => {
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

  const data = await getWipJurisdiction(wipJurisdictionId, req.db)
  return res.json(data)
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

  if (data[0] !== 1)
    return res.status(500).json({
      success: false,
      message: 'Release failed.',
    })

  const out = await getWipJurisdiction(wipJurisdictionId, req.db)
  return res.json(out)
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

  const out = await getWipJurisdiction(wipJurisdictionId, req.db)
  return res.json(out)
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

    logger.info({
      message: 'Success: updated wip jurisdiction',
      count: locations.length,
      wipJurisdictionId,
    })

    const data = await getWipJurisdiction(wipJurisdictionId, req.db)
    return res.json(data)
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
