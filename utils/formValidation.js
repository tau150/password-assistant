import { validationKeys, validationsI18nReferences } from "../constants/validations";

const regexpAtLeastOneUpperLetter = /^(?=.*[A-Z])/;
const regexAtLeastOneSymbol = /(?=.*\W)/;

const validationsMap = {
  [validationKeys.MIN] : (value, reference) => value.length < reference,
  [validationKeys.MAX] : (value, reference) => value.length > reference,
  [validationKeys.ONE_UPPER]: (value) => !regexpAtLeastOneUpperLetter.test(value),
  [validationKeys.ONE_SYMBOL]: (value) => !regexAtLeastOneSymbol.test(value),
  [validationKeys.EQUAL]: (value, reference) => value !== reference
}

export function validateInput(value, validations){
  const errors = []
  const validTypes = []

  validations.forEach( validation => {
    if(validationsMap[validation.type](value, validation?.reference)){
      errors.push(validation.type)
    }else{
      validTypes.push(validation.type)
    }
  })

  const isValid = errors.length === 0;

  return {isValid, errors: isValid ? null : errors, validTypes};
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

