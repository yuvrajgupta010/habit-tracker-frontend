import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        />
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossorigin="anonymous"
        ></script>

        <meta
          name="author"
          content="Yuvraj Gupta, Software Developer, Yuvrajgupta036@gmail.com"
        />
        <meta
          name="title"
          content={"Habit Tracker - Stay Consistent, Achieve More"}
        />
        <link
          rel="canonical"
          href="https://habit-tracker.yuvrajgupta.in/"
        ></link>
        <meta
          name="description"
          content="Track your daily habits, build consistency, and achieve your goals with our Habit Tracker web app. Stay on top of your routines and create lasting changes!"
        />

        {/* <!-- Open Graph / Facebook -- /> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://habit-tracker.yuvrajgupta.in/"
        />
        <meta
          property="og:title"
          content="Habit Tracker - Stay Consistent, Achieve More"
        />
        <meta
          property="og:description"
          content="Track your daily habits, build consistency, and achieve your goals with our Habit Tracker web app. Stay on top of your routines and create lasting changes!"
        />
        <meta
          property="og:image"
          content="https://habit-tracker.yuvrajgupta.in/img/habit-tracker-app.png"
        />

        {/* <!-- Twitter -- /> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://habit-tracker.yuvrajgupta.in/"
        />
        <meta
          property="twitter:title"
          content="Habit Tracker - Stay Consistent, Achieve More"
        />
        <meta
          property="twitter:description"
          content="Track your daily habits, build consistency, and achieve your goals with our Habit Tracker web app. Stay on top of your routines and create lasting changes!"
        />
        <meta
          property="twitter:image"
          content="https://habit-tracker.yuvrajgupta.in/img/habit-tracker-app.png"
        />

        {/* <!-- Additional Meta Tags -- /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="habit tracker, daily habits, goal tracking, productivity, self-improvement"
        />

        {/* manifest */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Habit Tracker" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <body data-bs-theme="light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
