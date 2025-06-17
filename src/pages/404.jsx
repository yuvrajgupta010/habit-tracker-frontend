import Seo from "@/components/Seo";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <>
      <Seo title="Page not found" />
      <div
        className="d-flex justify-content-center
      align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="col-md-12 text-center">
          <p className="fs-2 fw-medium">Habit Tracker</p>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, the page you are looking for does not exist.</p>
          <Link
            className="
          btn btn-primary shadow-sm rounded-pill"
            href={"/"}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
