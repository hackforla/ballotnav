
exports.getJurisdictions = async (req, res) => {
  const data = await req.db.Jurisdiction.findAll({
    include: [
      {
        association: 'locations',
      },
    ],
  })
  return res.json(data)
}

exports.getGisStates = async (req, res) => {
  const data = await req.db.sequelize.query(
    `
      SELECT name, statefp
        FROM gis_shapes
        WHERE dataset = 'cb_us_state'
    `,
    {
      type: req.db.Sequelize.QueryTypes.SELECT,
    }
  )
  return res.json(data)
}

exports.getGisCounties = async (req, res) => {
  const { statefp } = req.params

  const data = await req.db.sequelize.query(
    `
      SELECT name, countyfp, geo
        FROM gis_shapes
        WHERE dataset = 'cb_us_county' AND statefp = :statefp
    `,
    {
      replacements: { statefp },
      type: req.db.Sequelize.QueryTypes.SELECT,
    }
  )

  return res.json(data)
}

exports.getCountyByLonLat = async (req, res) => {
  let { lon, lat } = req.body
  
  const data = await req.db.sequelize.query(
    `
    SELECT *
    	FROM gis_shapes as gs
    	WHERE dataset IN ('cb_us_county', 'cb_us_state') AND
        ST_Contains (gs.geo , ST_PointFromText ('POINT(:lon :lat)' , 4326))
    `,
    {
      replacements: { lon: +lon, lat: +lat },
      type: req.db.Sequelize.QueryTypes.SELECT,
    }
  )

  return res.json(data)
}
