import { React, useState, useEffect} from "react";
import { Container, Card, Row } from "react-bootstrap";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import "./dashboard.scss";

export default function Nodes(props) {
  const { content } = props;

  let nodeData = [...content.nodes];
  let minThreshold = 3000;
  let slaKpis = [];
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
          <Card key={`node${index}`} className={`node${index}`}>
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
                  <tr key="slaRow" className="slaRow">
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
                    <tr key={`thrpt${index}`}>
                      <td>{item.throughput}</td>
                      <td id="name">Thrpt/8hr</td>
                    </tr>
                  ) : null}
                  {item.costKpi ? (
                    <tr key={`cost${index}`}>
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
