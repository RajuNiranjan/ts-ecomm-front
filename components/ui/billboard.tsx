// this component is used to display a billboard in the home page
import { Billboard } from "@/type";

interface BillboardProps {
  data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8  rounded-xl pt-0 w-full">
      <div
        style={{
          backgroundImage: `url(${data.imageUrl})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "344px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="rounded-xl relative aspect-square  overflow-hidden bg-cover w-full"
      >
        <div className="h-full w-full flex flex-col  gap-y-8">
          <div
            className="font-bold text-white text-3xl p-2  bg-black sm:text-5xl lg:text-3xl sm:max-w-xl max-w-xs"
            style={{ textShadow: "4px 4px 8px black", maxWidth: "max-content" }}
          >
            {data?.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
