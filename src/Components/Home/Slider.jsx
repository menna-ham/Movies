import React from "react";
// import Slider from "react-slick";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider(props) {
    let trend= props.trend
    console.log(trend);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings} className='bg-success'>
    <div className="container">
    <div className="row">
        {
            props.trend.map((trend)=>{
                return (
                    
                    <div className="col-md-3">
                    <div className="bg-warning">
                        {trend.original_title}
                    </div>
                    </div>
                )
            })
        }
    </div>
    </div>



    </Slider>
  );
}