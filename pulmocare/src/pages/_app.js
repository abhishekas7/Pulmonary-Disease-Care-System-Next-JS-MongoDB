import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css'
import { SessionProvider } from "next-auth/react"
import '/public/css/style.css'
import '/public/css/responsive.css'
import '/public/css/font-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import  {StoreProvider} from '../util/Store'
import Script from 'next/script';
import "react-datetime/css/react-datetime.css";

import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';


export default function App({ Component,   pageProps: { session, ...pageProps }, }) {
  return (
    <>
    <SessionProvider session={session}>
    <StoreProvider>

      <Component {...pageProps} />

      <Script src="../../public/js/plugins.js" />
      <Script src="../../public/js/main.js" />


      </StoreProvider>

          </SessionProvider>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.5.6/tinymce.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/tinymce/4.5.6/jquery.tinymce.min.js"></script>
    </>
  )
}