import * as AdminActionTypes from '../actiontypes/admin';
import axios from 'axios';

// import {blogID, key} from '../config';
// import {errorStatus, initialMessage, initialEdit, defaultData} from '../data/data';
//
//
// const shrink = (res) => {
//   let result = {};
//   Object.keys(defaultData).forEach((k) => result[k] = res[k]);
//   return result;
// }

export const updateState = (newState) => {
  return {
    type: AdminActionTypes.UPDATE_STATE,
    newState
  }
}

export const uploadFile = (newData, file) => {

  console.log("file", file);

  return (dispatch) => {
    axios.post(newData.url, file)
      .then(response => {
        // if(response.data.success === false) dispatch(updateState({ message: errorStatus.expError }));

        console.log(response.data);
        if(newData.name === "link"){
          newData.edit.dataObj[newData.name] = response.data.secure_url;
        }
        else{
          if(Array.isArray(newData.edit.dataObj[newData.name])) newData.edit.dataObj[newData.name].push(response.data.public_id);
          else newData.edit.dataObj[newData.name] = response.data.public_id;
        }


        dispatch(updateState({ edit: newData.edit, message: '' }));
      })
      .catch(error => {
        console.log("err", error);
        dispatch(updateState({ message: "Unable to upload image" }))
      });
  };
}


export const getData = (url) => {
  return (dispatch) => {

    return axios.get(url)
      .then(response => {
        console.log("response", response.data);
        dispatch(updateState(response.data));

      })
      .catch(error => {
        console.log("error", error);
        dispatch(updateState({ message: error.message }));
      });
  }
};

export const putData = (url, newData) => {

  return (dispatch) => {

    return axios.put(url, newData)
    .then(response => {
      console.log("response", response.data);
      dispatch(updateState(response.data));

    })
    .catch(error => {
      console.log("error", error);
      dispatch(updateState({ message: error.message }));
    });
  }
};


export const postData = (url, newData) => {
  return (dispatch) => {

    return axios.post(url, newData)
      .then(response => {
        console.log("response", response.data);
        dispatch(updateState(response.data));

      })
      .catch(error => {
        console.log("error", error);
        dispatch(updateState({ message: error.message }));
      });
  }
};


export const deleteData = (url) => {
  return (dispatch) => {

    return axios.delete(url)
    .then(response => {
      console.log("response", response.data);
      dispatch(updateState(response.data));

    })
    .catch(error => {
      console.log("error", error);
      dispatch(updateState({ message: error.message }));
    });
  }
};

// export const getData = (url) => {
//   return (dispatch) => {
//
//     return axios.get(url)
//       .then(response => {
//         console.log("response", response.data);
//         dispatch(updateState({ data: shrink(response.data), message: initialMessage }));
//
//       })
//       .catch(error => {
//         console.log("error", error);
//         dispatch(updateState({ message: errorStatus.loadError }));
//       });
//   }
// };
//
// export const putData = (url, newData) => {
//
//   return (dispatch) => {
//     //make sure areas are filled
//     const valid = validateForm(newData);
//     if(!valid) return dispatch(updateState({ message: errorStatus.formError }));
//
//     console.log(JSON.stringify(newData, undefined, 2))
//
//     return axios.put(url, newData)
//       .then(response => {
//         console.log("response data", response.data);
//         if(response.data.success === false){
//           dispatch(updateState({ message: errorStatus.expError }));
//         }
//         else {
//           dispatch(updateState({
//             edit: initialEdit,
//             message: initialMessage,
//             data: shrink(response.data)
//           }));
//         }
//       })
//       .catch(error => {
//         console.log(error);
//         dispatch(updateState({ message: errorStatus.loadError }));
//       });
//
//   }
// };
//
//
//
// export const postData = (url, newData) => {
//   return (dispatch) => {
//
//     const valid = validateForm(newData);
//     if(!valid) return dispatch(updateState({ message: errorStatus.formError }));
//
//     console.log("newData", newData);
//     return axios.post(url, newData)
//       .then(response => {
//         if(response.data.success === false){
//           dispatch(updateState({ message: errorStatus.expError }));
//         }
//         else {
//           if(url.includes('file')) { //if uploading file from form
//             let dataObj = {...newData.edit.dataObj};
//             dataObj.push(response.data.secure_url);
//
//             dispatch(updateState({
//               edit: {
//                 ...newData.edit,
//                 dataObj: dataObj
//               },
//               message: initialMessage
//             }));
//           }
//           else if (url.includes('say')) { //if posting message
//             dispatch(updateState({ message: errorStatus.messageSuccess }));
//           }
//           else if (url.includes('login')) { //if posting login
//             dispatch(updateState({
//               edit: initialEdit,
//               message: initialMessage,
//               user: {...response.data, username: newData.username, password: ''},
//             }));
//           }
//           else if (url.includes('edit')) { //if posting new page
//             dispatch(updateState({
//               edit: initialEdit,
//               message: initialMessage,
//               data: shrink(response.data)
//             }));
//           }
//         }
//       })
//       .catch(error => {
//         console.log(error);
//         if (url.includes('say')) { //if posting message
//           dispatch(updateState({ message: errorStatus.messageError }));
//         }
//         else if (url.includes('login')) { //if posting login
//           dispatch(updateState({ message: errorStatus.loginError }));
//         }
//         else if (url.includes('edit')) { //if posting new page
//           dispatch(updateState({ message: errorStatus.loadError }));
//         }
//         else if (url.includes('file')) { //if posting new page
//           dispatch(updateState({ message: errorStatus.loadError }));
//         }
//       });
//   }
// };
//
// export const deleteData = (url) => {
//   return (dispatch) => {
//
//     return axios.delete(url)
//     .then(response => {
//       console.log("response data", response.data);
//       if(response.data.success === false){
//         dispatch(updateState({ message: errorStatus.expError }));
//       }
//       else {
//         dispatch(updateState({
//           edit: initialEdit,
//           message: initialMessage,
//           data: shrink(response.data)
//         }));
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       dispatch(updateState({ message: errorStatus.loadError }));
//     });
//   }
// };
