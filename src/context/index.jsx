import React from "react";
import AuthContextProvider from "./AuthCtx";

const AllContexStore = (props) => {
  return <AuthContextProvider>{props.children}</AuthContextProvider>;
};

export default AllContexStore;
