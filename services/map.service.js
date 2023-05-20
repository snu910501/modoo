const MapRepository = require('../repositories/map.repository');

class MapService {
  mapRepository = new MapRepository();

  getMap = async (userId, swLat, swLng, neLat, neLng, zoomLevel) => {
    try {
      const mapList = await this.mapRepository.getMap(
        userId,
        swLat,
        swLng,
        neLat,
        neLng,
        zoomLevel
      );

      return mapList;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = MapService;
