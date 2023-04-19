// import '../styles/thumb.css';
import "styles/style.css";
import "styles/submit.css";
import "components/Funnel/funnel.css";
// import * as Sentry from "@sentry/nextjs";

// import { useState, useEffect } from "react";
// import Router, { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
  // Sentry.init({
  //   dsn: "http://aa1d4b16f91e4771a72c6e45ecd85ea4@sentry.kpm.codes:9000/2",
  //
  //   // We recommend adjusting this value in production, or using tracesSampler
  //   // for finer control
  //   tracesSampleRate: 1.0,
  // });
  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const handleStart = () => {
  //     // if (url === "<root_to_show_loading>") {
  //     // alert("lol");
  //     // setIsLoading(true);
  //     // }
  //   };
  //   const handleComplete = () => {
  //     // if (url === "<root_to_show_loading") {
  //     // setIsLoading(false);
  //     // }
  //   };
  //   Router.events.on("routeChangeStart", handleStart);
  //   Router.events.on("routeChangeComplete", handleComplete);
  //   Router.events.on("routeChangeError", handleComplete);
  //   return () => {
  //     Router.events.off("routeChangeStart", handleStart);
  //     Router.events.off("routeChangeComplete", handleComplete);
  //     Router.events.off("routeChangeError", handleComplete);
  //   };
  // }, []);
  return (
    <div class="app">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css"
      />
      {/* <link */}
      {/*   rel="stylesheet" */}
      {/*   href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" */}
      {/* /> */}
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
// {isLoading ? (
//   <h1 style="background:red">Loading...</h1>
// ) : (
// )}
