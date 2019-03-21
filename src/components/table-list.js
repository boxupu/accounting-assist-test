import React, { Component } from 'react'
import { List, Modal, Button, Upload, Icon} from 'antd'
import { getListData,getDetailData } from '../api/api'



import ModalView from './modal'
console.log(getListData)
class TableList extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[],
      offset: 0,
      limit: 20,
      type: 1,
      isLoaded:false,
      showLoadMore: false,

      modalContentStart: 0,
      modalContentEnd: 0,
      modalContentComb: [],
      modalShow: false
    }
  }

  getData(type, offset){
    let _type = type || this.state.type
    let _offset = offset * this.state.limit
    let _limit = this.state.limit + 1
    this.setState({
      isLoaded: true
    })

    getListData(_type, _offset, _limit)
    .then((res) => {
      if(res.data.length <= this.state.limit) {
        this.setState({
          showLoadMore:false,
        })
      }else{
        this.setState({
          showLoadMore:true,
        })
      }
      let newData = res.data.slice(0,20)
      let newList = []
      if(type !== undefined && this.state.type !== type){
         newList = newData
      }else{
         newList = this.state.list.concat(newData)
      }
      this.setState({
        type: _type,
        offset: offset,
        list:newList,
        isLoaded:false
      });
    })
    .catch( (error) => {
      this.setState({
        isLoaded:false,
        error:error
      })
    })
  }

  onLoadMore () {
    var offset = this.state.offset + 1
    this.getData(this.state.type, offset)
  }

  onModalToggle(item){
    if(this.state.type === 1) return
    this.setState({
      modalShow: !this.state.modalShow,
      modalSum: item
    })
    if(item > 0){
      getDetailData(item)
      .then((res)=>{
        this.setState({
          modalContentStart: res.data.startTime,
          modalContentEnd: res.data.endTime,
          modalContentComb: res.data.comb
        })
      })
    }else if(this.state.modalShow){
      this.setState({
        modalContentStart: 0,
        modalContentEnd: 0,
        modalContentComb: []
      })
    }
  }

  componentDidMount(){
    this.getData(this.state.type, this.state.offset)
  }


  render() {
    return (
      <div>
        <div className="tab-title">
          <Button onClick={this.getData.bind(this,1, 0)} type={this.state.type === 1 ? 'primary':''}>Due Payments</Button>
          <Button onClick={this.getData.bind(this,2, 0)} type={this.state.type === 2 ? 'primary':''}>Bank Transfer</Button>
          <Upload>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </div>
        <List
          size="large"
          bordered
          dataSource={this.state.list}
          renderItem={item => (<List.Item onClick={this.onModalToggle.bind(this,item)}>{item}</List.Item>)}
        />
        {this.state.showLoadMore && <Button className="load-more" onClick={this.onLoadMore.bind(this)}>loading more</Button>}

        <ModalView
          modalContentStart={this.state.modalContentStart}
          modalContentEnd={this.state.modalContentEnd}
          modalContentComb={this.state.modalContentComb}
          modalShow={this.state.modalShow}
          onModalToggle={this.onModalToggle.bind(this)}
        >
        </ModalView>
      </div>
    )
  }
}
export default TableList;
