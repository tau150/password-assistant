import * as React from 'react'
import PropTypes from 'prop-types'
import { Badge, Box, Flex } from '@chakra-ui/react'

function StepsIndicator({stepsNumber, activeStep}){
  const arrayOfSteps = Array.from(Array(stepsNumber), (_, idx) => idx + 1)

  return (
    <Flex alignItems='center' position='relative'>
      {arrayOfSteps.map(number => (
        <Box key={number} position='relative'>
          {number !== stepsNumber && <Box left='20px' top='calc(50% - 2.5px)' zIndex='-1' position='absolute' as='span' w='100px' h='5px' bgColor='brand.accent'/>}
          <Badge
            fontSize='18px'
            w={activeStep === number ? "40px" : '30px'}
            h={activeStep === number ? "40px" : '30px'}
            borderRadius='50%'
            d='flex'
            justifyContent='center'
            alignItems='center'
            color='white'
            bgColor={activeStep === number ? "brand.secondary" : 'brand.accent'}
            boxShadow={activeStep === number ? "lg" : 'initial'}
            role="status"
            aria-label={`${number} ${activeStep === number ? 'is active' : ''}`}
            m='20px'
            position='relative'
            zIndex={3}
            key={number}>
              {number}
          </Badge>
        </Box>))}

    </Flex>
  )
}

StepsIndicator.propTypes = {
  stepsNumber: PropTypes.number,
  activeStep: PropTypes.number
}

export default StepsIndicator