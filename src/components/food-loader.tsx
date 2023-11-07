import FoodLoaderGif from "@/assets/FoodLoader.gif";
import Image from "next/image";
export const FoodLoader = () => {
  return (
    <div className="m-auto flex flex-col items-center">
      <Image width={300} height={300} src={FoodLoaderGif} alt="loader GIF" />
      <p>cargando...</p>

    </div>
  );
};
