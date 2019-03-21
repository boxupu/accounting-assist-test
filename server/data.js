var fs = require("fs");

function ConvertToTable(data) {
    data = data.toString();
    data = data.split("\r\n");
    var dataArr = [[],[]];
    for (let i = 0; i < data.length; i++) {
      let itemArr = data[i].split(',')
      if(itemArr[0]) dataArr[0].push(itemArr[0])
      if(itemArr[1]) dataArr[1].push(itemArr[1])
    }
    return dataArr.slice(0,100)
}



module.exports = function(){
  //return new Promise((reslove, reject)=>{
    var data = fs.readFileSync('./data/input.csv', 'utf-8')
    return ConvertToTable(data)
  //})
}
