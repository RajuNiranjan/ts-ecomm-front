import { Product } from "@/type";
import React from "react";
import AnimatedText from "./ui/AnimatedText";
import Image from "next/image";

// interface NewArrivelProps {
//   products: Product[];
// }

const demoData = [
  {
    id: 1,
    title: "PlayStation 5",
    description: "Black and White version of the PS5 coming out on sale.",
    imageurl: "",
  },
  {
    id: 1,
    title: "",
    description: "",
    imageurl: "",
  },
  {
    id: 1,
    title: "",
    description: "",
    imageurl: "",
  },
  {
    id: 1,
    title: "",
    description: "",
    imageurl: "",
  },
];

const DiscoverCollections = () => {
  return (
    <div className="flex flex-col gap-5 w-full my-5">
      <div className="font-semiboldp-2" style={{ letterSpacing: "1.44px" }}>
        {"DISCOVER COLLECTIONS".split("").map((letter, index) => (
          <AnimatedText key={index}>
            {letter === " " ? "\u00A0" : letter}
          </AnimatedText>
        ))}
      </div>
      {/* <div className="flex flex-col gap-8 sm:flex-row">
        <div
          className="flex flex-col justify-end text-white sm:w-1/2 h-[300px]"
          style={{
            background: `url(${"/mens-collection.jpeg"}) lightgray 50% / cover no-repeat`,
          }}>
          <div className="flex flex-col gap-3 p-3 mb-5">
            <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
              Men’s Collections
            </p>
            <p className="font-poppins text-base font-normal leading-5">
              Featured man collections that give you another vibe.
            </p>
            <button className="underline text-[20px] w-[120px] align-top text-left">
              Shop Now
            </button>
          </div>
        </div>

        <div
          className="flex flex-col justify-end text-white sm:w-1/2 h-[300px]"
          style={{
            background: `url(${"/womens-collection.png"}) lightgray 50% / cover no-repeat`,
          }}>
          <div className="flex flex-col gap-3 p-3 mb-5">
            <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
              Women’s Collections
            </p>
            <p className="font-poppins text-base font-normal leading-5">
              Featured woman collections that give you another vibe.
            </p>
            <button className="underline text-[20px] w-[120px] align-top text-left">
              Shop Now
            </button>
          </div>
        </div>
      </div> */}

      <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-4 ">
        <div className="grid gap-4 ">
          <div className="h-auto w-full ">
            <div className="relative">
              <Image
                src="/womens-collection.png"
                width={400}
                height={400}
                className="h-full  rounded-lg w-full"
                alt=""
              />
              <div className="absolute bottom-0 text-white flex flex-col gap-3 p-3 mb-5">
                <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
                  Women’s Collections
                </p>
                <p className="font-poppins text-base font-normal leading-5">
                  Featured woman collections that give you another vibe.
                </p>
                <button className="underline text-[20px] w-[120px] align-top text-left">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
          <div className="h-auto w-full ">
            <div className="relative">
              <Image
                src="https://i.pinimg.com/474x/a8/2b/bf/a82bbf37bbe0f6976d906b93414a4775.jpg"
                width={400}
                height={400}
                className="h-auto w-full"
                alt=""
              />
              <div className="absolute bottom-0 text-white flex flex-col gap-3 p-3 mb-5">
                <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
                  Women’s Collections
                </p>
                <p className="font-poppins text-base font-normal leading-5">
                  Featured woman collections that give you another vibe.
                </p>
                <button className="underline text-[20px] w-[120px] align-top text-left">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
          <div className="h-auto w-full ">
            <div className="relative">
              <Image
                src="/mens-collection.jpeg"
                width={400}
                height={400}
                className="h-full rounded-lg w-full"
                alt=""
              />
              <div className="absolute bottom-0 text-white flex flex-col gap-3 p-3 mb-5">
                <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
                  Men’s Collections
                </p>
                <p className="font-poppins text-base font-normal leading-5">
                  Featured man collections that give you another vibe.
                </p>
                <button className="underline text-[20px] w-[120px] align-top text-left">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
          <div className="h-auto w-full ">
            <div className="relative">
              <Image
                src="https://i.pinimg.com/236x/9e/22/e1/9e22e1f4317e740c2fed70cccd524937.jpg"
                width={400}
                height={400}
                className="h-auto w-full"
                alt=""
              />
              <div className="absolute bottom-0 text-white flex flex-col gap-3 p-3 mb-5">
                <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
                  Men’s Collections
                </p>
                <p className="font-poppins text-base font-normal leading-5">
                  Featured man collections that give you another vibe.
                </p>
                <button className="underline text-[20px] w-[120px] align-top text-left">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="h-auto w-full ">
            <div className="relative">
              <Image
                src="https://i.pinimg.com/474x/a8/2b/bf/a82bbf37bbe0f6976d906b93414a4775.jpg"
                width={400}
                height={400}
                className="h-auto w-full"
                alt=""
              />
              <div className="absolute bottom-0 text-white flex flex-col gap-3 p-3 mb-5">
                <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
                  Women’s Collections
                </p>
                <p className="font-poppins text-base font-normal leading-5">
                  Featured woman collections that give you another vibe.
                </p>
                <button className="underline text-[20px] w-[120px] align-top text-left">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
          <div className="h-auto w-full ">
            <div className="relative">
              <Image
                src="/womens-collection.png"
                width={400}
                height={400}
                className="h-full rounded-lg w-full"
                alt=""
              />
              <div className="absolute bottom-0 text-white flex flex-col gap-3 p-3 mb-5">
                <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
                  Women’s Collections
                </p>
                <p className="font-poppins text-base font-normal leading-5">
                  Featured woman collections that give you another vibe.
                </p>
                <button className="underline text-[20px] w-[120px] align-top text-left">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
          <div className="h-auto w-full ">
            <div className="relative">
              <Image
                src="https://i.pinimg.com/236x/9e/22/e1/9e22e1f4317e740c2fed70cccd524937.jpg"
                width={400}
                height={400}
                className="h-auto w-full"
                alt=""
              />
              <div className="absolute bottom-0 text-white flex flex-col gap-3 p-3 mb-5">
                <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
                  Men’s Collections
                </p>
                <p className="font-poppins text-base font-normal leading-5">
                  Featured man collections that give you another vibe.
                </p>
                <button className="underline text-[20px] w-[120px] align-top text-left">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
          <div className="h-auto w-full ">
            <div className="relative">
              <Image
                src="/mens-collection.jpeg"
                width={400}
                height={400}
                className="h-full rounded-lg w-full"
                alt=""
              />
              <div className="absolute bottom-0 text-white flex flex-col gap-3 p-3 mb-5">
                <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
                  Men’s Collections
                </p>
                <p className="font-poppins text-base font-normal leading-5">
                  Featured man collections that give you another vibe.
                </p>
                <button className="underline text-[20px] w-[120px] align-top text-left">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="h-auto w-full ">
            <div className="relative">
              <Image
                src="/womens-collection.png"
                width={400}
                height={400}
                className="h-full rounded-lg w-full"
                alt=""
              />
              <div className="absolute bottom-0 text-white flex flex-col gap-3 p-3 mb-5">
                <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
                  Women’s Collections
                </p>
                <p className="font-poppins text-base font-normal leading-5">
                  Featured woman collections that give you another vibe.
                </p>
                <button className="underline text-[20px] w-[120px] align-top text-left">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
          <div className="h-auto w-full ">
            <div className="relative">
              <Image
                src="https://i.pinimg.com/474x/a8/2b/bf/a82bbf37bbe0f6976d906b93414a4775.jpg"
                width={400}
                height={400}
                className="h-auto w-full"
                alt=""
              />
              <div className="absolute bottom-0 text-white flex flex-col gap-3 p-3 mb-5">
                <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
                  Women’s Collections
                </p>
                <p className="font-poppins text-base font-normal leading-5">
                  Featured woman collections that give you another vibe.
                </p>
                <button className="underline text-[20px] w-[120px] align-top text-left">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
          <div className="h-auto w-full ">
            <div className="relative">
              <Image
                src="/mens-collection.jpeg"
                width={400}
                height={400}
                className="h-full rounded-lg w-full"
                alt=""
              />
              <div className="absolute bottom-0 text-white flex flex-col gap-3 p-3 mb-5">
                <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
                  Men’s Collections
                </p>
                <p className="font-poppins text-base font-normal leading-5">
                  Featured man collections that give you another vibe.
                </p>
                <button className="underline text-[20px] w-[120px] align-top text-left">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
          <div className="h-auto w-full ">
            <div className="relative">
              <Image
                src="https://i.pinimg.com/236x/9e/22/e1/9e22e1f4317e740c2fed70cccd524937.jpg"
                width={400}
                height={400}
                className="h-auto w-full"
                alt=""
              />
              <div className="absolute bottom-0 text-white flex flex-col gap-3 p-3 mb-5">
                <p className="font-inter text-[30px] font-semibold leading-24 tracking-wide">
                  Men’s Collections
                </p>
                <p className="font-poppins text-base font-normal leading-5">
                  Featured man collections that give you another vibe.
                </p>
                <button className="underline text-[20px] w-[120px] align-top text-left">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverCollections;
