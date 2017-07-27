import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import EditForm from '../forms/EditForm';

import request from 'superagent';
const CLOUDINARY_UPLOAD_PRESET = 'thosldom';
const CLOUDINARY_UPLOAD_URL = ' https://api.cloudinary.com/v1_1/dhd1eov8v/image/upload';

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

    if(Array.isArray(this.props.edit.dataObj[name])){
      dataObj[name][index] = value;
    }
    else {
      dataObj[name] = value;
    }

    this.props.updateState({
      edit: {
        ...this.props.edit,
        dataObj: dataObj
      }
    });
  }

  onFormAdd = (files) => {
    // let dataObj = {...this.props.edit.dataObj};
    // const name = e.target.name;
    const file = files[0].preview;
    // console.log("file", {...file})
    this.props.postData(`/admin/edit/file?token=${this.props.user.token}`, {
      'file': file,
      'edit': {...this.props.edit}
    });

    // this.props.postData(CLOUDINARY_UPLOAD_URL, {
    //   'upload_preset': CLOUDINARY_UPLOAD_PRESET,
    //   'file': file
    // });

    // ,
    // 'edit': {...this.props.edit}


    // if(name === "carousel"){
      // let upload = request.post(CLOUDINARY_UPLOAD_URL)
      //                   .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      //                   .field('file', file);
      //
      // upload.end((err, response) => {
      //   if (err) {
      //     console.error(err);
      //   }
      //
      //   if (response.body.secure_url !== '') {
      //     dataObj.carousel.push(response.body.secure_url);
      //     this.props.updateState({
      //       edit: {
      //         ...this.props.edit,
      //         dataObj: dataObj
      //       }
      //     });
      //   }
      // });
    // }
  }

  onFormDelete = (e) => {
    let dataObj = {...this.props.edit.dataObj};
    const nameArr = e.target.name.split("-");
    const name = nameArr[0];
    const i = nameArr[1];

    dataObj[name].splice(i, 1);

    this.props.updateState({
      edit: {
        ...this.props.edit,
        dataObj: dataObj
      }
    });
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
              formDelete={this.onFormDelete}
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
