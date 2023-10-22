import FoodLoaderGif from "@/assets/FoodLoader.gif";
import Image from "next/image";
export const FoodLoader = () => {
  return <Image width={300} height={300} src={FoodLoaderGif} alt="loader GIF" />;
};
