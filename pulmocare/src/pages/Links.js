import React from 'react'
import Script from 'next/script'
function Links() {
  return (
<>
  <meta charSet="utf-8" />
  <meta httpEquiv="x-ua-compatible" content="ie=edge" />
  <title>Vicodin - Medical eCommerce HTML Template</title>
  <meta name="robots" content="noindex, follow" />
  <meta name="description" content="" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />
  {/* Place favicon.png in the root directory */}
  <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon" />
  {/* Font Icons css */}
  <link rel="stylesheet" href="css/font-icons.css" />
  {/* plugins css */}
  <link rel="stylesheet" href="css/plugins.css" />
  {/* Main Stylesheet */}
  <link rel="stylesheet" href="css/style.css" />
  {/* Responsive css */}
  <link rel="stylesheet" href="css/responsive.css" />

  <Script src="js/plugins.js"></Script>

    <Script src="js/main.js"></Script>
  
</>

  )
}

export default Links