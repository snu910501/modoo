const Estate = require("../models/estate");
const { Op } = require("sequelize");
const PropertyOfDong = require('../models/propertyOfDong');

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
        return mapList;
      } else {
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
        const dongList = await PropertyOfDong.findAll({
          where: { userId: userId },
          raw: true,
        })
        return { mapList, dongList };
      }
    } catch (err) {
      throw err;
    }
  };
};

module.exports = MapRepository;
