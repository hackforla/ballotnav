
exports.getJurisdictions = async (req, res) => {
  const data = await req.db.Jurisdiction.findAll({
    include: [
      {
        association: 'locations',
        attributes: ['geomLongitude', 'geomLatitude'],
      },
    ],
  })
  return res.json(data)
}
