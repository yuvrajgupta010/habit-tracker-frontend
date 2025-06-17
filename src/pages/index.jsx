import React, { useEffect } from "react";
import LandingPageLayout from "@/components/Layouts/LandingPageLayout";
import MainContent from "@/components/Layouts/MainContent";
import Seo from "@/components/Seo";

const year = new Date().getFullYear();

export default function Home() {
  return (
    <LandingPageLayout>
      <Seo />
      <MainContent />
      <footer className="mt-auto">
        <p className="text-center text-white mb-0 fs-6">
          Copyright © {year} Yuvraj Gupta
        </p>
      </footer>
    </LandingPageLayout>
  );
}
