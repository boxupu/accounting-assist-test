const readData = require("./data");

module.exports = function(type, offset, limit){
  //type 1: duePayment  2:bankTransfer

  var data = readData()[+type-1]
  return data.slice(+offset, +offset + +limit)
}
