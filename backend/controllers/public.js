const logger = require('@log')
const { handleError } = require('@controllers/error')

/**
 * Get list of jurisdictions from user lat/lon
 */
exports.getJurisdictionsFromLatLon = async (req, res) => {
    let { userLat, userLon } = req.body;
  
    try{
      const jurisdictions = await req.db.Jurisdiction.getJurisdictionsFromLatLon(userLat, userLon);
  
      return res.json({jurisdictions})
    } catch (err){
      return handleError(err, 400, res)
    }
  }

