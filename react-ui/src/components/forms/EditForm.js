import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Form, ControlLabel, FormGroup } from 'react-bootstrap';

import SubmitButtonSet from '../buttons/SubmitButtonSet';
import FormImage from './FormImage.js';
import { messages, notRequired } from '../../../../data/data';




const upper = (label) => {
  const required = notRequired.includes(label);
  if(!required) return `${label.charAt(0).toUpperCase()}${label.slice(1)}*`;
  else return `${label.charAt(0).toUpperCase()}${label.slice(1)}`;
};

const EditForm = (props) => {
  const check = (k) => {
    if(props.message === messages.inputError && !props.edit.dataObj[k] && !notRequired.includes(k)){
      return 'warning';
    }
    if(props.message === messages.emailError && k === "email"){
      return 'warning';
    }
    if(props.message === messages.phoneError && k === "phone"){
      return 'warning';
    }
    return null;
  }

  //======ALL OF THE FORM GROUPS===================================
  const formGroups = (props.edit.modalTitle === "Delete Content") ?
    <div className="text-center">Are you sure you want to delete this content?</div>:
    Object.keys(props.edit.dataObj).map(k => {

      const dataObj = props.edit.dataObj;
      let formItem = <div></div>;

      //if dataObj[k] is an array
      if(Array.isArray(dataObj[k])){ // another map for an Array
        if(k === "carousel") console.log(dataObj[k]);
        formItem = dataObj[k].map((key, i) => (
            <FormImage
              key={`${k}-${i}`}
              name={`${k}-${i}`}
              formChange={props.formChange}
              value={key}
              group={k}
            />));
      }
      else {
        formItem = <FormImage
            key={k}
            name={k}
            formChange={props.formChange}
            value={dataObj[k]}
            group={k}
          />;
      }

      // have the form item determined above
      // if dataObj[k] is an array but not an image, provide add button
      // if dataObj[k] is an image, provide dropzone
      return (
        <div key={k}>
          <FormGroup validationState={check(k)}>
            <ControlLabel>{upper(k)}</ControlLabel>
            {formItem}
          </FormGroup>

          <div className="text-center">
            {(k === "carousel" || k === "image" || k === "link") ?
              <Dropzone
                multiple={false}
                accept={(k === "link") ? "application/pdf" : "image/*"}
                onDrop={props.formAdd.bind(this)}>
                <p>{(k === "link") ? "Drop a pdf, click to select a file to upload, or provide your own url above." : "Drop an image or click to select a file to upload."}</p>
              </Dropzone>:
              <div></div>}
          </div>

          <hr />
        </div>
      );
    });


  //============================================================


  return (
    <Form className="content">
      {formGroups}
      <div className="text-center">
        <SubmitButtonSet
          editData={props.editData}
          updateState={props.updateState}

          message={props.message}
          user={props.user}
          edit={props.edit}
        />
      </div>
    </Form>
  );
}


export default EditForm;

EditForm.propTypes = {
  formChange: PropTypes.func.isRequired,
  formAdd: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,

  message: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  edit: PropTypes.object.isRequired,

};
