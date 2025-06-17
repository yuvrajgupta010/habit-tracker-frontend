import React from "react";
import Header from "../Header/Header";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import style from "./DashboardPage.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import PerfectScrollBar from "react-perfect-scrollbar";
import { useAuthCtx } from "@/context/AuthCtx";
import Seo from "../Seo";
import CustomSpinner from "../UI/CustomSpinner";
import { getGreeting } from "@/utils/helpers";

const DashboardLayout = (props) => {
  const router = useRouter();
  const { isAuthenticated, userDetails } = useAuthCtx();

  if (!isAuthenticated && !userDetails) {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <Seo />
        <CustomSpinner />
      </div>
    );
  }

  const { pathname } = router;
  return (
    <div className={`${style["dashboard"]}`}>
      <Header />
      <main className={`${style["main"]} row`}>
        <Card className="col-3 rounded-0 p-0">
          <Card.Body className="p-0">
            <Card.Title className="text-center px-3 pt-2 text-wrap text-primary">
              {getGreeting()}!&nbsp;{userDetails?.fullName}
            </Card.Title>
            <ListGroup className="br-0">
              <ListGroup.Item
                action
                as={Link}
                active={pathname === "/dashboard"}
                href="/dashboard"
                className="border-0 rounded-0 px-4 fs-5"
              >
                <span className="me-2 text-primay">
                  <i className="bi bi-columns"></i>
                </span>{" "}
                <span className="">Dashboard</span>
              </ListGroup.Item>
              <ListGroup.Item
                action
                as={Link}
                active={pathname === "/add-habit"}
                href="/add-habit"
                className="border-0 rounded-0 px-4 fs-5"
              >
                <span className="me-2 text-primar">
                  <i className="bi bi-plus-lg"></i>
                </span>{" "}
                <span className="">Add Habit</span>
              </ListGroup.Item>
              <ListGroup.Item
                action
                as={Link}
                active={pathname === "/manage-habit"}
                href="/manage-habit"
                className="border-0 rounded-0 px-4 fs-5"
              >
                <span className="me-2 text-primar">
                  <i className="bi bi-list-ul"></i>
                </span>{" "}
                <span className="">Manage Habits</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <div className="col-9 p-0 overflow-hidden">{props.children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
