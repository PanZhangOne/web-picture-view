import { ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <img
      {...props}
      className="image"
      style={{ width: "100%", overflow: "hidden" }}
    />
  );
};
