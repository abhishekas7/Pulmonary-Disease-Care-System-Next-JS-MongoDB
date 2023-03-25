import Link from 'next/link'
import Script from 'next/script'
import React from 'react'

function Errorpage() {
  return (
    <div>
         <link
        href="assets/vendor/bootstrap/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="assets/vendor/bootstrap-icons/bootstrap-icons.css"
        rel="stylesheet"
      />
      <link
        href="assets/vendor/boxicons/css/boxicons.min.css"
        rel="stylesheet"
      />
      <link href="assets/vendor/quill/quill.snow.css" rel="stylesheet" />
      <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet" />
      <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet"/>
      <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet"/>
      <link href="assets/css/style.css" rel="stylesheet"/>
        <main>
  <div className="container">
    <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1>404</h1>
      <h2>The page you are looking for doesn't exist.</h2>
   <Link href="/">Back to home</Link>
      <img
        src="assets/img/not-found.svg"
        className="img-fluid py-5"
        alt="Page Not Found"
      />
      <div className="credits">
       Pulmocare
      </div>
    </section>
  </div>
</main>
<Script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>

<Script src="assets/js/main.js"></Script>

<Script src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.5.6/tinymce.min.js"></Script>
<Script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></Script>
<Script src="http://cdnjs.cloudflare.com/ajax/libs/tinymce/4.5.6/jquery.tinymce.min.js"></Script>
    </div>
  )
}

export default Errorpage