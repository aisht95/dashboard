import { React, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./dashboard.scss";

export default function Animations() {
  return (
    <Container fluid className="animations">
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
    </Container>
  );
}
