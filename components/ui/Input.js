import * as React from 'react'
import PropTypes from 'prop-types'
import { Eye, EyeOff, Check } from "react-feather"
import { FormattedMessage } from 'react-intl'
import { Info } from "react-feather"
import { FormControl, FormLabel, FormHelperText, InputGroup, Input as CHInput, Tooltip, InputRightElement, Icon, Box, Text } from '@chakra-ui/react'

import { validateInput, extractI18nConfig } from '../../utils/formValidation'

function getLabelColor(errors, validTypes, type) {
  if(!errors && !validTypes){
    return 'gray.500'
  }
  if(errors?.includes(type)){
    return 'red.300'
  }
  if(validTypes.includes(type)){
    return 'green.300'
  }

}
function Input(props){
  const { name, id, label, handleOnChange, placeholder, validations, type,
    tooltipText, ariaTooltip, shouldCountChars, shouldToggleShow, inputLimit } = props

  const [show, setShow] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [isFocused, setIsFocused] = React.useState(false)
  const [errors, setErrors] = React.useState(null)
  const [isValid, setIsValid] = React.useState(true)
  const [validTypes, setValidTypes] = React.useState(null)

  const handleInputOnChange = (e) => {
    const { value } = e.target
    let isValidInput = true

    if(validations){
      const { isValid: successValidation, errors, validTypes} = validateInput(value, validations)
      isValidInput = successValidation
      setErrors(errors)
      setIsValid(isValidInput)
      setValidTypes(validTypes)
    }
    if(shouldCountChars && (inputLimit < value.length)){
      return
    }
    setInputValue(value)
    handleOnChange?.(e, isValidInput)
  }

  const handleClick = () => setShow(!show)
  const validationReferences = validations ? extractI18nConfig(validations) : null

  const showErrorMessages = (isFocused || !isValid) && validationReferences
  const showValidTick = isValid && !errors?.length && inputValue && validations

  return (
    <FormControl isInvalid={!isValid}>
      <FormLabel htmlFor={id} d='flex' alignItems='center'>
        {label}
        {tooltipText && (<Tooltip
          hasArrow placement='top'
          label={tooltipText}
          aria-label={ariaTooltip}>
            <Icon ml={2} color='blue.500' as={Info} />
          </Tooltip>)}
        </FormLabel>
        <InputGroup size="md" position='relative'>
        <CHInput
          id={id}
          name={name}
          value={inputValue}
          pr="4.5rem"
          type={shouldToggleShow ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          onChange={handleInputOnChange}
          onFocus={()=> setIsFocused(true)}
          onBlur={()=> setIsFocused(false)}
        />
        <InputRightElement width="4.5rem">
          {shouldToggleShow && (
            show ? <Icon as={EyeOff} onClick={handleClick}/> : <Icon as={Eye} onClick={handleClick}/>
          )}
        </InputRightElement>
        {showValidTick && <Icon right='-40px' position='absolute' m={4} as={Check} color='green.400' />}
      </InputGroup>
      {shouldCountChars && <FormHelperText textAlign='right'>{`${inputValue.length}/${inputLimit}`}</FormHelperText>}
      {showErrorMessages && (
        <Box mt={2} px={2} py={1} bgColor='gray.100' position='absolute'>
          {validationReferences?.map(validation => <Text mt={1} color={getLabelColor(errors, validTypes, validation.type)} key={validation.type}>
           <FormattedMessage id={validation.i18nId} defaultMessage={validation.defaultMessage} values={{ [validation.i18nVariable]: validation.i18nValue }}/>
          </Text>)}
      </Box>
      )}
    </FormControl>
  )
}

Input.defaultProps = {
  inputLimit: 60,
  shouldCountChars: false,
  shouldToggleShow: false,
  type: 'text'
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  shouldToggleShow: PropTypes.bool,
  shouldCountChars: PropTypes.bool,
  inputLimit: PropTypes.number,
  type: PropTypes.string,
  validations: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    reference: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }))
}

export default Input