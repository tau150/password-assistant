import * as React from 'react'
import PropTypes from 'prop-types'
import { Button as CKButton,  useTheme } from '@chakra-ui/react'

import { buttonsVariants } from '../../constants/ui'

function Button(props){
  const theme = useTheme()

  const bgColorMap = {
    [buttonsVariants.PRIMARY]: theme.colors.brand.secondary,
    [buttonsVariants.SECONDARY]: theme.colors.transparent,
  }
  const colorMap = {
    [buttonsVariants.PRIMARY]: theme.colors.white,
    [buttonsVariants.SECONDARY]: theme.colors.secondary,
  }

  return (
    <CKButton
      bgColor={!props.disabled && bgColorMap[props.variant]}
      color={!props.disabled && colorMap[props.variant]}
      _hover={ props.variant === buttonsVariants.SECONDARY && !props.disabled ? {backgroundColor: 'gray.400', color: 'gray.100'} : null}
      {...props}>
      {props.children}
    </CKButton>
  )
}


Button.defaultProps = {
  variant: 'primary'
}

Button.propTypes = {
   /**
   * Button variant, you can still pass the chakra ui variants and colorSchemas
   * @default 'primary'
   */
  variant: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node
}

export default Button