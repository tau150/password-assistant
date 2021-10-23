import * as React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@chakra-ui/react'

import { StepWizardContext } from '../../contexts/stepWizardContext'
import StepsIndicator from './StepsIndicator'
function Wizard({children}){
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isStepDisabled, setIsStepDisabled] = React.useState(false)

  const stepsNumberBasedOnChildren = React.Children.count(children);

  const handleNextStep = async () => {
    setCurrentStep( prev => prev += 1)
  }

  const handlePrevStep = async () => {
    setCurrentStep( prev => prev -= 1)
  }

  const arrayOfChildren = React.Children.toArray(children);
  const currentContent = arrayOfChildren[currentStep];
  const isLastStep = currentStep + 1 === stepsNumberBasedOnChildren

  const value = {
    currentStep,
    numberOfSteps: stepsNumberBasedOnChildren,
    setCurrentStep,
    setIsStepDisabled,
    isStepDisabled,
    handleNextStep,
    handlePrevStep,
    isLastStep
  }

  return (
    <StepWizardContext.Provider value={value}>
      <Box border='1px solid brand.accent' boxShadow='lg'>
        <Flex as='header' position='relative' zIndex='2' h='80px' bgColor='gray.200' alignItems='center' justifyContent='center' boxShadow='md'>
          <StepsIndicator stepsNumber={stepsNumberBasedOnChildren} activeStep={currentStep + 1}/>
        </Flex>
        <Box p='4'>
          {currentContent}
        </Box>
      </Box>
    </StepWizardContext.Provider>
  )
}


Wizard.propTypes = {
  children: PropTypes.node,
}

export default Wizard