import { Box } from "@mui/material";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const CarouselBanner: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Slider {...settings} arrows={false}>
        <Box
          sx={{ width: "100%" }}
          onClick={() => {
            console.log("jump");
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              overflow: "hidden",

              " >img": {
                width: "100%",
                height: "100%",
                borderRadius: "6px",
              },
            }}
          >
            <img src={"/images/mini_games.png"} alt="" />
          </Box>
        </Box>
        <Box
          sx={{ width: "100%" }}
          onClick={() => {
            console.log("jump");
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              overflow: "hidden",

              " >img": {
                width: "100%",
                height: "100%",
                borderRadius: "6px",
              },
            }}
          >
            <img src={"/images/tradex_head.png"} alt="" />
          </Box>
        </Box>
      </Slider>
    </Box>
  );
};
export default CarouselBanner;
