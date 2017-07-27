import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { initialMessage, initialEdit, initialUser, errorStatus } from '../../data/data';

import AlertMessage from './AlertMessage';
import EditButton from './EditButton';


//SUBMIT ADMIN EDITTING, USER PROFILE EDIT, CREATE USER, RESERVE, AND CANCEL RESERVATION
class SubmitButtonSet extends React.Component {
  static propTypes = {
    editData: PropTypes.func.isRequired,
    updateState: PropTypes.func.isRequired,

    message: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    edit: PropTypes.object.isRequired,
  }


  pop = (e) => {
    this.props.updateState({
      edit: initialEdit,
      message: initialMessage
    });
  }

  logout = (e) => {
    this.props.updateState({
      edit: initialEdit,
      message: initialMessage,
      user: initialUser,
    });
  }


  submit = (e) => {

    if(this.props.message.error === ""){ //if there is no error with the forms
      if(this.props.title === "Delete Content") this.props.editData(this.props.url);
      else this.props.editData(this.props.url, this.props.formItems);
    }
    else {
      e.preventDefault();//prevent navLink
    }
  }


  render(){

    return (
      <div className="text-center">
        <AlertMessage
          message={this.props.message}
        />
        {
          (this.props.message.error === errorStatus.expError) ?
            <div>
              <Button className="edit" bsStyle="primary" onClick={this.submit}>
                {this.props.title}
              </Button>
              <Button className="edit" onClick={this.pop}>
                Cancel
              </Button>
            </div> :
            <div>
              <EditButton
                user={this.props.user}
                updateState={this.props.updateState}
                dataObj={{}}
                title="Login"
                pageSection={""}
                length={2}
              />
              <Button className="edit" onClick={this.logout}>
                Cancel
              </Button>
            </div>
        }
      </div>
    );
  }
}


export default SubmitButtonSet;
