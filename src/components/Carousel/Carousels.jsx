import { Carousel, Col, Row } from "antd";
import React from "react";

import bg1 from "../../Assets/bg1.jpg";
import bg2 from "../../Assets/bg2.jpg";
import bg3 from "../../Assets/bg3.jpg";

const Carousels = () => {
  return (
    <div className="carousel-container">
      <Row>
        <Col span={24}>
          <div className="carousel">
            <Carousel autoplay>
              <div>
                <img src={bg1} alt="img" />
              </div>
              <div>
                <img src={bg2} alt="img" />
              </div>
              <div>
                <img src={bg3} alt="img" />
              </div>
            </Carousel>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Carousels;
