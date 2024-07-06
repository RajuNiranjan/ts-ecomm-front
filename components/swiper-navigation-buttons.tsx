import React from "react";
import IconButton from "./ui/icon-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwiper } from "swiper/react";
import { Swiper } from "swiper/types";

interface ButtonsProps {
  swiper: Swiper | null;
  disablePrev: boolean;
  disableNext: boolean;
}

const SwiperNavigationButtons = (props: ButtonsProps) => {
  const { swiper, disablePrev, disableNext } = props;

  return (
    <div className="flex gap-3">
      <IconButton
        icon={<ChevronLeft />}
        className="hover:bg-blue-500 hover:text-white text-gray-500 "
        onClick={() => swiper && swiper.slidePrev()}
      />

      <IconButton
        icon={<ChevronRight />}
        className="hover:bg-blue-500 hover:text-white text-gray-500 "
        onClick={() => swiper && swiper.slideNext()}
      />
    </div>
  );
};

export default SwiperNavigationButtons;
