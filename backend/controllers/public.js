const logger = require('@log')
const { handleError } = require('@controllers/error')
const { QueryTypes } = require('sequelize');

/**
 * Get list of jurisdictions from user lat/lon
 */
exports.getJurisdictionsFromLatLon = async (req, res) => {
    let { userLat, userLon } = req.body;
  
    try{
      const jurisdictions = await req.db.sequelize.query(`SELECT * FROM jurisdictions_from_lonlatstring('${userLon} ${userLat}');`, { type:QueryTypes.SELECT });
  
      return res.json({jurisdictions})
    } catch (err){
      return handleError(err, 400, res)
    }
  }
