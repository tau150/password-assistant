
import * as React from 'react'
import {   render as rtlRender } from '@testing-library/react'
import { IntlProvider } from 'react-intl';
import { ChakraProvider } from "@chakra-ui/react"

import theme from '../styles/theme';
import intlENmessages from '../content/locale/en.json'

function AppProviders({children}){
  return (
    <IntlProvider
      locale='en'
      messages={intlENmessages}
      onError={() => null}>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </IntlProvider>
  )
}


export function render(ui, ...renderOptions){
  const returnValue = {
    ...rtlRender(ui, {wrapper: AppProviders, ...renderOptions}),
  }
  return returnValue
}
