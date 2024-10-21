import React from "react";
import Head from "next/head";

const Seo = ({ title = "Stay Consistent, Achieve More" }) => {
  let i = `Habit Tracker - ${title}`;
  return (
    <Head>
      <title>{i}</title>
      <meta
        name="author"
        content="Yuvraj Gupta, Software Developer, Yuvrajgupta036@gmail.com"
      />
      <meta name="title" content={i} />
    </Head>
  );
};

export default Seo;
