
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
