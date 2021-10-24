import * as React from 'react'
import { getByLabelText, getByText, screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import { render } from '../../../test-helpers'

import Input from '../Input'


let props;

const inputName = 'testInput'
const placeholder = 'Some placeholder'
const tooltipText = 'Some tooltip text'
const ariaTooltip = 'some aria text'
const label = 'Awesome input'
const handleOnChange = jest.fn()

const minValidationMessage = 'Must contain at least 5 characters'
const upperValidationMessage = 'Must contain at least one upper characters'

beforeEach(() => {
  props = {
    type: 'text',
    shouldCountChars: false,
    shouldToggleShow: true,
    inputLimit: null,
    name: inputName,
    id: inputName,
    validations: [{type: 'min', reference: 5}, {type: 'oneUpper'}],
    inputLimit: 60,
    handleOnChange,
    ariaTooltip,
    label,
    tooltipText,
    placeholder,
  }
})


describe('Input test', () => {
  it('renders Input', () => {
    expect(render(<Input {...props} />)).toMatchSnapshot()
  })

  it('show the correct props', () => {
    render(<Input {...props} />)

    expect(screen.getByLabelText(label)).toBeInTheDocument()
    expect(screen.queryByText('0/60')).not.toBeInTheDocument()
    expect(screen.getByRole('tooltip', {name: ariaTooltip})).toBeInTheDocument()
  })

  it('Do not show tooltip if there is no tooltip text', () => {
    props.tooltipText = null
    render(<Input {...props} />)

    expect(screen.getByLabelText(label)).toBeInTheDocument()
    expect(screen.queryByRole('tooltip', {name: ariaTooltip})).not.toBeInTheDocument()
  })

  it('Show input limit when shouldCountChars is true', () => {
    props.shouldCountChars = true
    render(<Input {...props} />)
    expect(screen.getByText('0/60')).toBeInTheDocument()
  })

  it('Show input limit using the provided limit', () => {
    props.shouldCountChars = true
    props.inputLimit = 200
    render(<Input {...props} />)
    expect(screen.getByText('0/200')).toBeInTheDocument()
  })

  it('Switch password visualization', () => {
    render(<Input {...props} />)

    let eyeOffIcon = screen.queryByTestId(/eye-off/i)
    let eyeOnIcon = screen.getByTestId(/eye-on/i)

    expect(eyeOffIcon).not.toBeInTheDocument()
    expect(eyeOnIcon).toBeInTheDocument()

    userEvent.click(eyeOnIcon)

    eyeOffIcon = screen.getByTestId(/eye-off/i)
    eyeOnIcon = screen.queryByTestId(/eye-on/i)

    expect(eyeOffIcon).toBeInTheDocument()
    expect(eyeOnIcon).not.toBeInTheDocument()
  })

  it('Show validations descriptions on focus and feedback after typing', () => {
    render(<Input {...props} />)

    const input = screen.getByRole('input', { name: inputName })
    userEvent.click(input)

    let validationsReferences = screen.getAllByRole('status', {name: 'regular'})
    expect(validationsReferences[0]).toHaveTextContent(minValidationMessage)
    expect(validationsReferences[1]).toHaveTextContent(upperValidationMessage)

    userEvent.type(input, '123L')
    validationsReferences = screen.queryByRole('status', {name: 'regular'})
    expect(validationsReferences).not.toBeInTheDocument()

   const errorValidationsReference = screen.getByRole('status', {name: 'error'})
   expect(errorValidationsReference).toHaveTextContent(minValidationMessage)

   const successValidationsReference = screen.getByRole('status', {name: 'success'})
   expect(successValidationsReference).toHaveTextContent(upperValidationMessage)

   const successTick = screen.queryByTestId(/positive-tick/i)
   expect(successTick).not.toBeInTheDocument()
   expect(handleOnChange).toHaveBeenCalled()
  })

  it('Show validation tick when an input is valid', () => {
    render(<Input {...props} />)

    const input = screen.getByRole('input', { name: inputName })
    userEvent.click(input)

    let validationsReferences = screen.getAllByRole('status', {name: 'regular'})
    expect(validationsReferences[0]).toHaveTextContent(minValidationMessage)
    expect(validationsReferences[1]).toHaveTextContent(upperValidationMessage)

    userEvent.type(input, '123L644')
    validationsReferences = screen.queryByRole('status', {name: 'regular'})
    expect(validationsReferences).not.toBeInTheDocument()

   const errorValidationsReference = screen.queryByRole('status', {name: 'error'})
   expect(errorValidationsReference).not.toBeInTheDocument()

   const successValidationsReference = screen.getAllByRole('status', {name: 'success'})
   expect(successValidationsReference[0]).toHaveTextContent(minValidationMessage)
   expect(successValidationsReference[1]).toHaveTextContent(upperValidationMessage)

   const successTick = screen.getByTestId(/positive-tick/i)
   expect(successTick).toBeInTheDocument()
   expect(handleOnChange).toHaveBeenCalled()
  })
})

