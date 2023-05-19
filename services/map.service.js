const MapRepository = require('../repositories/map.repository');

class MapService {
  mapRepository = new MapRepository();

  getMap = async(userId,swLatLng, neLatLng, zoomLevel) => {
    try{
      const mapList = await this.mapRepository.getMap(userId,swLatLng, neLatLng, zoomLevel);

      return mapList;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = MapService;
