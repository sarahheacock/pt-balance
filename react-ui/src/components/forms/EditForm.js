import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormControl, ControlLabel, FormGroup, Checkbox } from 'react-bootstrap';


import SubmitButtonSet from '../buttons/SubmitButtonSet';
import { errorStatus, messageData } from '../../data/data';


const EditForm = (props) => {

  //======ALL OF THE FORM GROUPS===================================
  const formGroups = (props.edit.modalTitle === "Delete Content") ?

    <div className="text-center">Are you sure you want to delete this content?</div>:

    Object.keys(messageData).map(k => {
      if(k !== "_id"){
        return(
          <FormGroup
            key={k}
            validationState={(props.message.error === errorStatus.formError && (props.message[k] === '' || props.message[k] === undefined)) ? 'warning': null}
          >
            <ControlLabel>{`${k.charAt(0).toUpperCase()}${k.slice(1)}*`}</ControlLabel>
            <FormControl
              name={k}
              type={messageData[k]["type"]}
              placeholder={messageData[k]["placeholder"]}
              componentClass={messageData[k]["componentClass"]}
              value={props.message[k]}
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
  editData: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,

  message: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  edit: PropTypes.object.isRequired,

};
