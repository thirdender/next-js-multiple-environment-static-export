import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* eslint-disable @next/next/no-sync-scripts */}
      <script src="/__ENV.js" />
      {/* eslint-enable @next/next/no-sync-scripts */}
      <Component {...pageProps} />
    </>
  );
}
