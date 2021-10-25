import * as React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/react'

import { status } from '../../constants/ui'

const colorsMap = {
  error: 'red.300',
  success: 'green.300',
  regular: 'gray.500'
}

function ErrorInputLabel({children, status}){
  const color = colorsMap[status]

  return (
    <Text mt={1} fontSize={[12, 16]} role="status" aria-label={status} color={color}>
      {children}
    </Text>
  )
}


ErrorInputLabel.defaultProps = {
  status: status.REGULAR
}

ErrorInputLabel.propTypes = {
  children: PropTypes.node,
  status: PropTypes.oneOf(['regular', 'error', 'success'])
}


export default ErrorInputLabel