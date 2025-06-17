import React from "react";
import style from "./LandingPage.module.css";
import { useRouter } from "next/router";

const MainContent = (props) => {
  const router = useRouter();

  const pageChangeHandler = (page) => {
    router.push(page);
  };

  return (
    <main className={` ${style["main"]}`}>
      <div>
        <p className="fs-1 m-0 text-white">
          &quot;We first make our habits,
          <br />
          then our habits make us.
        </p>
        <p className="text-end fs-4 text-white">— John Dryden</p>
      </div>
      <button
        type="button"
        className="btn btn-light rounded-5 text-primary"
        onClick={pageChangeHandler.bind(null, "/signup")}
      >
        GET STARTED
      </button>
    </main>
  );
};

export default MainContent;
