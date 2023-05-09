const EstateService = require('../services/estate.service');

class EstateController {
  estateService = new EstateService();

  setEstate = async (req, res, next) => {
    try {
      const {
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
      } = req.body;

      const images = req.files;
      const userId = res.locals.userId;

      console.log('images controller', images);

      await this.estateService.setEstate(
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
      );
      return res.status(200).json({ message: '매물 등록 성공' })
    } catch (err) {
      next(err);
    }
  };

  getEstateList = async (req, res, next) => {
    try {
      const userId = res.locals.userId;

      const estateList = await this.estateService.getEstateList(userId);
      console.log('estate controller', estateList);

      return res.status(200).json({ estateList: estateList })
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EstateController;