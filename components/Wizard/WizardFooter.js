import * as React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Flex } from '@chakra-ui/react'

import Button from '../ui/Button'

function WizardFooter({ handlePrevStep, handleNextStep, isStepDisabled, isPrevDisabled}){
  return (
    <Flex as='footer' borderTop='1px' py={12} px={20} borderColor='gray.200' alignItems='center' justifyContent='space-between'>
      <Button aria-label='prev-button' variant="secondary" disabled={isPrevDisabled} onClick={handlePrevStep}>
        <FormattedMessage  id='cancel' defaultMessage='Cancel'/>
      </Button>
      <Button aria-label='next-button' variant="primary" disabled={isStepDisabled} onClick={handleNextStep}>
        <FormattedMessage id='next' defaultMessage='Next'/>
      </Button>
    </Flex>
  )
}

WizardFooter.propTypes = {
  handlePrevStep: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  isStepDisabled: PropTypes.bool,
  isPrevDisabled: PropTypes.bool
}

export default WizardFooter