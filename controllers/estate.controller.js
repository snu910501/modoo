const EstateService = require('../services/estate.service');

class EstateController {
  estateService = new EstateService();

  setEstate = async (req, res, next) => {
    try {
      const {
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
      } = req.body;

      const images = req.files;

      console.log('information',
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
      )

      await this.estateService.setEstate(
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
        images,
      );
      return res.status(200).json({ message: '매물 등록 성공' })
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EstateController;