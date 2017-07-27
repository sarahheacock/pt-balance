import React from 'react';
import PropTypes from 'prop-types';
import { Button, NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { blogID, initialData, initialEdit, initialUser, initialMessage, messageData, loginData, errorStatus } from '../../data/data';


const EditButton = (props) => {
  const pageSection = (window.location.pathname === "/") ? "home" : window.location.pathname;

  //=====STYLE OF BUTTON DEPENDING ON BUTTON TITLE====================================================
  const style = (props.title === "Edit") ?
    "info":
    ((props.title === "Add" || props.title === "Login") ?
      "primary":
      ((props.title === "Delete") ?
        "danger":
        "default"));


  //=====DETERMINE NEXT AND MODAL-TITLE FROM PAGE-SECTION==========================================
  const adminAuth = props.title === "Add" || props.title === "Edit" || props.title === "delete";

  //NEED if launching modal
  const modalTitle = (adminAuth) ? `${props.title} Content` : props.title;
  let url = '';
  let dataObj = {};
  let message = '';


  //====admin page editting==============
  //props.dataObj will be the selected data point
  if(!(!props.user.token) && adminAuth){

    let result = {};
    Object.keys(props.dataObj).forEach((key) => {
      if(props.title === "Add") result[key] = '';
      else if(props.title === "Delete" || key === "_id") ;
      else result[key] = props.dataObj[key];
    });
    dataObj = Object.assign({}, result);


    //if trying to delete last room or local, send error
    if(modalTitle === "Delete Content" && props.length < 2) message.error = errorStatus.deleteError;

    if(props.title === "Delete") url = `/admin/edit/${blogID}/${pageSection}/${props.dataObj._id}?token=${props.user.token}`;
    else if(props.title === "Add") url = `/admin/edit/${blogID}/${pageSection}?token=${props.user.token}`;
    else if(props.title === "Edit") url = `/admin/edit/${blogID}/${pageSection}/${props.dataObj._id}?token=${props.user.token}`;

  }
  else if(props.title === "Login") {
    let result = {};
    Object.keys(loginData).forEach((k) => result[k] = '');
    dataObj = Object.assign({}, result);

    url = "/admin/login";
  }
  else if(props.title === "Send Message"){
    let result = {};
    Object.keys(messageData).forEach((k) => result[k] = '');
    dataObj = Object.assign({}, result);

    url = "/user/sayHello";
  }



  //====THE ACTUAL BUTTON=====================================================

  const content = (modalTitle === "Login" && !(!props.user.token)) ?
    {
      edit: initialEdit,
      message: initialMessage,
      user: initialUser
    } :
    {
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
  const button = (!props.user.token && adminAuth) ?
    <div></div> :
    ((modalTitle === "Send Message") ?
      <a href="#" onClick={(e) => props.updateState(content)}>
        <i className="fa fa-envelope" aria-hidden="true"></i>
      </a> :
      ((modalTitle === "Login") ?
        <NavItem onClick={(e) => props.updateState(content)} ><span className="">{(!(!props.user.token)) ? "Logout" : "Login"}</span></NavItem> :
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

  title: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
};
