import { ImgHTMLAttributes } from "react";
import { Card, Typography } from "@douyinfe/semi-ui";

interface ImageProps {
  /**
   * 图片地址
   */
  src: string;

  /**
   * 图片名称
   */
  fileName: string;

  /**
   * 图片所属文件夹
   */
  folderName?: string;

  /**
   * 图片标签参数
   */
  imageProps?: ImgHTMLAttributes<HTMLImageElement>;
}

const ImageFooter: React.FC<{ fileName: string }> = ({ fileName }) => {
  const { Text } = Typography;
  return <Text>{fileName}</Text>;
};

export const Image: React.FC<ImageProps> = (props) => {
  const img = (
    <img
      {...props}
      className="image"
      style={{ width: "100%", overflow: "hidden" }}
    />
  );

  return (
    <Card
      cover={img}
      footer={<ImageFooter fileName={props.fileName} />}
      footerLine
      shadows="hover"
    />
  );
};
