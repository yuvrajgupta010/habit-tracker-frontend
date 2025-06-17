import AddHabit from "@/components/AddHabit/AddHabit";
import EditHabit from "@/components/EditHabit/EditHabit";
import DashboardLayout from "@/components/Layouts/DashboardPage";
import Seo from "@/components/Seo";
import React from "react";

const AddHabitPage = () => {
  return (
    <DashboardLayout>
      <Seo title="Edit Habit" />
      <EditHabit />
    </DashboardLayout>
  );
};

export default AddHabitPage;
