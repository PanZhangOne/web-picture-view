import { Card, Col, Row } from "@douyinfe/semi-ui";
import { CardProps } from "@douyinfe/semi-ui/lib/es/card";
import { Image } from "../Image";

import "./style.css";

interface PictureWallProps extends CardProps {
  wallCardProps?: CardProps;

  pictureList?: File[];
}

export const PictureWall: React.FC<PictureWallProps> = (props) => {
  return (
    <div className="picture-wall-wrap">
      <Card {...props} title="图片列表" bordered headerLine>
        <Row gutter={30}>
          {props.pictureList?.map((item) => {
            const imgSrc = URL.createObjectURL(item);
            return (
              <Col span={4}>
                <Image src={imgSrc} />
              </Col>
            );
          })}
        </Row>
      </Card>
    </div>
  );
};
