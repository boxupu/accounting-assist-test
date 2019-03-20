const readData = require("./data");

module.exports = function(type, offset, limit){
  //type 0: duePayment  1:bankTransfer

  var data = readData()[type]
  return data.slice(Number(offset), Number(offset) + Number(limit))
}
