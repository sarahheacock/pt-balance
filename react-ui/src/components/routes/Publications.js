import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Button } from 'react-bootstrap';
import moment from 'moment';

import EditButton from '../buttons/EditButton';

const Publications = (props) => {
  const pubs = props.data.map((article, index) => (
    <div key={`article${index}`}>

        <div className="content">
          <div className="well well-option">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <p><b>{(Array.isArray(article.authors)) ? article.authors.join(', ') : article.authors}</b></p>
            <p><b>{moment(article.date).format('LL')}</b></p>
            <div className="text-center">
              <a className="text-center" href="#" onClick={(e) => { if(e) e.preventDefault(); window.open(article.link); }}>
                <img className="researchGate text-center" alt="Research Gate Link" src="https://camo.githubusercontent.com/20302dbecb13e03c63ecae7d07c694696c66da19/68747470733a2f2f6c68342e676f6f676c6575736572636f6e74656e742e636f6d2f2d32387046764c35337576552f41414141414141414141492f41414141414141414163452f65446a3275473750574b732f73302d632d6b2d6e6f2d6e732f70686f746f2e6a7067" />
              </a>
            </div>
            <div className="text-center">
              <EditButton
                user={props.user}
                dataObj={article}
                updateState={props.updateState}
                title={"Edit"}
                length={2}
              />
              <EditButton
                user={props.user}
                dataObj={article}
                updateState={props.updateState}
                title={"Delete"}
                length={props.data.length}
              />
            </div>
          </div>
        </div>

    </div>
  ));

  return (
    <div className="main-content">
      <PageHeader className="head">Publications and Presentations</PageHeader>
      {pubs}
      <div className="text-center">
        <EditButton
          user={props.user}
          dataObj={props.data[0]}
          updateState={props.updateState}
          title={"Add"}
          length={2}
        />
      </div>
    </div>
  );
}

export default Publications;

Publications.propsTypes = {
  data: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,

  updateState: PropTypes.func.isRequired
}
