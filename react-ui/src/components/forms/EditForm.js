import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import { Button, Form, FormControl, ControlLabel, FormGroup, Checkbox } from 'react-bootstrap';


import SubmitButtonSet from '../buttons/SubmitButtonSet';
import { errorStatus, messageData, loginData, formData } from '../../data/data';


const upper = (label) => {
  return `${label.charAt(0).toUpperCase()}${label.slice(1)}*`;
};

const EditForm = (props) => {
  const formInfo = {...messageData, ...loginData, ...formData};

  //======ALL OF THE FORM GROUPS===================================
  const formGroups = (props.edit.modalTitle === "Delete Content") ?
    <div className="text-center">Are you sure you want to delete this content?</div>:
    Object.keys(props.edit.dataObj).map(k => {

      const dataObj = props.edit.dataObj;

      if(Array.isArray(dataObj[k])){
        const formItem = (k === "carousel") ?
          dataObj[k].map((key, i) => (
            <div key={`${k}-${i}`} name={`${k}-${i}`}>
              {key}
              <Button bsStyle="link" name={`${k}-${i}`} onClick={props.formDelete}>
                -
              </Button>
            </div>
          )):
          dataObj[k].map((key, i) => (
              <FormControl
                key={`${k}-${i}`}
                name={`${k}-${i}`}
                type={formInfo[k]["type"]}
                placeholder={formInfo[k]["placeholder"]}
                componentClass={formInfo[k]["componentClass"]}
                value={key}
                onChange={props.formChange}
              />
          ));

        return (
          <div>
            <FormGroup key={k} validationState={(props.message === errorStatus.formError && dataObj[k] < 1) ? 'warning': null}>
              <ControlLabel>{upper(k)}</ControlLabel>
              {formItem}
            </FormGroup>

            <Dropzone
              multiple={false}
              accept="image/*"
              onDrop={props.formAdd.bind(this)}>
              name={k}
              <p>Drop an image or click to select a file to upload.</p>
            </Dropzone>
          </div>
        );
      }
      else if(k !== "_id"){
        return(
          <FormGroup
            key={k}
            validationState={(props.message === errorStatus.formError && (dataObj[k] === '' || dataObj[k] === undefined)) ? 'warning': null}
          >
            <ControlLabel>{upper(k)}</ControlLabel>
            <FormControl
              name={k}
              type={formInfo[k]["type"]}
              placeholder={formInfo[k]["placeholder"]}
              componentClass={formInfo[k]["componentClass"]}
              value={dataObj[k]}
              onChange={props.formChange}
            />
          </FormGroup>
        );
      }
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
  formDelete: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,

  message: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  edit: PropTypes.object.isRequired,

};
