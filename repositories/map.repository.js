const Estate = require("../models/estate");
const { Op } = require("sequelize");

class MapRepository {
  getMap = async (userId, swLatLng, neLatLng, zoomLevel) => {
    try {
      if (zoomLevel < 4) {
        const mapList = await Estate.findAll({
          where: {
            userId: userId,
            lat: {
              [Op.between]: [swLatLng.lat, neLatLng.lat],
            },
            lng: {
              [Op.between]: [swLatLng.lng, neLatLng.lng],
            },
          },
          raw: true,
          attribute: {
            [Op.not]: "options",
          },
        });

        return mapList;
      } else {

      }
    } catch (err) {
      throw err;
    }
  };
}

module.exports = MapRepository;
