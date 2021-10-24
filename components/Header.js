import * as React from 'react'
import Image from "next/image"
import { useRouter } from 'next/dist/client/router'
import { FormattedMessage } from 'react-intl'
import { Flex, FormControl, FormLabel, Select, Box } from '@chakra-ui/react'

function Header(){
  const router = useRouter()
  const { locale } = router

  const handleLangChange = (e) => {
    const { value: locale } = e.target
    router.push(router.asPath, router.asPath, { locale })
  }

  return (
    <Flex as='header' bgColor='blue.100' justifyContent='space-between' alignItems='center' py={4} px={8}>
      <Box width={['40%', '10%' ]}h='40px' position='relative' zIndex='2'>
        <Image layout="fill" objectFit="contain" src="https://www.openbank.es/assets/logo_topbar/Logo_Cancer_Mama_Web_3.svg" alt='openbank logo'/>
      </Box>
      <FormControl m={0} id="lang" d='flex' alignItems='center' w={['50%', '15%']}>
        <FormLabel my={0} color='brand.secondary' minW='80px'>
          <FormattedMessage id='language' defaultMessage='Language' />
        </FormLabel>
        <Select borderColor='brand.secondary' value={locale} onChange={handleLangChange} aria-label='language-selector'>
          <option value="es">ES</option>
          <option value="en">EN</option>
        </Select>
      </FormControl>
    </Flex>
  )
}
export default Header