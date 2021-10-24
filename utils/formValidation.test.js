import  { validateInput } from './formValidation'

describe('Validate Input test', () => {
  it('it should add the unknown key as error when the validation does not exist', () => {
    const valueToEvaluate = '124'
    const validationType = 'random-type'
    const validations = [{type: validationType}]
    const result = validateInput(valueToEvaluate, validations)
    expect(result).toEqual({isValid: false, errors: [validationType], validTypes: []})
  })

  it('it should return the correct when all validations fails, except max', () => {
    const valueToEvaluate = '124'

    const validations = [
      {type: 'min', reference: 8},
      {type: 'max', reference: 12},
      {type: 'oneUpper'},
      {type: 'oneSymbol'},
      {type: 'equal', reference: 'fake_value'},
    ]
    const result = validateInput(valueToEvaluate, validations)
    expect(result).toEqual({isValid: false, errors: ['min','oneUpper', 'oneSymbol', 'equal'], validTypes: ['max']})
  })


  it('it should return the correct when all validations pass', () => {
    const valueToEvaluate = '1245678L?'

    const validations = [
      {type: 'min', reference: 8},
      {type: 'max', reference: 12},
      {type: 'oneUpper'},
      {type: 'oneSymbol'},
      {type: 'equal', reference: valueToEvaluate},
    ]
    const result = validateInput(valueToEvaluate, validations)
    expect(result).toEqual({isValid: true, errors: null, validTypes: ['min', 'max', 'oneUpper', 'oneSymbol', 'equal']})
  })
})