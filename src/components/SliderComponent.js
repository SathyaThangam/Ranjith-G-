import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import '../css/SliderComponent.css';
import CardComponent from '../components/CardComponent';

export default function SliderComponent(props) {
    
    const {data,settings,heading} = props;
    

    return (
        <div className="gallery">
            <h2 className="heading">{heading}</h2>
            <Slider {...settings}>
                {data.map((item) => {
                 return <CardComponent key={item.id} id={item.id} showName={item.name} showLang = {item.language} showDate = {item.premiered} showImg={item.image.medium}/>
                })}
            </Slider>
        </div>
    )
}
