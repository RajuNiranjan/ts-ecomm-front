// this component is for Desktop ManCategories
import React, { useEffect, useState } from "react";
import AnimatedText from "./ui/AnimatedText";
import CategoryCard from "./ui/category-card";
import { Category } from "@/type";

import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperNavigationButtons from "./swiper-navigation-buttons";

type CategoriesProps = {
  data: Category[];

  title: string;
};

const Categories: React.FC<CategoriesProps> = ({ data, title }) => {
  const [mute, setMute] = useState<boolean>(false);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [disablePrev, setDisabledPrev] = useState<boolean>(true);
  const [disableNext, setDisabledNext] = useState<boolean>(false);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [hideButtons, setHideButtons] = useState(true);

  const updateSlidesPerView = () => {
    if (window.innerWidth < 400) {
      setSlidesPerView(1);
    } else if (window.innerWidth < 600) {
      setSlidesPerView(2);
    } else if (window.innerWidth < 800) {
      setSlidesPerView(3);
    } else if (window.innerWidth < 900) {
      setSlidesPerView(4);
    }
  };

  const updateHideButtons = () => {
    setMute(true);
    if (window.innerWidth < 400) {
      setHideButtons(false);
    }
  };

  useEffect(() => {
    updateSlidesPerView();
    updateHideButtons();
    const handleResize = () => {
      updateSlidesPerView();
      updateHideButtons();
    };

    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!mute) return null;

  const sentence = title.split("");

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-semiboldp-2" style={{ letterSpacing: "1.44px" }}>
          {sentence.map((letter, index) => (
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
      <hr className="bg-grey-100 my-3" />
      <Swiper
        spaceBetween={50}
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={slidesPerView}
        className="mb-10"
        onSwiper={(swiper: any) => setSwiperInstance(swiper)}
      >
        <div>
          {data.map((data, index) => (
            <SwiperSlide key={index}>
              <div>
                <CategoryCard data={data} />
              </div>
            </SwiperSlide>
          ))}
        </div>
        {hideButtons === false && (
          <div className="flex justify-center my-3">
            <SwiperNavigationButtons
              swiper={swiperInstance}
              disablePrev={disablePrev}
              disableNext={disableNext}
            />
          </div>
        )}
      </Swiper>
    </>
  );
};
export default Categories;
