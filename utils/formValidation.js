import { validationKeys, validationsI18nReferences } from "../constants/validations"

const regexpAtLeastOneUpperLetter = /^(?=.*[A-Z])/
const regexAtLeastOneSymbol = /(?=.*\W)/

const validationsMap = {
  [validationKeys.MIN] : (value, reference) => value.length > reference,
  [validationKeys.MAX] : (value, reference) => value.length < reference,
  [validationKeys.ONE_UPPER]: (value) => regexpAtLeastOneUpperLetter.test(value),
  [validationKeys.ONE_SYMBOL]: (value) => regexAtLeastOneSymbol.test(value),
  [validationKeys.EQUAL]: (value, reference) => value === reference
}

export function validateInput(value, validations){
  return validations.reduce( (acc, validation) => {

    const noValidation = !validationsMap[validation.type]
    const isNotValid = !validationsMap[validation.type]?.(value, validation?.reference)

    if(noValidation || isNotValid){
      const errors = acc.errors?.length > 0 ? [...acc.errors, validation.type] : [validation.type]
      return {...acc, errors, isValid: false}
    }else{
      return {...acc, isValid: !acc.errors, validTypes: [...acc.validTypes, validation.type]}
    }
  }, {errors: null, validTypes: [], isValid: false})
}

export function extractI18nConfig(validations){
  return validations.map( validation => {
    return {
      type: validation.type,
      i18nId: validationsI18nReferences[validation.type].id,
      i18nValue: validation.reference,
      i18nVariable: validationsI18nReferences[validation.type].variable
    }
  })
}

