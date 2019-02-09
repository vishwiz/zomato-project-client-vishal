import React, { Component } from "react";
import '../componentCss/carousel.css';
import SerchBar from './searchBar'
import Carousel from 'nuka-carousel';
import first from '../assets/image1.jpg';
import second from '../assets/image2.jpg';
import third from '../assets/image3.jpg';
import fourth from '../assets/image4.jpg';
import fifth from '../assets/image5.jpg'
import seventh from '../assets/image7.jpg';

class Carousels extends Component{
   render(){
       return(
           <section>
        <Carousel transitionMode={"scroll"} autoplay={true}  wrapAround={true} >
        <img src={first}  />
        <img src={second}  />
        <img src={third}  />
        <img src={fourth}  />
        <img src={fifth}  />
        <img src={seventh}  />
      </Carousel>

       </section>
       )
   }
}

export default Carousels;