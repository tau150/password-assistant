import * as React from 'react'
import { Box, Select, FormControl, FormLabel, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { FormattedMessage } from 'react-intl'

import Wizard from "../components/Wizard"
import InformationIntro from '../components/InformationIntro'

export default function Index() {
  const router = useRouter()
  const { locale } = router

  function handleLangChange(e){
    const { value: locale } = e.target
    router.push(router.asPath, router.asPath, { locale })
  }


  return (
    <Box as='main' p='8'>
      <Flex as='header' mb={8} justifyContent='flex-end'>
      <FormControl w='10%' id="lang" d='flex' alignItems='center'>
        <FormLabel my={0}>
          <FormattedMessage id='language' defaultMessage='Language' />
        </FormLabel>
        <Select value={locale} onChange={handleLangChange}>
          <option value="es">ES</option>
          <option value="en">EN</option>
        </Select>
      </FormControl>
      </Flex>
      <Wizard>
          <InformationIntro />
      </Wizard>
    </Box>
  )
}
