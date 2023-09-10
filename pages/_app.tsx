import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

export type PageWithoutSearchBar<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: PageWithoutSearchBar;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  //setting default layout
  function defaultLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  }
  const getLayout = Component.getLayout ?? ((page) => defaultLayout(page));
  return getLayout(<Component {...pageProps} />);
}
