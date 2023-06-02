// const axios = require("axios");

// const init = async (address) => {
//   const dong = address.split(" ").join(" ");
//   const response = await axios.get(
//     "https://dapi.kakao.com/v2/local/search/address.json",
//     {
//       headers: {
//         Authorization: "KakaoAK 5ef5bfb475821f7a1a4a6db2f85472c1",
//       },
//       data: new URLSearchParams({
//         query: dong,
//       }),
//     }
//   );
//     console.log(response.data.documents[0].x, response.data.documents[0].y)
//   return {
//     lat: response.data.documents[0].x,
//     lng: response.data.documents[0].y,
//   };
// };

// init("경기 안성시 공도읍");
let str = "fce23adf-c97c-4f03-8bef-f62b03ba7d7d";
console.log(str.length)