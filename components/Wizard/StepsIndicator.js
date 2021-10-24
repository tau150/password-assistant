import * as React from 'react'
import PropTypes from 'prop-types'
import { Badge, Box, Flex, Icon } from '@chakra-ui/react'
import { Check } from 'react-feather'

function getBgColor(activeStep, number, isFinished){
  if((activeStep > number || isFinished)){
    return "red.500"
  }
  if(activeStep === number){
    return "brand.secondary"
  }
  return 'brand.accent'
}
function StepsIndicator({stepsNumber, activeStep, isFinished}){
  const arrayOfSteps = Array.from(Array(stepsNumber), (_, idx) => idx + 1)

  return (
    <Flex alignItems='center' position='relative'>
      {arrayOfSteps.map(number => (
        <Box key={number} position='relative'>
          {number !== stepsNumber && (
            <Box
              left='20px'
              top='calc(50% - 2.5px)'
              zIndex='-1'
              position='absolute'
              as='span'
              w='100px'
              h='5px'
              bgColor={((number !== stepsNumber && activeStep > number)) ? 'red.500' : 'brand.accent'}
            />)}
          <Badge
            fontSize='18px'
            w={activeStep === number ? "40px" : '30px'}
            h={activeStep === number ? "40px" : '30px'}
            borderRadius='50%'
            d='flex'
            justifyContent='center'
            alignItems='center'
            color='white'
            bgColor={getBgColor(activeStep, number, isFinished)}
            boxShadow={activeStep === number ? "lg" : 'initial'}
            role="status"
            aria-label={`${number} ${activeStep === number ? 'is active' : ''}`}
            m='20px'
            position='relative'
            zIndex={3}
            key={number}>
              {(activeStep > number) || isFinished ? <Icon as={Check} /> : number}
          </Badge>
        </Box>))}

    </Flex>
  )
}

StepsIndicator.propTypes = {
  stepsNumber: PropTypes.number,
  activeStep: PropTypes.number,
  isFinished: PropTypes.bool
}

export default StepsIndicator