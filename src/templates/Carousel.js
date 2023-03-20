// Taken from iplaymusic project

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useContext, useRef } from "react";
import HomeScrollContext from "../context/HomeScrollContext";

const Carousel = ({ children, setPlaylistIndex }) => {
  const { setCarouselIndex } = useContext(HomeScrollContext);
  // calculates how many slides it should show based on the screen height minus other content
  const { innerHeight: height } = window;
  let slickHeight = height - 66 - 32 - 41 - 16;
  let slicksToShow = slickHeight / 286;

  // homepage moving slide to previously displayed slide
  const sliderRef = useRef();
  if (setPlaylistIndex !== undefined) {
    setTimeout(function () {
      sliderRef?.current?.slickGoTo(setPlaylistIndex, false);
    }, 150);
  }

  var settings = {
    infinite: false,
    slidesToShow: slicksToShow,
    swipeToSlide: true,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    center: true,
    /* setPlaylistIndex prop only gets passed from home page */
    initialSlide: 0,
    afterChange: function (index) {
      if (setPlaylistIndex !== undefined) {
        setCarouselIndex(index);
      }
    },
  };

  return (
    <Slider ref={sliderRef} {...settings}>
      {children}
    </Slider>
  );
};

export default Carousel;
