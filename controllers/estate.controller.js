const EstateService = require("../services/estate.service");

class EstateController {
  estateService = new EstateService();

  setEstate = async (req, res, next) => {
    try {
      const {
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
        rightMoney,
        mainCategory,
        subCategory,
      } = req.body;

      const images = req.files;
      const userId = res.locals.userId;

      console.log("images controller", addressOfJibun);

      await this.estateService.setEstate(
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
        rightMoney,
        mainCategory,
        subCategory,
        images
      );

      return res.status(200).json({ message: "매물 등록 성공" });
    } catch (err) {
      next(err);
    }
  };

  putEstate = async (req, res, next) => {
    try {
      const {
        estateId,
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
        rightMoney,
        mainCategory,
        subCategory,
      } = req.body;

      const images = req.files;
      const userId = res.locals.userId;

      await this.estateService.putEstate(
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
        rightMoney,
        mainCategory,
        subCategory,
        images
      );

      return res.status(200).json({ message: '매물 수정이 완료되었습니다.' })
    } catch (err) {
      next(err);
    }
  };

  getEstateList = async (req, res, next) => {
    try {
      const userId = res.locals.userId;

      const estateList = await this.estateService.getEstateList(userId);
      console.log("estate controller", estateList);

      return res.status(200).json({ estateList: estateList });
    } catch (err) {
      next(err);
    }
  };

  getEstate = async (req, res, next) => {
    try {
      const { estateId } = req.params;

      const estate = await this.estateService.getEstate(estateId);
      return res.status(200).json({ estate: estate });
    } catch (err) {
      next(err);
    }
  };

  deleteEstate = async (req, res, next) => {
    try {
      const userId = res.locals.userId;
      const { estateId } = req.params;

      await this.estateService.deleteEstate(estateId, userId);
      return res.status(200).json({ message: "매물을 삭제하였습니다." });
    } catch (err) {
      next(err);
    }
  };

  getUserEstate = async (req, res, next) => {
    try {
      const { userId } = req.params;

      const estates = await this.estateService.getUserEstate(userId);
      return res.status(200).json({ estates: estates });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = EstateController;
