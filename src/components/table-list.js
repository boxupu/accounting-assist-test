import React, { Component } from 'react'
import { List, Button, Typography } from 'antd'
import axios from 'axios'

class TableList extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[],
      offset: 0,
      limit: 20,
      type: 0,
      isLoaded:false
    }
  }

  getData(){
    let _this = this
    this.setState({
      isLoaded: true
    })
    axios.get('http://127.0.0.1:8888/list?type=0&offset=' + this.state.offset * this.state.limit + '&limit=' +  this.state.limit)
    .then(function (response) {
      _this.setState({
        list:_this.state.list.concat(response.data),
        isLoaded:false
      });
    })
    .catch(function (error) {
      console.log(error);
      _this.setState({
        isLoaded:false,
        error:error
      })
    })
  }

  onLoadMore () {
    console.log(this)
    var offset = this.state.offset + 1
    this.setState({
      offset: offset
    })
    this.getData()
  }

  componentDidMount(){
    this.getData()
  }


  render() {
    console.log(this.props, 'props');
    return (
      <div>
        <h3 style={{ marginBottom: 16 }}>Default Size</h3>
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={this.state.list}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
        <Button onClick={this.onLoadMore.bind(this)}>loading more</Button>
      </div>
    )
  }
}
export default TableList;
