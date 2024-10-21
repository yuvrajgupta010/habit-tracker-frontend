import Dashboard from "@/components/Dashboard/Dashboard";
import DashboardLayout from "@/components/Layouts/DashboardPage";
import Seo from "@/components/Seo";
import React from "react";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Seo title="Dashboard" />
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;
