// Taken from iplaymusic project

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = ({ children, setPlaylistIndex }) => {
  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    centerMode: false,
    arrows: false,
    slidesToScroll: 1,
    variableWidth: true,
  };

  return <Slider {...settings}>{children}</Slider>;
};

export default Carousel;
