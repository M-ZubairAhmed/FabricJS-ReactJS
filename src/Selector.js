import React from 'react';
import Slider from 'react-slick';
import { Image } from 'react-bootstrap';

export default class Selector extends React.Component {
  returnActiveIndex = activeIndex => {
    this.props.getActiveSelection(activeIndex, this.props.name);
  };
  render() {
    const sliderSettings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      speed: 500,
    };
    const imageStyles = {
      width: '170px',
      height: '100px',
    };
    return (
      <Slider {...sliderSettings} afterChange={this.returnActiveIndex}>
        {this.props.inputSliderData.map((datum, index) => (
          <div key={index}>
            <Image style={imageStyles} src={datum} rounded />
          </div>
        ))}
      </Slider>
    );
  }
}
