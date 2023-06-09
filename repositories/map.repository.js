const Estate = require("../models/estate");
const { Op } = require("sequelize");
const PropertyOfDong = require('../models/propertyOfDong');
const PropertyImg = require('../models/propertyImg')
const User = require('../models/user');

class MapRepository {
  getMap = async (userId, swLat, swLng, neLat, neLng, zoomLevel) => {
    try {
      console.log('swLat :', swLat, 'swLng :', swLng, 'neLat :', neLat, 'neLng :', neLng)
      if (zoomLevel < 4) {

        const startLocation = await User.findOne({
          where: {
            userId: userId
          },
          raw: true,
          attributes: ['startLocationLat', 'startLocationLng']
        })

        console.log('hahaha', startLocation)

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
        const images = await Promise.all(
          mapList.map(async (list) => {
            const propertyImages = await PropertyImg.findAll({
              where: {
                estateId: list.estateId,
              },
              raw: true, // raw 옵션을 추가해 raw data로 조회
              attributes: {
                exclude: ["_previousDataValues"], // _previousDataValues 제외
              },
            });
            list.imgs = propertyImages;
            return propertyImages;
          })
        );

        return { mapList, startLocation };
      } else {

        const startLocation = await User.findOne({
          where: {
            userId: userId
          },
          raw: true,
          attributes: ['startLocationLat', 'startLocationLng']
        })

        console.log('hahaha', startLocation)

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
        const images = await Promise.all(
          mapList.map(async (list) => {
            const propertyImages = await PropertyImg.findAll({
              where: {
                estateId: list.estateId,
              },
              raw: true, // raw 옵션을 추가해 raw data로 조회
              attributes: {
                exclude: ["_previousDataValues"], // _previousDataValues 제외
              },
            });
            list.imgs = propertyImages;
            return propertyImages;
          })
        );
        const dongList = await PropertyOfDong.findAll({
          where: { userId: userId },
          raw: true,
        })
        console.log('mapList', mapList, dongList);
        return { mapList, dongList, startLocation };
      }
    } catch (err) {
      throw err;
    }
  };
};

module.exports = MapRepository;
