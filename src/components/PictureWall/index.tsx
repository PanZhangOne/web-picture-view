import { Card, Col, Row, Typography } from "@douyinfe/semi-ui";
import { CardProps } from "@douyinfe/semi-ui/lib/es/card";
import { useCallback, useEffect, useState } from "react";
import { Folder } from "../../model/Folder";
import { Image } from "../Image";
import { Previews } from "../Previews";

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

  onSelect?: (dirHandle: Promise<FileSystemDirectoryHandle>) => void;
}

export const PictureWall: React.FC<PictureWallProps> = (props) => {
  const [pictureList, setPictureList] = useState<File[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { Text } = Typography;

  const initPictureData = async () => {
    if (!props.folder) {
      return;
    }

    const files = await props.folder.getImages();
    setPictureList([...files]);
  };

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    initPictureData();
  }, [props.folder]);

  return (
    <div className="picture-wall-wrap">
      <Card
        {...props}
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>图片列表</Text>
            <Text link type="warning">重新选择</Text>
          </div>
        }
        bordered
        headerLine
      >
        <Row gutter={30}>
          {pictureList.map((item, index) => {
            const imgSrc = URL.createObjectURL(item);
            return (
              <Col span={6} key={item.name}>
                <Image
                  src={imgSrc}
                  fileName={item.name}
                  onClick={() => openImageViewer(index)}
                />
              </Col>
            );
          })}
        </Row>
      </Card>

      {isViewerOpen && (
        <Previews
          src={pictureList.map((item) => URL.createObjectURL(item))}
          currentIndex={currentImage}
          closeOnClickMask={false}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
};
