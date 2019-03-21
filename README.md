## 运行环境
  nodejs

## 启动步骤
  1. 安装依赖 npm install
  1. 启动服务端 node ./server/index.js
  1. 启动用户端 npm start


## 思路
  服务器端提供两个api: list / detail

  读取一个csv文件，并处理其数据为数组

  list 支持分页展示 / load more

  Bank Transfer list 可以点击查看付款清单金额及运行时间，目前只做了前两个，其他的合值没有做相关的数组支持


## 未解决的问题

  1. 求和算法目前只能支持少量数据进行运算，在大量数据下会崩溃
  2. 上传功能服务器端代码由于时间有限未实现
  3. 服务器端偶尔会崩溃，需要重新启动node服务

##
