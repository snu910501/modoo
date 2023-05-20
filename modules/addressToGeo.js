const axios = require("axios");

module.exports = addressToGeo = async (address) => {
  const response = await axios.get(
    "https://dapi.kakao.com/v2/local/search/address.json",
    {
      headers: {
        Authorization: "KakaoAK 5ef5bfb475821f7a1a4a6db2f85472c1",
      },
      data: new URLSearchParams({
        query: address,
      }),
    }
  );
  console.log('zz',response.data.documents);
  return {
    lat: response.data.documents[0].x,
    lng: response.data.documents[0].y,
  };
};
