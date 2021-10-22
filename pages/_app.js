import * as React from 'react'
import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import { IntlProvider } from 'react-intl'
import { useRouter } from 'next/dist/client/router'
import intlESmessages from '../content/locale/es.json'
import intlENmessages from '../content/locale/en.json'

import theme from '../styles/theme'

function MyApp({ Component, pageProps }) {

  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split("-") : ["en"];

  const langs = {
    es: intlESmessages,
    en: intlENmessages
  }
  const messages = langs[shortLocale]

  return (
    <IntlProvider
      locale={shortLocale}
      messages={messages}
      onError={() => null}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps}/>
      </ChakraProvider>
    </IntlProvider>
  )
}
export default MyApp
