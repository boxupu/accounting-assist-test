import React, { Component } from 'react'
import { Modal } from 'antd';

class ModalView extends Component {
  constructor(props){
    super(props);
  }

  handleOk = (e) => {
    this.props.onModalToggle()
  }

  handleCancel = (e) => {
    this.props.onModalToggle()
  }

  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.props.modalShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>{this.props.modalContentStart}</div>
          <div>{this.props.modalContentComb.join(',')}</div>
          <div>{this.props.modalContentEnd}</div>
        </Modal>
      </div>
    );
  }
}

export default ModalView;
