import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ToastProvider } from "../providers/ToasterProvider";

export default function App({ Component, pageProps }: AppProps) {

  return(
    <>
      <ToastProvider />
      <Component {...pageProps} />
    </>
  ) 
}
