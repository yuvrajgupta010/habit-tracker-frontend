import Login from "@/components/Auth/Login";
import LandingPageLayout from "@/components/Layouts/LandingPageLayout";
import Seo from "@/components/Seo";
import React from "react";

const LoginPage = (props) => {
  return (
    <LandingPageLayout>
      <Seo title="Login" />
      <Login />
    </LandingPageLayout>
  );
};

export default LoginPage;
