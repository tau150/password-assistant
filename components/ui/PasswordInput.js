import * as React from 'react'
import PropTypes from 'prop-types'
import { Eye, EyeOff, Check } from "react-feather";
import { FormattedMessage, useIntl } from 'react-intl';
import { FormControl, FormLabel, InputGroup, Input, InputRightElement, Icon, Box, Text } from '@chakra-ui/react'

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
function PasswordInput(props){
  const { name, id, label, handleOnChange, placeholder, validations } = props;

  const [show, setShow] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [isFocused, setIsFocused] = React.useState(false)
  const [errors, setErrors] = React.useState(null)
  const [isValid, setIsValid] = React.useState(true)
  const [validTypes, setValidTypes] = React.useState(null)

  const handleInputOnChange = (e) => {
    const { value } = e.target;
    let isValidInput = true;
    if(validations){
      const { isValid: successValidation, errors, validTypes} = validateInput(value, validations)
      isValidInput = successValidation
      setErrors(errors)
      setIsValid(isValidInput)
      setValidTypes(validTypes)
    }
    setInputValue(value)
    handleOnChange?.(e, isValidInput)
  }

  const handleClick = () => setShow(!show)
  const validationReferences = extractI18nConfig(validations)

  return (
    <FormControl isInvalid={!isValid}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
        <InputGroup size="md" position='relative'>
        <Input
          id={id}
          name={name}
          value={inputValue}
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder={placeholder}
          onChange={handleInputOnChange}
          onFocus={()=> setIsFocused(true)}
          onBlur={()=> setIsFocused(false)}
        />
        <InputRightElement width="4.5rem">
            {show ? <Icon as={EyeOff} onClick={handleClick}/> : <Icon as={Eye} onClick={handleClick}/>}
        </InputRightElement>
        {isValid && !errors?.length && inputValue && <Icon right='-40px' position='absolute' m={4} as={Check} color='green.400' />}
      </InputGroup>
      {(isFocused || !isValid ) && (
        <Box mt={2} px={2} py={1} bgColor='gray.100' position='absolute'>
          {validationReferences?.map(validation => <Text mt={1} color={getLabelColor(errors, validTypes, validation.type)} key={validation.type}>
           <FormattedMessage id={validation.i18nId} defaultMessage={validation.defaultMessage} values={{ [validation.i18nVariable]: validation.i18nValue }}/>
          </Text>)}
      </Box>
      )}
    </FormControl>
  )
}

PasswordInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  validations: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    reference: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }))
}

export default PasswordInput