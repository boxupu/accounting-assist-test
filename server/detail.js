const readData = require("./data")
var duePayments = readData()[0]
duePayments = duePayments.slice(0,30)
var array = duePayments.map((item) => {
    return Math.round(item * 100)
})
module.exports = function(result) {
  var _result = Math.round(result * 100)
  var p = {
    startTime: new Date().getTime(),
    comb: [],
    endTime: 0
  };

  for (var i = 1; i < 1 << array.length; i++) {
      var sum = 0;
      var temp = "";
      for (var j = 0; j < array.length; j++) {
          if ((i & 1 << j) != 0) {
              sum += array[j];
              temp += array[j] + "+"
          }

      }
      if (sum == _result) {
          var t = temp.split('+');

          for (var j = 0; j < t.length; j++) {
              if (t[j] != '') {
                  p.comb.push(t[j])
              }
          }
          p.endTime = new Date().getTime()
          return p
      }
  }
}
