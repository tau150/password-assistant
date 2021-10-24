import { render } from '../../test-helpers/index'
import { screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { StepWizardContext } from '../../contexts/stepWizardContext';
import WizardFooter from './WizardFooter'

const mockHandleNextStep = jest.fn()
const mockHandlePrevStep = jest.fn()

let defaultContextProps;

beforeEach( () => {
  defaultContextProps = {
    currentStep: 0,
    handleNextStep: mockHandleNextStep,
    handlePrevStep: mockHandlePrevStep,
    isStepDisabled: false
  }
})


function WizardContextWrapper(props) {
  return (
    <StepWizardContext.Provider value={{...props}}>
      <WizardFooter />
    </StepWizardContext.Provider>
  )
}

describe('Wizard Footer test', () => {
  test('Should match snapshot', () => {
    expect(render(<WizardContextWrapper />)).toMatchSnapshot()
  })

  test('Next button can\'t be actionable if the currentStep is disabled', async () => {
    defaultContextProps.isStepDisabled = true
    render(<WizardContextWrapper {...defaultContextProps}/>)

    const nextButton = screen.getByRole('button', {name: 'next-button'})
    userEvent.click(nextButton)
    expect(mockHandleNextStep).not.toHaveBeenCalled()
  })

  test('Prev button can be actionable if the currentStep is disabled', async () => {
    defaultContextProps.isStepDisabled = true
    defaultContextProps.currentStep = 1
    render(<WizardContextWrapper {...defaultContextProps}/>)

    const prevButton = screen.getByRole('button', {name: 'prev-button'})
    userEvent.click(prevButton)
    expect(mockHandlePrevStep).toHaveBeenCalled()
  })

  test('Next step handle should be called', async () => {

    render(<WizardContextWrapper {...defaultContextProps}/>)

    const nextButton = screen.getByRole('button', {name: 'next-button'})
    userEvent.click(nextButton)
    expect(mockHandleNextStep).toHaveBeenCalled()
  })

  test('Prev next handle should be called', async () => {
    defaultContextProps.isPrevDisabled = false;
    render(<WizardContextWrapper {...defaultContextProps}/>)

    const prevButton = screen.getByRole('button', {name: 'prev-button'})
    userEvent.click(prevButton)
    expect(mockHandlePrevStep).toHaveBeenCalled()
  })
})