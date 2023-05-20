const Estate = require("../models/estate");
const { Op } = require("sequelize");

class MapRepository {
  getMap = async (userId, swLat, swLng, neLat, neLng, zoomLevel) => {
    try {
      if (zoomLevel < 4) {
        const mapList = await Estate.findAll({
          where: {
            userId: userId,
            lat: {
              [Op.between]: [swLat, neLat],
            },
            lng: {
              [Op.between]: [swLng, neLng],
            },
          },
          raw: true,
          attribute: {
            [Op.not]: "options",
          },
        });
        console.log("mapList", mapList);
        return mapList;
      } else {
      }
    } catch (err) {
      throw err;
    }
  };
};

module.exports = MapRepository;
