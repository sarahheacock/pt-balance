import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { Image } from 'cloudinary-react';

import EditButton from '../../buttons/EditButton';
import { cloudName } from '../../../data/data';

const Nancy = (props) => {

  return (
    <div className="content">
      <h3>{props.data.name}</h3>
      <Row className="clearfix">

        <Col sm={8}>
          <div className="about">
            <p><b>{props.data.education}</b></p>
            <p>{props.data.summary}</p>
          </div>
        </Col>
        <Col sm={4}>
          {(!props.data.image.includes("http")) ?
            <Image
              cloudName={cloudName}
              publicId={props.data.image}
              width="400"
              radius="20"
              crop="scale"/>:
            <img alt="900x500" src={props.data.image}/>
          }
        </Col>
      </Row>
      <EditButton
        user={props.user}
        dataObj={props.data}
        updateState={props.updateState}
        title={"Edit"}
      />
    </div>
  );
};
export default Nancy;

Nancy.propTypes = {
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateState: PropTypes.func.isRequired
}
