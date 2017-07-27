import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Button } from 'react-bootstrap';
import moment from 'moment';

import EditButton from '../buttons/EditButton';

const Publications = (props) => {
  const pubs = props.data.map((article, index) => (
    <div key={`article${index}`}>
      <a href="#" onClick={(e) => { if(e) {e.preventDefault(); window.open(article.link);} }}>
        <div className="content">
          <div className="well well-option">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <p><b>{(Array.isArray(article.authors)) ? article.authors.join(', ') : article.authors}</b></p>
            <p><b>{moment(article.date).format('LL')}</b></p>

          </div>
        </div>
      </a>
    </div>
  ));

  return (
    <div className="main-content">
      <PageHeader>Publications and Presentations</PageHeader>
      {pubs}
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
