export const validationKeys = {
  MIN: 'min',
  MAX: 'max',
  ONE_UPPER: 'oneUpper',
  ONE_SYMBOL: 'oneSymbol',
  EQUAL: 'equal'
}

export const validationsI18nReferences = {
  [validationKeys.MIN] : {
    id: 'minValidation',
    variable: 'number',
    defaultMessage: 'Must contain at least {number} characters'
  },
  [validationKeys.MAX] : {
    id: 'maxValidation',
    variable: 'number',
    defaultMessage: 'Must contain maximum {number} characters'
  },
  [validationKeys.ONE_UPPER] : {
    id: 'leastUpper',
    defaultMessage: 'Must at least 1 upper characters'
  },
  [validationKeys.ONE_SYMBOL] : {
    id: 'leastSymbol',
    defaultMessage: 'Must contain at least one symbol'
  },
  [validationKeys.EQUAL] : {
    id: 'equalValidation',
    defaultMessage: 'The field does not match'
  },
}