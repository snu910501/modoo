const MapService = require('../services/map.service');

class MapController {
  mapService = new MapService();

  getMap = async(req,res,next) => {
    try{
      const {userId} = req.params;

      const { swLatLng, neLatLng, zoomLevel } = req.body;
      const swLat = swLatLng.lat;
      const swLng = swLatLng.lng;
      const neLat = neLatLng.lat;
      const neLng = neLatLng.lng;

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