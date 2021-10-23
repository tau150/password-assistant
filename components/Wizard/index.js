import * as React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@chakra-ui/react'

import { StepWizardContext } from '../../contexts/stepWizardContext'
import StepsIndicator from './StepsIndicator'
import WizardFooter from './WizardFooter'

function Wizard(props){
  const { children, startStep } = props

  const [currentStep, setCurrentStep] = React.useState(startStep)
  const [isStepDisabled, setIsStepDisabled] = React.useState(false)

  const stepsNumberBasedOnChildren = React.Children.count(children);

  const handleNextStep = () => {
    setCurrentStep( prev => prev += 1)
  }

  const handlePrevStep = () => {
    setCurrentStep( prev => prev -= 1)
  }

  const arrayOfChildren = React.Children.toArray(children);
  const currentContent = arrayOfChildren[currentStep];

  const value = {
    currentStep,
    setCurrentStep,
    setIsStepDisabled
  }

  React.useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        if(!isStepDisabled){
          handleNextStep()
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [isStepDisabled]);

  const isPrevDisabled = currentStep === 0

  return (
    <StepWizardContext.Provider value={value}>
      <Box border='1px solid brand.accent' boxShadow='lg'>
        <Flex as='header' position='relative' zIndex='2' h='80px' bgColor='gray.200' alignItems='center' justifyContent='center' boxShadow='md'>
          <StepsIndicator stepsNumber={stepsNumberBasedOnChildren} activeStep={currentStep + 1}/>
        </Flex>
        <Box p='4'>
          {currentContent}
        </Box>
        <WizardFooter isPrevDisabled={isPrevDisabled} handlePrevStep={handlePrevStep} isStepDisabled={isStepDisabled} handleNextStep={handleNextStep}/>
      </Box>
    </StepWizardContext.Provider>
  )
}


Wizard.defaultProps = {
  startStep: 0
}


Wizard.propTypes = {
  children: PropTypes.node,
  stepsNumber: PropTypes.number,
  startStep: PropTypes.number
}

export default Wizard