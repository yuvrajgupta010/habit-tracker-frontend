import AddHabit from "@/components/AddHabit/AddHabit";
import DashboardLayout from "@/components/Layouts/DashboardPage";
import Seo from "@/components/Seo";
import React from "react";

const AddHabitPage = () => {
  return (
    <DashboardLayout>
      <Seo title="Add Habit" />
      <AddHabit />
    </DashboardLayout>
  );
};

export default AddHabitPage;
