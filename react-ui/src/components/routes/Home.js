import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Carousel, Button } from 'react-bootstrap';

import EditButton from '../buttons/EditButton';

const Home = (props) => {

  const carouselImg = props.data[0]["carousel"].map((image, index) => (
    <Carousel.Item key={image}>
      <img className="carouselImg" alt="900x500" src={image}/>
    </Carousel.Item>
  ));

  return (
    <div>

      <header>
        <Carousel className="carousel-content">
          {carouselImg}
        </Carousel>
      </header>


        <div className="main-content">
          <PageHeader className="head">Home</PageHeader>
          <div className="content">
            <p className="summary">{props.data[0]["summary"]}</p>
            <div className="text-center">
              <EditButton
                user={props.user}
                dataObj={props.data[0]}
                updateState={props.updateState}
                title={"Edit"}
                length={2}
              />
            </div>
          </div>
        </div>


    </div>
  );
}

export default Home;

Home.propsTypes = {
  data: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,

  updateState: PropTypes.func.isRequired
}
