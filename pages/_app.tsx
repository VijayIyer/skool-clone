import MuiThemeProvider from "@/components/theme";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ['latin'],
  variable: '--font-roboto'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
    <MuiThemeProvider>
      <Component {...pageProps} />
    </MuiThemeProvider>
    </>
  );
}
