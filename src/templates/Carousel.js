// Taken from iplaymusic project

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = ({ children, setPlaylistIndex }) => {
  // calculates how many slides it should show based on the screen height minus other content
  const { innerHeight: height } = window;
  let slickHeight = height - 66 - 32 - 41 - 16;
  let slicksToShow = slickHeight / 286;

  var settings = {
    infinite: false,
    slidesToShow: slicksToShow,
    swipeToSlide: true,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    center: true,
  };

  return <Slider {...settings}>{children}</Slider>;
};

export default Carousel;
