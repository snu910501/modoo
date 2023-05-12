const EstateRepository = require('../repositories/estate.repository');
const uploadImageToS3 = require('../modules/uploadImageToS3');

class EstateService {
  estateRepository = new EstateRepository();

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
    images,
  ) => {
    try {

      //각 항목별로 유효성 검사를 실시해야함
      // options가 배열에 담겨져 오기 때문에

      const estate = await this.estateRepository.setEstate(
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
      );

      //이미지 업로드
      const url = await uploadImageToS3(estate.estateId, images);
      await this.estateRepository.setPropertyImg(estate.estateId, url)


      return;
    } catch (err) {
      throw err;
    }
  };

  getEstateList = async (userId) => {
    try {
      const estateList = await this.estateRepository.getEstateList(userId);

      return estateList;
    } catch (err) {
      throw err;
    }
  };

  getEstate = async (estateId) => {
    try {
      const estate = await this.estateRepository.getEstate(estateId);
      return estate;
    } catch (err) {
      throw err;
    }
  };

}

module.exports = EstateService;