import { EmptyLayout } from 'components/layout';
import { AppPropsWithLayout } from 'models/common';
import './globals.css';
import { Provider } from 'react-redux';
import store from 'app/store';
import React from 'react';

function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default App;
