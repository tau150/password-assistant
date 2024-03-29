import * as React from 'react'
import PropTypes from 'prop-types'
import { Eye, EyeOff, Check } from "react-feather"
import { FormattedMessage } from 'react-intl'
import { Info } from "react-feather"
import { FormControl, FormLabel, FormHelperText, InputGroup, Input as CHInput, Tooltip, InputRightElement, Icon, Box, Text } from '@chakra-ui/react'

import { validateInput, extractI18nConfig } from '../../utils/formValidation'
import { status } from '../../constants/ui'
import ErrorInputLabel from './ErrorInputLabel'

function getStatus(errors, validTypes, type){
  if(!errors && !validTypes){
    return status.REGULAR
  }
  if(errors?.includes(type)){
    return status.ERROR
  }
  if(validTypes.includes(type)){
    return status.SUCCESS
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
         >
            <Icon ml={2} color='blue.500' role='tooltip' aria-label={ariaTooltip} as={Info} />
          </Tooltip>)}
        </FormLabel>
        <InputGroup size="md" position='relative'>
        <CHInput
          _placeholder={{fontSize: ['12', '16']}}
          role='input'
          aria-label={id}
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
            show ? <Icon as={EyeOff} onClick={handleClick} data-testid='eye-off'/> : <Icon as={Eye} onClick={handleClick} data-testid='eye-on'/>
          )}
        </InputRightElement>
        {showValidTick && <Icon right='-40px' position='absolute' m={4} as={Check} color='green.400' data-testid='positive-tick'/>}
      </InputGroup>
      {shouldCountChars && <FormHelperText textAlign='right'>{`${inputValue.length}/${inputLimit}`}</FormHelperText>}
      {showErrorMessages && (
        <Box mt={2} px={2} py={1} bgColor='gray.100' position='absolute' data-testid='validations-container'>
          {validationReferences?.map(validation => (
            <ErrorInputLabel key={validation.type} status={getStatus(errors, validTypes, validation.type)} >
              <FormattedMessage id={validation.i18nId} defaultMessage={validation.defaultMessage} values={{ [validation.i18nVariable]: validation.i18nValue }}/>
            </ErrorInputLabel>
            ))}
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