import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { AppShell, Header } from '@mantine/core';
import { Navbar } from '../components/navbar';
import { NotificationsProvider } from '@mantine/notifications';
import { store, wrapper } from "../store/";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { RouteGuard } from '../services/routeguard'

function App({ Component, pageProps, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <Head>
        <title>Page title</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
      <PersistGate loading={null} persistor={store.__PERSISTOR}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
      <NotificationsProvider>

      <AppShell
      padding="md"
      header={<Navbar/>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}>

<RouteGuard>

      <Component {...pageProps} />
 </RouteGuard>
      </AppShell>
      </NotificationsProvider>

      </MantineProvider>
      </PersistGate>
      </Provider>
    </>
  );
}

export default App;
