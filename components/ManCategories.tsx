// this component is for Desktop ManCategories
import React from "react";
import AnimatedText from "./ui/AnimatedText";
import CategoryCard from "./ui/category-card";
import { Category } from "@/type";

type CategoriesProps = {
  data: Category[];

  title: string;
};

const ManCategories: React.FC<CategoriesProps> = ({ data, title }) => {
  const [mute, setMute] = React.useState<boolean>(false);
  React.useEffect(() => {
    setMute(true);
  }, []);
  if (!mute) return null;

  const sentence = title.split("");
  return (
    <>
      <div className="hidden md:flex gap-x-2 mx-5">
        {sentence.map((letter, index) => (
          <AnimatedText key={index}>
            {letter === " " ? "\u00A0" : letter}
          </AnimatedText>
        ))}
      </div>
      <div className="hidden md:grid md:grid-cols-6 gap-4 p-3 m-3 w-full">
        {data.map((data, index) => (
          <div key={index}>
            <CategoryCard data={data} />
          </div>
        ))}
      </div>
    </>
  );
};
export default ManCategories;
