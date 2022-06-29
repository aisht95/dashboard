import { React, useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  CaretDownFill,
  CaretUpFill,
  DropletHalf,
  RouterFill,
  ThermometerHalf,
  PeopleFill,
  PlugFill,
  Truck,
} from "react-bootstrap-icons";
import "./dashboard.scss";

export default function Hud(props) {
  const { content } = props;
  let notificationsData = [...content.hud.notifications];
  let onesData = [...content.hud.ones];
  let hudNodeData = [...content.hud.node];

  function notifications(title, body) {
    return (
      <Container>
        <h5>{title}</h5>
        <p>{body}</p>
      </Container>
    );
  }

  let kpis = [];
  let indexSla;
  let minThreshold = 3000;
  onesData.forEach((item, index) =>
    item.name === "SLA Attainment" ? (indexSla = index) : null
  );
  onesData.forEach((i) => kpis.push(i.kpi));

  const [onesKpis, setOnesKpis] = useState([...kpis]);
  const [min, setMin] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      kpis = kpis.map((i) => (i = Math.floor(Math.random() * 10000) + 1));
      setOnesKpis(kpis);
      setMin(onesKpis[indexSla]);
    }, 5000);

    return () => clearInterval(interval);
  }, [onesKpis, min]);

  const apiKey = "fc1139eb69759a813c1c57a21d25f106";
  const timeApiKey = "VKRZOFFEEO9J";

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState(null);
  const [image, setImage] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
      )
        .then((res) => res.json())
        .then((result) => {
            setData(result);
            setTemp(result.main.temp);
            setImage(result.weather[0].icon);
        })
        .catch((err)=> console.log(err));

        /*
      await fetch(
        `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeApiKey}&format=json&by=position&lat=${lat}&lng=${long}`
      )
        .then((res) => res.json())
        .then((result) => {
          setTime(result.formatted.match(/([0-9]+\:){2}([0-9]+)/g));
        });
        */
    };
    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, [lat, long, data, time]);

  let temperature = temp !== undefined ? Math.floor(temp * 1.8 + 32) : 0;
  let date = new Date();
  let todaysDate = date.getDate() + "/" + date.getMonth();
  let timezone = date.toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
  let day = "";

  switch (date.getDay()) {
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
    case 7:
      day = "Sun";
      break;
  }

  return (
    <Container fluid className="hudContent">
      <Row className="topBar">
        <Col md={12} xxl={8}>
          <ul className="hudIcons">
            <li key="plug" id="greenIcon">
              <PlugFill />
            </li>
            <li key="droplet" id="greenIcon">
              <DropletHalf />
            </li>
            <li key="router" id="redIcon">
              <RouterFill />
            </li>
            <li key="thermometer" id="greenIcon">
              <ThermometerHalf />
            </li>
            <li key="people" id="redIcon">
              <PeopleFill />
            </li>
            <li key="cart" id="greenIcon">
              <Truck />
            </li>
          </ul>
        </Col>
        <Col md={12} xxl={4}>
          <ul className="weatherIcons">
            <li key="temp" id="temperature">
              <h3>{temperature + "°"}</h3>
            </li>
            <li key="weather" >
              <img
                src={`http://openweathermap.org/img/wn/${image}.png`}
                id="weatherIcon"
              />
            </li>
            <li key="timezone" id="timezone">
              {timezone} {day} {todaysDate}
            </li>
            <li key="time" id="time">
              <h3>{date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()}</h3>
            </li>
          </ul>
        </Col>
      </Row>

      <Row>
        <Col xs={12} lg={8} className="notifications">
          <h4>Notifications</h4>
          <ul>
            {notificationsData.map((item) => (
              <li key={`${item.title}`}> {notifications(item.title, item.body)} </li>
            ))}
          </ul>
        </Col>
        <Col xs={12} lg={4} className="ONEs">
          <Row>
            <h4>ONEs</h4>
            <table>
              <tbody>
                {onesData.map((item, index) => (
                  <tr key={`${item.name}`}>
                    <td key="name" id="name"> {item.name} </td>
                    <td key="kpi" id="kpi">
                      {onesKpis[index] > minThreshold ? (
                        <CaretUpFill />
                      ) : (
                        <CaretDownFill />
                      )}
                      {onesKpis[index]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Row>
          <Row>
            <h4>Node</h4>
            <table>
              <tbody>
                {hudNodeData.map((item) => (
                  <tr key={`${item.name}`}>
                    <td key="nodename" id="name"> {item.name} </td>
                    <td key="nodekpi" id="kpi"> {item.kpi} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Row>
        </Col>
      </Row>
      <Col xs={12} xxl={7}></Col>
    </Container>
  );
}
