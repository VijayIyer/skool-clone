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

  // import MuiThemeProvider from "@/components/theme";
  // import "@/styles/globals.css";
  // import type { AppProps } from "next/app";
  // import { Roboto } from "next/font/google";

  // const roboto = Roboto({
  //   weight: ["100", "300", "400", "500", "700", "900"],
  //   subsets: ['latin'],
  //   variable: '--font-roboto'
  // })

  // export default function App({ Component, pageProps }: AppProps) {
  //   return (
  //     <>
  //       <style jsx global>{`
  //         html {
  //           font-family: ${roboto.style.fontFamily};
  //         }
  //       `}</style>
  //     <MuiThemeProvider>
  //       <Component {...pageProps} />
  //     </MuiThemeProvider>
  //     </>
  //   );
}
