const EstateRepository = require("../repositories/estate.repository");
const uploadImageToS3 = require("../modules/uploadImageToS3");
const deleteImageFromS3 = require('../modules/deleteImageFromS3');
const addressToGeo = require('../modules/addressToGeo');
const addressToDong = require('../modules/addressToDong');
const clusterByDong = require('../modules/clusterByDong');

class EstateService {
  estateRepository = new EstateRepository();

  setEstate = async (
    userId,
    typeOfProperty,
    addressOfProperty,
    addressOfJibun,
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
    images
  ) => {
    try {
      //각 항목별로 유효성 검사를 실시해야함
      // options가 배열에 담겨져 오기 때문에

      //주소를 위 경도 값으로 변경해야함

      const { lat, lng } = await addressToGeo(addressOfProperty);

      //주소를 동 단위로 클러스터링 해야한다.
      console.log('pp', addressOfJibun);
      const dong = await clusterByDong(addressOfJibun);
      const dongLatLng = await addressToDong(addressOfJibun);
      this.estateRepository.clusterByDong(userId, dong, dongLatLng);

      // 매물 저장을 한다.

      const estate = await this.estateRepository.setEstate(
        userId,
        typeOfProperty,
        addressOfProperty,
        addressOfJibun,
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
      );

      //이미지 업로드
      const url = await uploadImageToS3(estate.estateId, images);
      await this.estateRepository.setPropertyImg(estate.estateId, url);

      return;
    } catch (err) {
      throw err;
    }
  };

  putEstate = async (
    estateId,
    userId,
    typeOfProperty,
    addressOfProperty,
    addressOfJibun,
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
    images
  ) => {
    try {
      const estate = await this.estateRepository.putEstate(
        estateId,
        userId,
        typeOfProperty,
        addressOfProperty,
        addressOfJibun,
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
      );

      // S3에서 이미지 삭제하고 다시 저장
      await deleteImageFromS3(estateId);
      const url = await uploadImageToS3(estateId, images);

      // DB의 이미지 파일들 경로 다시 설정해야함.
      await this.estateRepository.deletePropertyImg(estateId);
      await this.estateRepository.setPropertyImg(estateId, url);
      // await this.estateRepository.setPropertyImg(estate.estateId, url);
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

  deleteEstate = async (estateId) => {
    try {
      await this.estateRepository.deleteEstate(estateId);
      return;
    } catch (err) {
      throw err;
    }
  };

  getUserEstate = async (userId) => {
    try {
      const estates = await this.estateRepository.getUserEstate(userId);
      return estates;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = EstateService;
