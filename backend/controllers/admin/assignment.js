const logger = require('@log')
const { handleError } = require('@controllers/error')

exports.assignJurisdictions = async (req, res) => {
  const { userId, jurisdictionIds, removedJurisdictionIds } = req.body

  logger.info({
    message: 'Updating jurisdiction assignments',
    userId,
    jurisdictionIds,
    removedJurisdictionIds,
  })

  try {
    const assignedJdxs = jurisdictionIds.map((jid) => ({
      userId: userId,
      jurisdictionId: jid,
      status: 'editor',
    }))
    const created = await req.db.UserJurisdiction.bulkCreate(assignedJdxs)
    const removed = await req.db.UserJurisdiction.destroy({
      where: {
        userId: userId,
        jurisdictionId: {
          [req.db.Sequelize.Op.in]: removedJurisdictionIds,
        },
      },
    })
    logger.info({
      message: 'Success: updated jurisdiction assignments',
      created: created,
      removedCount: removed,
    })
    return res.status(201).json({ status: 'ok', results: { created, removed } })
  } catch (err) {
    return handleError(err, 400, res)
  }
}

exports.listJurisdictions = async (req, res, next) => {
  const data = await req.db.Jurisdiction.findAll({
    attributes: ['id', 'name'],
    where: {
      is_eaj: true,
    },
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

exports.listVolunteers = async (req, res) => {
  try {
    const data = await req.db.User.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'notes',
        'slackName',
      ],
      where: {
        role: 'volunteer',
      },
      include: {
        model: req.db.UserJurisdiction,
        as: 'userJurisdictions',
        include: {
          model: req.db.Jurisdiction,
          as: 'jurisdiction',
        },
      },
    })
    res.json(data)
  } catch (err) {
    return handleError(err, 500, res)
  }
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
