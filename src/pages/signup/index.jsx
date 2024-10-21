import Signup from "@/components/Auth/Signup";
import LandingPageLayout from "@/components/Layouts/LandingPageLayout";
import Seo from "@/components/Seo";
import React from "react";

const SignupPage = () => {
  return (
    <LandingPageLayout>
      <Seo title="Sign up" />
      <Signup />
    </LandingPageLayout>
  );
};

export default SignupPage;
