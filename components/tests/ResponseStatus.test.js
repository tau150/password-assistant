import * as React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import { render } from '../../test-helpers'
import userEvent from '@testing-library/user-event'
import { StepWizardContext } from '../../contexts/stepWizardContext';


import ResponseStatus from '../ResponseStatus'


const mockHandleNextStep = jest.fn()
const mockHandlePrevStep = jest.fn()
const mockSetCurrentStep = jest.fn()

const defaultContextProps = {
  currentStep: 0,
  setCurrentStep: mockSetCurrentStep,
  handleNextStep: mockHandleNextStep,
  handlePrevStep: mockHandlePrevStep,
  isStepDisabled: false
}

function WizardContextWrapper(props) {
  return (
    <StepWizardContext.Provider value={{...defaultContextProps}}>
      <ResponseStatus {...props} />
    </StepWizardContext.Provider>
  )
}


describe('Response Status test', () => {
  it('renders Response Status', async () => {
    expect(render(<WizardContextWrapper/>)).toMatchSnapshot()
  })

  it('should go to first step when status is success', async () => {
    render(<WizardContextWrapper status='success'/>)

    const nextButton = screen.getByRole('button', {name: 'next-button'})
    act( () => {
      userEvent.click(nextButton)
    });

    await waitFor(() => {
      expect(mockSetCurrentStep).toHaveBeenCalledWith(0)
    })
  })

  it('should go to prev step when status is not success', async () => {
    render(<WizardContextWrapper status='error'/>)

    const nextButton = screen.getByRole('button', {name: 'next-button'})
    act( () => {
      userEvent.click(nextButton)
    });

    await waitFor(() => {
      expect(mockHandlePrevStep).toHaveBeenCalled()
    })
  })

})

