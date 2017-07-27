import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';


const Nancy = (props) => {

  return (
    <div className="main-content">
      <Row className="clearfix content">
        <Col sm={8}>
          <div className="about">
            <h3>{props.data.name}</h3>
            <p><b>{props.data.education}</b></p>
            <p>{props.data.summary}</p>
          </div>
        </Col>
        <Col sm={4}>
          <img src={props.data.image}/>
        </Col>
      </Row>

    </div>
  );
};
export default Nancy;

Nancy.propTypes = {
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateState: PropTypes.func.isRequired
}
