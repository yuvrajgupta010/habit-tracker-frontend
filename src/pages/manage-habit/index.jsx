import DashboardLayout from "@/components/Layouts/DashboardPage";
import ManageHabit from "@/components/ManageHabit/ManageHabit";
import Seo from "@/components/Seo";
import React from "react";

const ManageHabitPage = () => {
  return (
    <DashboardLayout>
      <Seo title="Manage Habits" />
      <ManageHabit />
    </DashboardLayout>
  );
};

export default ManageHabitPage;
