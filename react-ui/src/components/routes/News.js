import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Col, Row, Button } from 'react-bootstrap';
import moment from 'moment';

import EditButton from '../buttons/EditButton';

const News = (props) => {
  const events = props.data.map((event, index) => (
      <div className="content" key={`news${index}`}>
        <div className="content">
          <Row className="clearfix">
            <h3>{event.title}</h3>
            <Row className="clearfix">
              <Col sm={9}>
                <p>{event.description}</p>
                <p><b>{moment(event.createdAt).format('LL')}</b></p>
              </Col>
              <Col sm={3}>
                <img src={event.image}/>
              </Col>
            </Row>

          </Row>
          <hr />
        </div>
      </div>
    ));

  return (
    <div className="main-content">
      <PageHeader className="head">News and Events</PageHeader>
      {events}

    </div>
  );
}

export default News;

News.propsTypes = {
  data: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,

  updateState: PropTypes.func.isRequired
}
