import { React, useState, useEffect, useRef } from "react";
import "./dashboard.scss";
import "./responsive.scss";
import Hud from "./hud";
import Nodes from "./nodes";
import { Container, Row, Col, Nav, Navbar, NavbarProps } from "react-bootstrap";
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
} from "kbar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bell, Search, JournalText, Calendar } from "react-bootstrap-icons";
import { Doughnut } from "react-chartjs-2";
import userImages from "./assets/images/images";
import Animations from "./animations";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  let content = require("./dummy-data.json");
  let userData = [...content.users];

  const actions = [
    {
      id: "notifications",
      name: "Notifications",
      shortcut: ["n"],
      keywords: "notifications",
      perform: () => (window.location.pathname = ""),
    },
    {
      id: "ones",
      name: "ONEs",
      shortcut: ["o"],
      keywords: "ones",
      perform: () => (window.location.pathname = ""),
    },
    {
      id: "metrics",
      name: "View All Metrics",
      shortcut: ["v"],
      keywords: "metrics",
      perform: () => (window.location.pathname = ""),
    },
  ];

  function userKPI(name, kpi) {
    const data = {
      datasets: [
        {
          label: { name },
          data: [kpi, 1.1 - kpi],
          backgroundColor: [kpi >= 0.65 ? "	#5F8575" : "#AA4A44", "transparent"],
          borderColor: "transparent",
          cutout: "90%",
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        autoPadding: false,
        padding: 10,
      },
    };
    return <Doughnut data={data} width={70} height={70} options={options}/>;
  }

  function RenderResults() {
    const { results } = useMatches();

    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            <div>{item}</div>
          ) : (
            <div
              style={{
                background: active ? "darkgray" : "white",
                padding: "20%",
                listStyleType: "none",
                fontFamily: "Noli",
                fontWeight: "400",
                color: active ? "white" : "black",
                position: "sticky",
              }}
            >
              {item.name}
            </div>
          )
        }
      />
    );
  }

  return (
    <KBarProvider key="kbar" actions={actions}>
      <KBarPortal>
        <KBarPositioner>
          <KBarAnimator>
            <KBarSearch />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      <Container fluid className="wrapper">
        <Navbar className="userNav" fixed="bottom" expand="xxl">
          {userData.map((item, index) => (
            <Nav.Item key={`${item.name}`}>
              {index !== 0 ? userKPI(item.name, item.kpi) : null}
            </Nav.Item>
          ))}
          {userImages.map((img, index) => (
            <img
              src={index !== 0 ? img : null}
              id={`img${index}`}
              key={`img${index}`}
            />
          ))}
          <hr />
          <Nav.Item key="activeUser" id="activeUser">
            <button className="userNotifs">
              <span id="badge" className="p-1 bg-danger rounded-circle">
                <span className="visually-hidden">New alerts</span>
              </span>
              <Bell id="icon" />
            </button>
            <button className="search">
              <Search id="icon" />
            </button>
            <button className="notes">
              <JournalText id="icon" />
            </button>
            <button className="calendar">
              <span id="badge" className="p-1 bg-danger rounded-circle">
                <span className="visually-hidden">Calendar alerts</span>
              </span>
              <Calendar id="icon" />
            </button>
            <img src={userImages[0]} id={`img0`} />
          </Nav.Item>
        </Navbar>
        <Row>
          <Col xs={12} xxl={5}>
            <Hud content={content} />
          </Col>
          <Col xs={12} xxl={7}>
            <Animations />
            <Nodes content={content} />
          </Col>
        </Row>
      </Container>
    </KBarProvider>
  );
}
