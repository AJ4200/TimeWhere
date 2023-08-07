import "@/styles/globals.css";
import "@/styles/loader.css";
import "@/styles/splash.css";
import "animate.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
