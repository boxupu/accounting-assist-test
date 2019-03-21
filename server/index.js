var http = require('http');

const list = require("./list");
const getQueryString = require('./get-query-string')
const detail = require('./detail')
// readData().then((data)=>{
//   console.log(data)
// })

http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    });
    var path = request.url;
    console.log(path);
    var pathName = path.match(/^\/([a-zA-Z]+)(\?|$)/)
    var pathParam = path.split('?')[1]
    if(!pathName) response.write("not found")
    else{
      if(pathName[1] === 'list'){
        var type = getQueryString(pathParam, 'type')
        var offset = getQueryString(pathParam, 'offset') || 0
        var limit = getQueryString(pathParam, 'limit') || 20
        if(!type) response.write("missing param")
        else {
          var res = list(type, offset, limit)
          response.write(JSON.stringify(res))
        }
      }else if(pathName[1] === 'detail'){
        var sum = getQueryString(pathParam, 'sum')
        var res = detail(sum)
        console.log(res)
        response.write(JSON.stringify(res))
      }
    }
    response.end();
}).listen(8888, function() {
  console.log('listening on localhost:8888 server started');
});
