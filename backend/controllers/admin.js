
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
    where: { id: { [req.db.Sequelize.Op.in]: [186, 187, 188, 189, 190, 650] } },
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

///////////////////////// WIP STUFF ////////////////////////

exports.getWipJurisdiction = async (req, res, next) => {
  const { jurisdictionId } = req.params
  const editorUserId = req.user.id

  const findWipJurisdiction = async () => {
    return await req.db.WipJurisdiction.findOne({
      where: {
        jurisdictionId,
        editorUserId,
      },
      include: [
        { all: true },
        {
          association: 'locations',
          include: { association: 'hours' },
        },
      ],
    })
  }

  const createWipJurisdiction = async () => {
    return await req.db.sequelize.query(
      'SELECT wip_jurisdiction_create(:jurisdictionId, :editorUserId)',
      {
        replacements: {
          jurisdictionId,
          editorUserId,
        }
      }
    )
  }

  // try to find it
  let data = await findWipJurisdiction()
  if (data) return res.json(data)

  // if it doesn't exist, create it
  try {
    await createWipJurisdiction()
  } catch(e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    })
  }

  data = await findWipJurisdiction()
  return res.json(data)
}

exports.releaseWipJurisdiction = async (req, res, next) => {
  const { wipJurisdictionId } = req.params
  const editorUserId = req.user.id

  const data = await req.db.WipJurisdiction.update({ isReleased: true }, {
    where: {
      id: wipJurisdictionId,
      editorUserId,
    },
  })

  if (data[0] === 1)
    return res.json({ success: true })
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
        }
      }
    )
  } catch(e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    })
  }

  return res.json({ success: true })
}

exports.updateWipJurisdiction = async (req, res, next) => {
  const { wipJurisdictionId } = req.params
  const userId = req.user.id
  const updatedWip = req.body

  /*
    TODO: make the database consistent with the updatedWip

    updatedWip is a nested object that looks like this:
    {
      ...jurisdiction details,
      locations: [
        ...location details,
        hours: []
      ],
      importantDates: [],
      infoTabs: [],
      news: [],
      notices: [],
      phones: [],
      urls: []
    }

    It will contain ALL of the data in the wip jurisdiction (not just the
    changes made by the volunteer). And note that the arrays above may contain
    new rows in addition to the existing ones :)
  */

  // this line is temporary -- we should return the actual database contents
  // after updating, not the data that was passed in from the client.
  return res.json(updatedWip)
}
