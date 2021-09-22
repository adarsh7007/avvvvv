import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import offer from "../image/offer2.jpg";
import fish from "../image/color.jpg";
import arrival from "../image/gfish.jpg";
import avc from '../image/flamingo.webp'

const ProductCarousel = () => {
  
  return (
    <div style={{width:"100%"}} id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img className="d-block w-100" src={avc} alt="First slide"/>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={fish} alt="Second slide"/>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={arrival} alt="Third slide"/>
      </div>
    </div>
    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
  );
};

export default ProductCarousel;
