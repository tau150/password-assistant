import * as React from 'react'
import { Box } from '@chakra-ui/react'

import Wizard from "../components/Wizard"
import InformationIntro from '../components/InformationIntro'
import PasswordCreationForm from '../components/PasswordCreationForm'
import ResponseStatus from '../components/ResponseStatus'
import Header from '../components/Header'

export default function Index() {
  const [passwordResponse, setPasswordResponse] = React.useState(null)

  return (
    <Box>
      <Header/>
      <Box as='main' p='8'>
        <Wizard>
          <InformationIntro />
          <PasswordCreationForm setPasswordResponse={setPasswordResponse} />
          <ResponseStatus status={passwordResponse} />
        </Wizard>
      </Box>
    </Box>
  )
}
