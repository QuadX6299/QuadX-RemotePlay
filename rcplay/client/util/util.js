exports.sleep = async function (millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

exports.getRand = async function (max, min) {
  return Math.floor(Math.random() * (max-min+1)) + min;
}
