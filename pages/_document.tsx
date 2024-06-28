import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        {/* <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Employees Management</title> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// MyDocument.getInitialProps = async (ctx: DocumentContext) => {
//   return ctx;
// };
