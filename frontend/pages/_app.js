import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { AppShell, Navbar, Header } from '@mantine/core';
import { HeaderSimple } from '../components/navbar';
import { NotificationsProvider } from '@mantine/notifications';
import { storeWrapper } from "../store";
import { store, wrapper } from "../store/";
import { Provider } from "react-redux";

function App({ Component, pageProps }) {

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

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
      <NotificationsProvider>
      <Provider store={store}>

      <AppShell
      padding="md"
      header={<Header height={60} p="xs"> <HeaderSimple/></Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}>

      <Component {...pageProps} />
 
      </AppShell>
      </Provider>
      </NotificationsProvider>

      </MantineProvider>
    </>
  );
}

export default wrapper.withRedux(App);
