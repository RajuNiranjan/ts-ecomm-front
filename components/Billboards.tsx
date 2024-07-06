// this component is for billboards
"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import { Billboard } from "@/type";
import { Navigation, Pagination, FreeMode, Autoplay } from "swiper/modules";

import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BillboardProps {
  data: Billboard[];
}

const Billboards: React.FC<BillboardProps> = ({ data }) => {
  const [disablePrev, setDisabledPrev] = useState<boolean>(true);
  const [disableNext, setDisabledNext] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setMute(true);
    setTimeout(() => {
      setRender(true);
    }, 1000);
  }, []);
  if (!mute) return null;

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    object: "object-fill",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <>
      <div className="p-2 py-10">
        <Swiper
          spaceBetween={50}
          pagination={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          onSlideChange={(swiper: any) => {
            setDisabledPrev(swiper.isBeginning);
            setDisabledNext(swiper.isEnd);
          }}
        >
          {data?.map((data, index) => (
            <SwiperSlide key={index}>
              <div>
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${data.imageUrl})`,
                    // backgroundColor: "#424040",
                  }}
                  className="w-full h-[344px] lg:h-[500px]"
                >
                  <div className="h-full w-full mx-[20px] flex flex-col justify-center items-start p-3  gap-y-8">
                    {render && (
                      <div className="flex justify-between items-center w-full">
                        <div
                          style={{ textShadow: "4px 4px 8px black" }}
                          className="font-bold text-3xl sm:text-5xl text-white lg:text-6xl sm:max-w-xl max-w-xs font-poppins "
                        >
                          <p className="font-medium text-[18px] text-shadow-md">
                            {data.label}
                          </p>
                          <p className="text-[30px] capitalize mt-4">
                            {data.content}
                          </p>
                          <button
                            onClick={() => router.push(data.btnUrl)}
                            className="text-white text-[18px] underline  font-medium"
                          >
                            Shop Now
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Billboards;
