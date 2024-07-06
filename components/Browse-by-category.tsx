import React, { useEffect, useState } from "react";
import AnimatedText from "./ui/AnimatedText";
import SwiperNavigationButtons from "./swiper-navigation-buttons";
import { Category } from "@/type";

interface Props {
  categories?: Category[];
}

const BrowseByCategory: React.FC<Props> = ({ categories }) => {
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [disablePrev, setDisabledPrev] = useState<boolean>(true);
  const [disableNext, setDisabledNext] = useState<boolean>(false);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [hideButtons, setHideButtons] = useState(true);

  // Update slidesPerView based on window width
  const updateSlidesPerView = () => {
    if (window.innerWidth < 400) {
      setSlidesPerView(1);
    } else if (window.innerWidth < 600) {
      setSlidesPerView(2);
    } else if (window.innerWidth < 768) {
      setSlidesPerView(4);
    }
  };

  const updateHideButtons = () => {
    if (window.innerWidth < 400) {
      setHideButtons(false);
    }
  };

  useEffect(() => {
    updateSlidesPerView();
    updateHideButtons();
    window.addEventListener("resize", updateSlidesPerView);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  return (
    <>
      <div className="space-y-4">
        {!categories && (
          <div className="flex justify-between items-center">
            <div
              className="font-semiboldp-2"
              style={{ letterSpacing: "1.44px" }}
            >
              {"BROWSE BY CATEGORY".split("").map((letter, index) => (
                <AnimatedText key={index}>
                  {letter === " " ? "\u00A0" : letter}
                </AnimatedText>
              ))}
            </div>
            <div className="flex justify-center swiper-container ">
              {" "}
              {hideButtons && (
                <SwiperNavigationButtons
                  swiper={swiperInstance}
                  disablePrev={disablePrev}
                  disableNext={disableNext}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BrowseByCategory;
