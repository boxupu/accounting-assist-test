import axios from 'axios'

const apiBase = 'http://localhost:8888'

async function getListData(type, offset, limit){
  return await axios.get(apiBase + '/list?type=' + type + '&offset=' + offset * limit + '&limit=' +  limit )
}

async function getDetailData(sum){
  return await axios.get(apiBase + '/detail?sum=' + sum)
}

export {
  getListData,
  getDetailData
}
