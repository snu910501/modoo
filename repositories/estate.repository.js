const Estate = require("../models/estate");
const PropertyImg = require("../models/propertyImg");
const PropertyOfDefault = require('../models/propertyOfDefault');
const Error = require('../modules/errorHandler');

class EstateRepository {
  setEstate = async (
    userId,
    typeOfProperty,
    addressOfProperty,
    dong,
    transactionType,
    deposit,
    monthly,
    price,
    maintenanceCost,
    moveInDate,
    moveInDateInput,
    supplyArea,
    exclusiveArea,
    numOfRoom,
    numOfBath,
    numOfFloor,
    floor,
    parking,
    elevator,
    pet,
    options,
    detail,
    lowestFloor,
    highestFloor,
    lat,
    lng
  ) => {
    try {
      // 매물사진과 정보를 따로 저장해야함.
      const estate = await Estate.create({
        userId,
        typeOfProperty,
        addressOfProperty,
        dong,
        transactionType,
        deposit,
        monthly,
        price,
        maintenanceCost,
        moveInDate,
        moveInDateInput,
        supplyArea,
        exclusiveArea,
        numOfRoom,
        numOfBath,
        numOfFloor,
        floor,
        parking,
        elevator,
        pet,
        options,
        lowestFloor,
        highestFloor,
        detail,
        lat,
        lng
      });

      await PropertyOfDefault.create({
        userId,
        estateId : estate.estateId,
        lat,
        lng
      })

      return estate;
    } catch (err) {
      throw err;
    }
  };

  putEstate = async (
    estateId,
    userId,
    typeOfProperty,
    addressOfProperty,
    dong,
    transactionType,
    deposit,
    monthly,
    price,
    maintenanceCost,
    moveInDate,
    moveInDateInput,
    supplyArea,
    exclusiveArea,
    numOfRoom,
    numOfBath,
    numOfFloor,
    floor,
    parking,
    elevator,
    pet,
    options,
    detail,
    lowestFloor,
    highestFloor
  ) => {
    try {
      const getEstate = await Estate.findOne({
        where : {estateId : estateId}
      });

      if(!getEstate) {
        throw new Error(501, '존재하지 않는 매물입니다');
      };

      const estate = await Estate.update(
        {
          userId,
          typeOfProperty,
          addressOfProperty,
          dong,
          transactionType,
          deposit,
          monthly,
          price,
          maintenanceCost,
          moveInDate,
          moveInDateInput,
          supplyArea,
          exclusiveArea,
          numOfRoom,
          numOfBath,
          numOfFloor,
          floor,
          parking,
          elevator,
          pet,
          options,
          lowestFloor,
          highestFloor,
          detail,
        },
        { where: { estateId: getEstate.estateId } }
      );

      return estate;
    } catch (err) {
      throw err;
    }
  };

  setPropertyImg = async (estateId, urls) => {
    try {
      let num = 1;
      await Promise.all(
        urls.map(async (url) => {
          await PropertyImg.create({
            estateId: estateId,
            imgOfUrl: url.location,
            imgIndex: num++,
          });
        })
      );
      return;
    } catch (err) {
      throw err;
    }
  };

  deletePropertyImg = async(estateId) => {
    try{
      await PropertyImg.destroy({
        where : {estateId}
      })
      console.log('이미지 삭제 성공');
      return;
    }catch(err) {
      throw err;
    }
  }

  getEstateList = async (userId) => {
    try {
      const estateList = await Estate.findAll({
        where: {
          userId: userId,
        },
        attributes: [
          "estateId",
          "typeOfProperty",
          "addressOfProperty",
          "transactionType",
          "deposit",
          "monthly",
          "price",
          "exclusiveArea",
          "numOfRoom",
          "numOfBath",
          "estateId",
        ],
        raw: true,
      });

      const images = await Promise.all(
        estateList.map(async (list) => {
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

      return estateList;
    } catch (err) {
      throw err;
    }
  };

  getEstate = async (estateId) => {
    try {
      const estate = await Estate.findOne({
        where: {
          estateId: estateId,
        },
        raw: true,
      });

      const img = await PropertyImg.findAll({
        where: {
          estateId: estateId,
        },
        raw: true,
      });
      console.log("estate", estate, img);
      estate.imgs = img;
      console.log(estate);

      return estate;
    } catch (err) {
      throw err;
    }
  };

  deleteEstate = async (estateId) => {
    try {
      await Estate.destroy({
        where: {
          estateId: estateId,
        },
      });
      return;
    } catch (err) {
      throw err;
    }
  };

  getUserEstate = async (userId) => {
    try {
      const estates = await Estate.findAll({
        where: {
          userId: userId,
        },
        raw: true,
      });

      return estates;
    } catch (err) {}
  };
}

module.exports = EstateRepository;
