import * as React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Text, Stack, Spinner, Flex} from '@chakra-ui/react'
import { FormattedMessage, useIntl } from 'react-intl'

import { submitForm } from '../pages/api/open'
import { status as statusConst } from '../constants/ui'
import { useStepsWizard } from '../contexts/stepWizardContext'
import { validationKeys } from '../constants/validations'
import WizardFooter from './Wizard/WizardFooter'
import Input from './ui/Input'


const passwordValidations = [
  {type: validationKeys.MIN, reference: 8},
  {type: validationKeys.MAX, reference: 24},
  {type: validationKeys.ONE_UPPER },
  {type: validationKeys.ONE_SYMBOL }
]

function PasswordCreationForm({setPasswordResponse}){
  const intl = useIntl()
  const { setIsStepDisabled } = useStepsWizard()


  const [,setClueInputValue] = React.useState('')
  const [passWordInputValue, setPasswordInputValue] = React.useState('')
  const [,setPasswordConfInputValue] = React.useState('')
  const [isPasswordValid, setIsPasswordValid] = React.useState(false)
  const [isPasswordConfValid, setIsPasswordConfValid] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)


  React.useEffect( () => {
    setIsStepDisabled(!isPasswordValid || !isPasswordConfValid)
  }, [isPasswordValid,isPasswordConfValid])


  const handleChangeClueInput = (e) => {
    const { value } = e.target
    if(value.length < 61){
      setClueInputValue(value)
    }
  }

  const handleChangePasswordInput = (e, isValid) => {
    const { value } = e.target
    setPasswordInputValue(value)
    setIsPasswordValid(isValid)
  }

  const handleChangePasswordConfInput = (e, isValid) => {
    const { value } = e.target
    setPasswordConfInputValue(value)
    setIsPasswordConfValid(isValid)
  }

  const onClickNext = async () => {
    setIsLoading(true)
    try {
     const res = await submitForm(passWordInputValue)
     const { status } = res
     if(status === 200){
      setPasswordResponse(statusConst.SUCCESS)
     }
    }catch(e){
      setPasswordResponse(statusConst.ERROR)
    }
  }

  return (
    <Box as='section' p={18} mt={12}>
      {isLoading ? (
        <Flex h='400px' alignItems='center' justifyContent='center'>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
      ) : (
      <>
        <Heading as='h2' fontSize='3xl'>
          <FormattedMessage id='step1Title' defaultMessage='Create your Password Manager'/>
        </Heading>
        <Text maxW={{xs: '100%', md: '50%'}} mt={8}>
          <FormattedMessage
            id='howWorksDesc'
            defaultMessage='First, you must create a different password for your electronic belongings. You will not be able to recover your password, so remember it well.'
          />
        </Text>
        <form>
          <Stack mt={12} direction={["column", "row"]} spacing={['140px', 20]}>
            <Box w={['100%', '30%']}>
              <Input
                shouldToggleShow={true}
                placeholder={intl.formatMessage({ id: 'createPasswordLabel', defaultMessage: 'Create your Master Password' })}
                name='password'
                id='password'
                label={intl.formatMessage({ id: 'createPasswordLabel', defaultMessage: 'Create your Master Password' })}
                handleOnChange={handleChangePasswordInput}
                validations={passwordValidations}
              />
            </Box>
            <Box w={['100%', '30%']}>
              <Input
                shouldToggleShow={true}
                placeholder={intl.formatMessage({ id: 'confirmPasswordLabel', defaultMessage: 'Repeat your Master Password' })}
                name='passwordConfirmation'
                id='passwordConfirmation'
                label={intl.formatMessage({ id: 'confirmPasswordLabel', defaultMessage: 'Repeat your Master Password' })}
                handleOnChange={handleChangePasswordConfInput}
                validations={[{type: validationKeys.EQUAL, reference: passWordInputValue}]}
              />
            </Box>
          </Stack>
          <Box w={['100%', '65%']} mt={36}>
            <Input
              placeholder={intl.formatMessage({ id: 'confirmPasswordLabel', defaultMessage: 'Repeat your Master Password' })}
              name='clue'
              id='clue'
              shouldCountChars={true}
              label={intl.formatMessage({ id: 'helpPasswordLabel', defaultMessage: 'Create your clue to remember your password (optional)' })}
              tooltipText={intl.formatMessage({ id: 'helpPasswordInfo', defaultMessage: 'This will help you to remember your password' })}
              ariaTooltip={intl.formatMessage({ id: 'rememberAria', defaultMessage: 'Remember Password' })}
              placeholder={intl.formatMessage({ id: 'helpPasswordPh', defaultMessage: 'Enter a clue' })}
              handleOnChange={handleChangeClueInput}
            />
          </Box>
        </form>
      </>
      )}
      <Box mt={8}>
        <WizardFooter onClickNext={onClickNext}/>
      </Box>
    </Box>
  )
}


PasswordCreationForm.propTypes = {
  setPasswordResponse: PropTypes.func
}

export default PasswordCreationForm