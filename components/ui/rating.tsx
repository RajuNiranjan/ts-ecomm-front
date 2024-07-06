// Desc: This component is used to display the rating of a product
import React from "react";
import { StarHalf, Star } from "lucide-react";

type ratingProps = {
  value: number;
};

const Rating: React.FC<ratingProps> = ({ value }) => {
  const fullStars = Math.floor(value);
  const array = new Array(fullStars).fill(null);

  return (
    <div className="app">
      <div
        className="star-rating"
        style={{
          display: "flex",

          position: "relative",
        }}
      >
        <div className="stars" style={{ display: "flex", gap: "4px" }}>
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              fill="#111"
              strokeWidth={0}
              className="w-[14px] h-[14px]"
            />
          ))}
        </div>
        <div
          className="stars rating"
          style={{
            position: "absolute",
            top: 0,
            display: "flex",
            gap: "4px",
          }}
        >
          {array.map((_, index) => (
            <Star
              key={index}
              fill="#f4ca16"
              className="w-[14px] h-[14px]"
              strokeWidth={0}
            />
          ))}
          {value % 1 !== 0 && (
            <StarHalf
              fill="f4ca16"
              className="w-[14px] h-[14px]"
              strokeWidth={0}
            />
          )}{" "}
        </div>
      </div>
    </div>
  );
};
export default Rating;
