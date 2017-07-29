import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Carousel, Button } from 'react-bootstrap';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';

import EditButton from '../buttons/EditButton';
import { cloudName } from '../../data/data';


const windowInnerHeight = () => Math.floor(window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight); //height of window content

const navHeight = () => {
  const main = document.getElementById('navigation');
  return (main) ? Math.floor(main["scrollHeight"] || main["clientHeight"]) : 0;
};

const Home = (props) => {

  const carouselImg = props.data[0]["carousel"].map((image, index) => (
    <Carousel.Item key={image}>
      {(!image.includes("http")) ?
        <Image className='carImg'
          id={`carImg${index}`}
          cloudName={cloudName}
          publicId={image}
          width={screen.width}
          height={windowInnerHeight() - navHeight() - 50}
          crop="scale"/>:
        <img className="carouselImg" alt="900x500" src={image}/>
      }

    </Carousel.Item>
  ));

  return (
    <div>

      <header id="carHeader">
        <Carousel className="carousel-content">
          {carouselImg}
        </Carousel>
      </header>

      <div className="lower-content">
        <div className="home-content">
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
