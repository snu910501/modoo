const Estate = require("../models/estate");
const PropertyImg = require("../models/propertyImg");
const PropertyOfDong = require("../models/propertyOfDong");
const Error = require("../modules/errorHandler");

class EstateRepository {
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
    rightMoney,
    mainCategory,
    subCategory,
    lat,
    lng
  ) => {
    try {
      // 매물사진과 정보를 따로 저장해야함.
      console.log('지번주소zz', addressOfJibun);
      const estate = await Estate.create({
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
        lowestFloor,
        highestFloor,
        detail,
        rightMoney,
        mainCategory,
        subCategory,
        lat,
        lng,
      });

      return estate;
    } catch (err) {
      throw err;
    }
  };

  clusterByDong = async (userId, dong, dongLatLng) => {
    try {
      const dongExist = await PropertyOfDong.findOne({
        where: {
          nameOfDong: dong,
          userId: userId,
        },
      });

      if (dongExist) {
        let number = parseInt(dongExist.numOfDong);

        await PropertyOfDong.update(
          {
            numOfDong: number + 1,
          },
          { where: { nameOfDong: dong } }
        );

        return;
      } else {
        await PropertyOfDong.create({
          userId: userId,
          nameOfDong: dong,
          numOfDong: 1,
          lat: dongLatLng.lat,
          lng: dongLatLng.lng,
        });
        return;
      }
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
    rightMoney,
    mainCategory,
    subCategory,
  ) => {
    try {
      const getEstate = await Estate.findOne({
        where: { estateId: estateId },
      });

      if (!getEstate) {
        throw new Error(501, "존재하지 않는 매물입니다");
      };

      if (userId != getEstate.userId) {
        throw new Error(501, '잘못된 접근 방법입니다.');
      }

      const estate = await Estate.update(
        {
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
          lowestFloor,
          highestFloor,
          rightMoney,
          mainCategory,
          subCategory,
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

  deletePropertyImg = async (estateId) => {
    try {
      await PropertyImg.destroy({
        where: { estateId },
      });
      console.log("이미지 삭제 성공");
      return;
    } catch (err) {
      throw err;
    }
  };

  getEstateList = async (userId) => {
    // 중개사 페이지에서 보유하고 있는 매물 리스트를 보여줌
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

  deleteEstate = async (estateId, userId) => {
    try {

      // 로직은 일단 해당 매물이 존재하는지 확인부터합니다.
      const estateExist = await Estate.findOne({
        where: {
          estateId: estateId,
          userId: userId,
        }
      })


      // 매물이 존재한다면 Estate, PropertyOfDong DB에서 데이터들을 삭제,수정
      // 해야하기 때문에 아래의 절차를 거칩니다.
      if (estateExist) {
        await Estate.destroy({
          where: {
            estateId: estateId,
            userId: userId,
          },
        });

        const nameOfDong = estateExist.addressOfJibun.split(' ')[2];

        const dongExist = await PropertyOfDong.findOne({
          where: {
            userId: userId,
            nameOfDong: nameOfDong
          }
        });

        // 만약 해당 동에 매물이 1개인데 삭제를 한다면 0개가 되어버리기 때문에 
        // 지도자체에서 동도 없애버려야 합니다.
        if (dongExist.numOfDong == 1) {
          console.log('hihisdfsdf');
          await PropertyOfDong.destroy({
            where: {
              userId: userId,
              nameOfDong: nameOfDong,
            }
          })
        } else {
          // 그게 아니라면 숫자를 하나 줄여야 겠죠?

          await PropertyOfDong.update({
            numOfDong: dongExist.numOfDong - 1,
          },
            {
              where: {
                userId: userId,
                nameOfDong: nameOfDong,
              }
            })
        }
      } else {
        // 이건 매물번호랑 계정아이디랑 다를때 나타나는 에러입니다.

        throw new Error(501, '잘못된 접근입니다.');
      }

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
    } catch (err) {
      throw err;
    }
  };
}

module.exports = EstateRepository;
