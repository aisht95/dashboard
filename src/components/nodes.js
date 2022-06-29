import { React, useState, useEffect, useRef } from "react";
import { Container, Card, Row, Col, ColProps, RowProps } from "react-bootstrap";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import "./dashboard.scss";

export default function Nodes(props) {
  const { content } = props;

  let nodeData = [...content.nodes];
  let slaKpis = [];
  let minThreshold = 3000;

  nodeData.forEach((i) => slaKpis.push(i.slaKpi));

  const [slas, setSlas] = useState([...slaKpis]);

  useEffect(() => {
    const interval = setInterval(() => {
      slaKpis = slaKpis.map((i) => (i = Math.floor(Math.random() * 10000) + 1));
      setSlas(slaKpis);
    }, 5000);

    return () => clearInterval(interval);
  }, [slas]);

  return (
    <Container fluid className="nodes">
      <Row>
        {nodeData.map((item, index) => (
          <Card className={`node${index}`}>
            <Card.Body>
              <div
                className={
                  slas[index] > minThreshold ? "nodeCircle" : "nodePulse"
                }
              ></div>
              <Card.Title>
                <h4>{item.name}</h4>
              </Card.Title>
              <Card.Text className="nodeText">
                <table>
                  <tr className="slaRow">
                    <td>
                      {slas[index] > minThreshold ? (
                        <CaretUpFill />
                      ) : (
                        <CaretDownFill />
                      )}
                      {slas[index]}
                    </td>
                    <td id="name">SLA</td>
                  </tr>
                  {item.throughput ? (
                    <tr>
                      <td>{item.throughput}</td>
                      <td id="name">Thrpt/8hr</td>
                    </tr>
                  ) : null}
                  {item.costKpi ? (
                    <tr>
                      <td>{item.costKpi}</td>
                      <td id="name">Cost/8hr</td>
                    </tr>
                  ) : null}
                </table>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}
