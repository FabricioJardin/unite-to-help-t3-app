import { type AppType } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "~/ui/toaster"

import { api } from "~/utils/api"

import "~/styles/globals.css"
import Head from "next/head"
import { Inter } from "@next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Unite to help</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <style jsx global>
        {`
          html {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <main className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
        <Toaster />
      </main>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
