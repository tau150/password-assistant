import * as React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, Icon, Text, Heading } from '@chakra-ui/react'
import { CheckCircle, AlertTriangle } from 'react-feather'

function StatusCard({variant, title, body}){

  const icon = {
    'error': AlertTriangle,
    'success': CheckCircle
  }

  return (
    <Flex h='120px' alignItems='center'  border='1px' boxShadow='md' borderColor='gray.200' justifyContent='center'>
     <Icon fontSize={32} as={icon[variant]} />
    <Box ml={[4, 8]}>
      <Heading as='h4' fontSize={[18, 36]}>{title}</Heading>
      <Text fontSize={[12, 18]}>{body}</Text>
    </Box>
   </Flex>
  )
}

StatusCard.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string
}

export default StatusCard;