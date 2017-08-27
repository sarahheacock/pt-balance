import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import EditForm from '../forms/EditForm';

class EditModal extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    edit: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,

    postData: PropTypes.func.isRequired,
    deleteData: PropTypes.func.isRequired,

    updateState: PropTypes.func.isRequired,
  }


  onFormChange = (e) => {

    let dataObj = {...this.props.edit.dataObj};
    const nameArr = e.target.name.split("-");
    const name = nameArr[0];
    const index = nameArr[1]
    const value = e.target.value;

    if(value === "delete"){
      dataObj[name].splice(index, 1);
    }
    else {
      if(Array.isArray(this.props.edit.dataObj[name])){
        dataObj[name][index] = value;
      }
      else {
        dataObj[name] = value;
      }
    }


    this.props.updateState({
      edit: {
        ...this.props.edit,
        dataObj: dataObj
      },
      message: ''
    });
  }


  onFormAdd = (files, rejected) => {
    const name = (window.location.pathname === "/") ?
      "carousel":
      (window.location.pathname === "/publications")?
        "link":
        "image";

    if(rejected[0]){
      this.props.updateState({"message": (name === "link") ? "File must be pdf." : "Image must be png, jpg, or jpeg."})
    }
    else {
      let newEdit = {...this.props.edit};
      const file = new File([files[0]], files[0].name, {
        type: (name === "link") ? "application/pdf" : "image/jpeg",
      });

      let formData = new FormData();
      formData.append('file', file);
      console.log('file', formData.get('file'));

      this.props.uploadFile({
        url: `/file?token=${this.props.user.token}`,
        edit: newEdit,
        name: name
      }, formData);
    }

  }


  render(){

    const title = this.props.edit.modalTitle;
    let editFunc = this.props.postData;
    if(title.includes("Edit")){
      editFunc = this.props.putData;
    }
    else if(title.includes("Delete")){
      editFunc = this.props.deleteData;
    }


    return (
      <div>
        <Modal show={Object.keys(this.props.edit.dataObj).length > 0}>
          <Modal.Header>
            <Modal.Title>{this.props.edit.modalTitle}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <EditForm
              formChange={this.onFormChange}
              formAdd={this.onFormAdd}
              editData={editFunc}
              updateState={this.props.updateState}

              message={this.props.message}
              user={this.props.user}
              edit={this.props.edit}
            />
          </Modal.Body>

          <Modal.Footer>
            *Fill out required fields
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditModal;
