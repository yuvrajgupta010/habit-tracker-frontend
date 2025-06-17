import React from "react";
import Spinner from "react-bootstrap/Spinner";

const CustomSpinner = ({ width = "100px", height = "100px" }) => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="primary" style={{ width, height }} />
    </div>
  );
};

export default CustomSpinner;
