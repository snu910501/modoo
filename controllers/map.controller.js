const MapService = require('../services/map.service');

class MapController {
  mapService = new MapService();

  getMap = async(req,res,next) => {
    try{
      const {userId} = req.params;
      const { swLatLng, neLatLng, zoomLevel } = req.body;

      console.log(userId, swLatLng, neLatLng, zoomLevel)

      const mapList = await this.mapService.getMap(userId, swLatLng, neLatLng, zoomLevel);
      return res.status(200).json({mapList})
    } catch(err) {
      next(err);
    }
  };
}

module.exports = MapController;