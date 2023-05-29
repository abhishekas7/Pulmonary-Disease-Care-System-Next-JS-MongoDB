import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { SessionProvider, useSession } from 'next-auth/react';
import "/public/css/style.css";
import "/public/css/responsive.css";
import "/public/css/font-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreProvider } from "../util/Store";
import Script from "next/script";
import "react-datetime/css/react-datetime.css";
import 'animate.css';
import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";

import { useEffect, useState } from "react";
import { BreakpointProvider } from "react-socks";
import AOS from "aos";

import "aos/dist/aos.css";
import { useRouter } from "next/router";
import ReduxWrapper from "../../store";


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
    <SessionProvider session={session}>
      <BreakpointProvider>
      <ReduxWrapper>
          <StoreProvider>
          {Component.auth ? (
            
            <Auth role={Component.auth.role}>
                        <Component {...pageProps}/>
                        {/* {console.log(Component.auth)} */}
            </Auth>
            
          ) : (
            <Component {...pageProps}/>
          )}
            <ToastContainer />
          </StoreProvider> 
</ReduxWrapper>
      </BreakpointProvider>
  </SessionProvider>


    </>
  );
}
function Auth({ children, role}) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // router.push('/common/unauthorized?message=login required');
      toast.error('Login to continue')
      router.push('/login')
      
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  console.log(session.user.role)
  if (!session.user.role==='admin'&& session.user) {
    setTimeout(() => {
      toast.error('Admin login required')
    }, 10000);
    router.push('/login');
  }
  if (!session.user.role==='doctor'&& session.user) {
    setTimeout(() => {
      toast.error('Doctor login required')
    }, 10000);
    router.push('/login');

  }

  return children;
}