import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Col, Row } from 'react-bootstrap';
import { Image } from 'cloudinary-react';
import moment from 'moment';

import EditButton from '../buttons/EditButton';
import { cloudName } from '../../data/data';


const News = (props) => {
  const events = props.data.map((event, index) => (
      <div className="content" key={`news${index}`}>
        <div className="">
          <Row className="clearfix content">
            <h3>{event.title}</h3>
            <Row className="clearfix">
              <Col sm={9} className="">
                <p>{event.description}</p>
                <p><b>{moment(event.createdAt).format('LL')}</b></p>
              </Col>
              <Col sm={3} className="">
                {(!event.image.includes("http")) ?
                  <Image
                    cloudName={cloudName}
                    publicId={event.image}
                    width="300"
                    radius="20"
                    crop="scale"/>:
                  <img alt="900x500" src={event.image}/>
                }
              </Col>
            </Row>
            <div className="text-center">
              <EditButton
                user={props.user}
                dataObj={event}
                updateState={props.updateState}
                title={"Edit"}
              />
              <EditButton
                user={props.user}
                dataObj={event}
                updateState={props.updateState}
                title={"Delete"}
              />
            </div>
          </Row>
          <hr />
        </div>
      </div>
    ));

  return (
    <div className="main-content">
      <PageHeader className="head">News and Events</PageHeader>
      {events}
      <div className="text-center">
        <EditButton
          user={props.user}
          dataObj={props.data[0]}
          updateState={props.updateState}
          title={"Add"}
        />
      </div>
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
