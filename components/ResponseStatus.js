import * as React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

import { status as statusConst } from '../constants/ui'
import { useStepsWizard } from '../contexts/stepWizardContext'
import WizardFooter from './Wizard/WizardFooter'
import StatusCard from './ui/StatusCard'

function ResponseStatus({status}){
  const intl = useIntl()
  const { handlePrevStep, setCurrentStep } = useStepsWizard()

  const title = status === statusConst.SUCCESS  ?
    intl.formatMessage({ id: 'passwordCreated', defaultMessage: 'Your Password was created' }) :a
    intl.formatMessage({ id: 'passwordError', defaultMessage: 'There was an error' })
  const body = status === statusConst.SUCCESS  ?
   intl.formatMessage({ id: 'passwordCreatedDesc', defaultMessage: 'You can enjoy your Password Manager' }) :
   intl.formatMessage({ id: 'passwordErrorDesc', defaultMessage: 'We could not modified your Master Password, try again later' })

  const nextButtonTextId = status === statusConst.SUCCESS ?  'access' : 'backToManager'

  const handleClickNext = () => {
    if(status === statusConst.SUCCESS){
      setCurrentStep(0)
    }else{
      handlePrevStep()
    }
  }

  return  (
    <>
      <Flex justifyContent='center' py={24}>
        <Box w={{xs: '100%', md: '50%'}}>
          <StatusCard variant={status} title={title} body={body}/>
        </Box>
      </Flex>
      <WizardFooter
        shouldHideBackButton={true} n
        nextButtonTextId={nextButtonTextId}
        onClickNext={handleClickNext}/>
    </>
  )
}

ResponseStatus.propTypes = {
  status: PropTypes.string
}


export default ResponseStatus