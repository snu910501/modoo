const Estate = require('../models/estate');
const PropertyImg = require('../models/propertyImg');

class EstateRepository {
  setEstate = async (
    userId,
    typeOfProperty,
    addressOfProperty,
    transactionType,
    deposit,
    monthly,
    price,
    maintenanceCost,
    moveInDate,
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
    url
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
      });

      return estate;
    } catch (err) {
      throw err;
    };
  };

  setPropertyImg = async (estateId, urls) => {
    try {
      await Promise.all(urls.map(async (url) => {
        console.log('hi', url);
        await PropertyImg.create({
          estateId: estateId,
          imgOfUrl: url.location
        })
      }))
      return;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = EstateRepository;