import * as React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Flex, Spinner } from '@chakra-ui/react'

import { useStepsWizard } from '../../contexts/stepWizardContext'
import Button from '../ui/Button'

function WizardFooter({onClickNext, onClickBack, nextButtonTextId, shouldHideBackButton}){
  const { handlePrevStep, handleNextStep, isStepDisabled, currentStep, isLastStep, numberOfSteps } = useStepsWizard()
  const [isLoading, setIsLoading] = React.useState(false)
  const isPrevDisabled = currentStep === 0;


  React.useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        if(!isStepDisabled && numberOfSteps > (currentStep + 1) ){
          handleClickNext()
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [isStepDisabled, currentStep]);


  const handleClickNext = async () => {
    if(onClickNext){
      setIsLoading(true)
      await onClickNext()
      setIsLoading(false)
      }
      if(!isLastStep){
        handleNextStep()
      }
    }

  const handleClickBack = async () => {
    if(onClickBack){
      setIsLoading(true)
      await onClickBack()
      setIsLoading(false)
      }
    handlePrevStep()
  }

  return (
    <Flex as='footer' borderTop='1px' borderColor='gray.200' py={[2, 12]} px={[2, 36]} alignItems={'center'} justifyContent={shouldHideBackButton ? 'flex-end' : 'space-between'}>
      {!shouldHideBackButton && (
      <Button aria-label='prev-button' variant="secondary" disabled={isPrevDisabled} onClick={handleClickBack}>
        <FormattedMessage  id='cancel' defaultMessage='Cancel'/>
      </Button>
      )}
      <Button aria-label='next-button' variant="primary" disabled={isStepDisabled || isLoading} onClick={handleClickNext}>
       {isLoading ? (<Spinner
          data-testid='loading-spinner'
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="gray.500"
          size="md"
        />) :
        <FormattedMessage id={nextButtonTextId} defaultMessage='Next'/>}
      </Button>
    </Flex>
  )
}

WizardFooter.defaultProps = {
  nextButtonTextId: 'next',
  shouldHideBackButton: false
},

WizardFooter.propTypes = {
  onClickNext: PropTypes.func,
  onClickBack: PropTypes.func,
  nextButtonText: PropTypes.string,
  shouldHideBackButton: PropTypes.bool
}

export default WizardFooter