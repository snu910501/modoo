const EstateRepository = require('../repositories/estate.repository');
const uploadImageToS3 = require('../modules/uploadImageToS3');

class EstateService {
  estateRepository = new EstateRepository();

  setEstate = async (
    userId,
    typeOfProperty,
    addressOfProperty,
    transactionType,
    deposit,
    monthly,
    price,
    maintenanceCost,
    moveInData,
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
    images,
  ) => {
    try {

      //각 항목별로 유효성 검사를 실시해야함

      //이미지 업로드
      const url = await uploadImageToS3(images);

      const estate = await this.estateRepository.setEstate(
        userId,
        typeOfProperty,
        addressOfProperty,
        transactionType,
        deposit,
        monthly,
        price,
        maintenanceCost,
        moveInData,
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
      );
      await this.estateRepository.setPropertyImg(estate.estateId, url)
      return;
    } catch (err) {
      throw err;
    }
  }

}

module.exports = EstateService;