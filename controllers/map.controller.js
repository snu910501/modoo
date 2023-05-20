const MapService = require('../services/map.service');

class MapController {
  mapService = new MapService();

  getMap = async(req,res,next) => {
    try{
      const {userId} = req.params;

      const { swLat, swLng, neLat, neLng, zoomLevel } = req.body;

      const mapList = await this.mapService.getMap(
        userId,
        swLat,
        swLng,
        neLat,
        neLng,
        zoomLevel
      );
      return res.status(200).json({mapList})
    } catch(err) {
      next(err);
    }
  };
};

module.exports = MapController;