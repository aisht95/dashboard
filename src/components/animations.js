import { React, useState, useEffect, useRef } from "react";
import { Container, Card, Row, Col, ColProps, RowProps } from "react-bootstrap";
import "./dashboard.scss";

export default function Animations() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    if(typeof window !== undefined){
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  return (
    <Container fluid className="animations">
    {width > 1400 ? (
      <div>
      <div className="lineContainer">
        <div id="line1"></div>
      </div>
      <div className="line2Container">
        <div id="line1"></div>
      </div>
      <div className="line3Container">
        <div id="line1"></div>
      </div>
      <div className="line4Container">
        <div id="line1"></div>
      </div>
      <div className="line5Container">
        <div id="line1"></div>
      </div>
      <div className="line6Container">
        <div id="line1"></div>
      </div>
      <div className="line7Container">
        <div id="line1"></div>
      </div>
      <div className="line8Container">
        <div id="line1"></div>
      </div>
      </div>
      ) : null }
    </Container>
  );
}
