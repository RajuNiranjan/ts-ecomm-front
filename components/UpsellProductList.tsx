// this component is used to display the list of products
import NoResults from "./ui/no-results";
import ProductCart from "./ui/product-card";
import AnimatedText from "./ui/AnimatedText";
import { RelatedProducts } from "@/type";

import "swiper/swiper-bundle.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import SwiperNavigationButtons from "./swiper-navigation-buttons";
import UpsellRelatedProductCard from "./UpsellRelatedProductCard";

interface ProductListProps {
  title: string;
  items: RelatedProducts[];
}

const UpsellProductList: React.FC<ProductListProps> = ({ title, items }) => {
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
  return (
    <>
      <div className="space-y-4">
        {items && (
          <div className="flex justify-between items-center">
            <div
              className="font-semiboldp-2"
              style={{ letterSpacing: "1.44px" }}>
              {title.split("").map((letter, index) => (
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

      <hr className="bg-grey-100 my-3" />
      <Swiper
        spaceBetween={50}
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={slidesPerView}
        className="mb-10"
        onSwiper={(swiper: any) => setSwiperInstance(swiper)}>
        <div>
          {items &&
            items.map((item) => (
              <SwiperSlide key={item.id}>
                <div>
                  <UpsellRelatedProductCard data={item} />
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

export default UpsellProductList;
