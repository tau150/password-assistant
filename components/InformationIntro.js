import * as React from 'react'
import Image from "next/image"
import { FormattedMessage } from 'react-intl'
import { Box, Heading, Flex, Text, Checkbox } from '@chakra-ui/react'

import { useStepsWizard } from '../contexts/stepWizardContext'
import headImage from '../public/images/head.png'
import boxImage from '../public/images/box.png'
import logo from '../public/images/key_openbank.png'

function InformationIntro(){
  const [checkedAge, setCheckedAge] = React.useState(false)

  const { setIsStepDisabled } = useStepsWizard()

  React.useEffect( () => {
    setIsStepDisabled(!checkedAge)
  }, [checkedAge])

  return (
    <Box as='section'>
        <Heading textAlign='center' as='h1' fontSize='3xl' color='brand.primary' mb={4}>
          <FormattedMessage id='welcomeTitle' defaultMessage='Welcome to your OpenClose Account'/>
        </Heading>
        <Box textAlign='center'>
          <Image width='70px' height='50px' src={logo} alt='openbank logo'/>
        </Box>
      <Box as='article' py={8} px={20}>
        <Heading as='h2' fontSize='3xl'>
          <FormattedMessage id='step1Title' defaultMessage='Create your Password Manager'/>
        </Heading>
        <Flex mt={8} w='100%'>
           <Flex w='50%' flexDir='column' alignItems='center'>
            <Image src={headImage} alt='head'/>
            <Text w='50%' textAlign='center'>
              <FormattedMessage id='descSave' defaultMessage='Save here all your passwords, data, or any information, forget paper notes and unprotected applications'/>
            </Text>
           </Flex>
           <Flex w='50%' flexDir='column' alignItems='center'>
            <Image src={boxImage} alt='vault'/>
            <Text w='50%' textAlign='center'>
              <FormattedMessage id='descCreate' defaultMessage='Create your master password: only you can access your secrets with it'/>
            </Text>
           </Flex>
        </Flex>
        <Heading mt={20} as='h3' fontSize='2xl'>
          <FormattedMessage id='howWorksTitle' defaultMessage='How it works'/>
        </Heading>
        <Text mt={6} maxW='60%'>
          <FormattedMessage
            id='howWorksDesc'
            defaultMessage='First, you must create a different password for your electronic belongings. You will not be able to recover your password, so remember it well.'/>
        </Text>
        <Heading mt={20} as='h3' fontSize='2xl'>
          <FormattedMessage id='dataToSaveTitle' defaultMessage='What data can you save'/>
        </Heading>
        <Text mt={6} maxW='60%'>
          <FormattedMessage
            id='dataToSaveDesc'
            defaultMessage='For example, the number of your card, the PIN and PUK of your mobile phone, the serial number of one of your devices or any information that you need to have in a safe place.'/>
        </Text>
        <Heading mt={20} as='h3' fontSize='2xl'>
          <FormattedMessage id='howToContinue' defaultMessage='How to continue'/>
        </Heading>
        <Text mt={6} maxW='60%'>
          <FormattedMessage
            id='howToContinueDesc'
            defaultMessage='In order to continue you must be over 18 years old, so you will have to confirm it with the check below. Then you must choose your master password that meets the minimum security requirements, confirm it and, if you wish, indicate a recovery track.'/>
        </Text>
        <Checkbox mt={12} onChange={(e) => setCheckedAge(e.target.checked)}>
          <FormattedMessage id='ageConfirmation' defaultMessage='I confirm that I am at least 18 years old'/>
        </Checkbox>
      </Box>
    </Box>
  )
}

export default InformationIntro