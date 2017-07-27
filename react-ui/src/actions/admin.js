import * as AdminActionTypes from '../actiontypes/admin';
import axios from 'axios';

// import {blogID, key} from '../config';
import {errorStatus, initialUser, initialMessage, initialEdit, initialData} from '../data/data';


export const updateState = (newState) => {
  return {
    type: AdminActionTypes.UPDATE_STATE,
    newState
  }
}


export const getData = (url) => {
  return (dispatch) => {

    return axios.get(url)
      .then(response => {
        console.log("response", response.data);

        let res = {};
        Object.keys(initialData).forEach((k) => (
          res[k] = response.data[k]
        ));
        dispatch(updateState({ data: res }));

      })
      .catch(error => {
        console.log("error", error);
        dispatch(updateState({ message: errorStatus.loadError }));
      });
  }
};

export const putData = (url, newData) => {

  return (dispatch) => {
    //make sure areas are filled
    const valid = Object.keys(newData).reduce((a, b) => {
      return a && ((newData[b] !== '' && newData[b] !== undefined));
    }, true);
    if(!valid) return dispatch(updateState({ message: errorStatus.formError }));

    console.log(JSON.stringify(newData, undefined, 2))

    return axios.put(url, newData)
      .then(response => {
        console.log("response data", response.data);
        if(response.data.success === false){
          dispatch(updateState({ message: errorStatus.expError }));
        }
        else {
          let res = {};
          Object.keys(initialData).forEach((k) => (
            res[k] = response.data[k]
          ));

          dispatch(updateState({
            edit: initialEdit,
            message: initialMessage,
            data: res
          }));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(updateState({ message: errorStatus.loadError }));
      });

  }
};



export const postData = (url, newData) => {
  return (dispatch) => {

    const valid = Object.keys(newData).reduce((a, b) => {
      return a && ((newData[b] !== '' && newData[b] !== undefined));
    }, true);
    if(!valid) return dispatch(updateState({ message: errorStatus.formError }));

    console.log("newData", newData);
    return axios.post(url, newData)
      .then(response => {
        if(response.data.success === false){
          dispatch(updateState({ message: errorStatus.expError }));
        }
        else {
          // if(url.includes('cloudinary') && response.data.secure_url !== '') { //if uploading file from form
          //   // let dataObj = {...newData.edit.dataObj};
          //   // if (r) {
          //     // dataObj.carousel.push(response.body.secure_url);
          //     this.props.updateState({
          //       message: 'yay!'
          //     });
          //   // }
          // }
          if(url.includes('file')) { //if uploading file from form
            let dataObj = {...newData.edit.dataObj};
            dataObj.push(response.data.secure_url);
            
            dispatch(updateState({
              edit: {
                ...newData.edit,
                dataObj: dataObj
              }
            }));
          }
          else if (url.includes('say')) { //if posting message
            dispatch(updateState({ message: errorStatus.messageSuccess }));
          }
          else if (url.includes('login')) { //if posting login
            dispatch(updateState({
              edit: initialEdit,
              message: initialMessage,
              user: {...response.data, username: newData.username, password: ''}
            }));
          }
          else if (url.includes('edit')) { //if posting new page
            dispatch(updateState({
              edit: initialEdit,
              message: initialMessage,
              data: response.data
            }));
          }
        }
      })
      .catch(error => {
        console.log(error);
        if (url.includes('say')) { //if posting message
          dispatch(updateState({ message: errorStatus.messageError }));
        }
        else if (url.includes('login')) { //if posting login
          dispatch(updateState({ message: errorStatus.loginError }));
        }
        else if (url.includes('edit')) { //if posting new page
          dispatch(updateState({ message: errorStatus.loadError }));
        }
        else if (url.includes('file')) { //if posting new page
          dispatch(updateState({ message: errorStatus.loadError }));
        }
      });
  }
};

export const deleteData = (url) => {
  return (dispatch) => {

    return axios.delete(url)
    .then(response => {
      console.log("response data", response.data);
      if(response.data.success === false){
        dispatch(updateState({ message: errorStatus.expError }));
      }
      else {
        let res = {};
        Object.keys(initialData).forEach((k) => (
          res[k] = response.data[k]
        ));

        dispatch(updateState({
          edit: initialEdit,
          message: initialMessage,
          data: res
        }));
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(updateState({ message: errorStatus.loadError }));
    });
  }
};
