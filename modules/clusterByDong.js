module.exports = clusterByDong = async (address) => {
  console.log('hh', address);
  const dong = address.split(' ')[2];
  console.log('dong', dong);
  return dong;
}