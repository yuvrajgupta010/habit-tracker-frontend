import Link from "next/link";
import React from "react";

const NoHabit = () => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img
          src={"/img/empty-box.svg"}
          alt="No habits"
          className="w-25 h-25 mb-3"
        />
        <h2 className="mt-4 mb-0 text-center">No habits added yet</h2>
        <p className="fs-5 text-center">
          Start adding your habits by clicking on the &quot;Add Habit&quot;
          button.
        </p>
        <Link href={"/add-habit"} className="btn btn-primary">
          + Add Habit
        </Link>
      </div>
    </div>
  );
};

export default NoHabit;
