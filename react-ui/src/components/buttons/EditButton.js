import React from 'react';
import PropTypes from 'prop-types';
import { Button, NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { blogID, initialData, initialEdit, messageData, loginData, errorStatus } from '../../data/data';


const EditButton = (props) => {

  //=====STYLE OF BUTTON DEPENDING ON BUTTON TITLE====================================================
  const style = (props.title === "Edit") ?
    "info":
    ((props.title === "Add" || props.title === "Login") ?
      "primary":
      ((props.title === "Delete") ?
        "danger":
        "default"));

  //deterimine if this is info from database
  const sect = Object.keys(initialData).reduce((a, b) => { return a || b === props.pageSection; }, false);

  //=====DETERMINE NEXT AND MODAL-TITLE FROM PAGE-SECTION==========================================

  //NEED if launching modal
  let modalTitle = '';
  let url = '';
  let dataObj = {};
  let message = '';


  //====admin page editting==============
  //props.dataObj will be the selected data point
  if(!(!props.user.token) && sect){
    modalTitle = `${props.title} Content`;
  }
  else {
    modalTitle = props.title;
  }


  //======GET DATAOBJ AND URL FROM modalTitle==========================
  if(modalTitle.includes("Content")){
    let result = {};
    Object.keys(props.dataObj).forEach((key) => {
      if(props.title === "Add") result[key] = '';
      else if(props.title === "Delete" || key === "_id") ;
      else result[key] = props.dataObj[key];
    });
    dataObj = Object.assign({}, result);
    //if trying to delete last room or local, send error
    if(modalTitle === "Delete Content" && props.length < 2) message.error = errorStatus.deleteError;


    if(props.title === "Delete" && props.user.token) url = `/admin/edit/${blogID}/${props.pageSection}/${props.dataObj._id}?token=${props.user.token}`;
    else if(props.title === "Add" && props.user.token) url = `/admin/edit/${blogID}/${props.pageSection}?token=${props.user.token}`;
    else if(props.title === "Edit" && props.user.token) url = `/admin/edit/${blogID}/${props.pageSection}/${props.dataObj._id}?token=${props.user.token}`;
  }
  //props.dataObj is {}==========================
  else if(modalTitle === "Login"){
    let result = {};
    Object.keys(loginData).forEach((k) => result[k] = '');
    dataObj = Object.assign({}, result);

    url = "/admin/login"; //have to change this in EditModal if admin login
  }
  else if(modalTitle === "Send Message"){
    let result = {};
    Object.keys(messageData).forEach((k) => result[k] = '');
    dataObj = Object.assign({}, result);

    url = "/user/sayHello";
  }


  //====THE ACTUAL BUTTON=====================================================

  const content = {
    message: message,
    edit: {
      ...initialEdit,
      modalTitle,
      url,
      dataObj
    }
  };


  //page editing buttons are hidden
  //if we are not updating edit, then navLink to next page
  //...otherwise wait
  const button = (props.user.admin === false && (props.title === "Edit" || props.title === "Add" || props.title === "Delete")) ?
    <div></div> :
    ((modalTitle === "Send Message") ?
      <a href="#" onClick={(e) => props.updateState(content)}>
        <i className="fa fa-email" aria-hidden="true"></i>
      </a> :
      ((modalTitle === "Login" && props.pageSection === "header") ?
        <NavItem onClick={(e) => props.updateState(content)} >{(!props.user.token) ? "Login" : "Logout"}</NavItem> :
        <Button bsStyle={style} onClick={(e) => props.updateState(content)}>
          {props.title}
        </Button>)
      )

  return ( button );
}


export default EditButton;

EditButton.propTypes = {
  user: PropTypes.object.isRequired,
  dataObj: PropTypes.object.isRequired,

  updateState: PropTypes.func.isRequired,

  pageSection: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
};
