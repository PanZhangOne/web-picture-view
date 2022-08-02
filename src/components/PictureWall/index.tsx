import { Card, Col, Row } from "@douyinfe/semi-ui";
import { CardProps } from "@douyinfe/semi-ui/lib/es/card";
import { useEffect, useState } from "react";
import { Folder } from "../../interfaces/Folder";
import { Image } from "../Image";

import "./style.css";

interface PictureWallProps {
  /**
   * 自定义参数
   */
  wallCardProps?: CardProps;

  /**
   * 选择的文件夹
   */
  folder?: Folder;
}

export const PictureWall: React.FC<PictureWallProps> = (props) => {
  const [pictureList, setPictureList] = useState<File[]>([]);

  const initPictureData = async () => {
    if (!props.folder) {
      return;
    }

    const files = await props.folder.getImages();
    setPictureList([...files]);
  };

  useEffect(() => {
    initPictureData();
  }, [props.folder]);

  return (
    <div className="picture-wall-wrap">
      <Card {...props} title="图片列表" bordered headerLine>
        <Row gutter={30}>
          {pictureList.map((item) => {
            const imgSrc = URL.createObjectURL(item);
            return (
              <Col span={6} key={item.name}>
                <Image src={imgSrc} fileName={item.name} />
              </Col>
            );
          })}
        </Row>
      </Card>
    </div>
  );
};
