import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import "/public/css/style.css";
import "/public/css/responsive.css";
import "/public/css/font-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreProvider } from "../util/Store";
import Script from "next/script";
import "react-datetime/css/react-datetime.css";

import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";

import { useEffect, useState } from "react";
import { BreakpointProvider } from "react-socks";
import AOS from "aos";

import "aos/dist/aos.css";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
      
    </link>
      <BreakpointProvider>
        <SessionProvider session={session}>
          <StoreProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </StoreProvider>
        </SessionProvider>
      </BreakpointProvider>

      <Script src="../../public/js/plugins.js" />
      
      <Script src="../../public/js/main.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.5.6/tinymce.min.js"></Script>
      <Script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></Script>
    </>
  );
}
