import { render } from '../../test-helpers/index'
import { screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import WizardFooter from './WizardFooter'

let props;

beforeEach(() => {
  props = {
    isStepDisabled: false,
    isPrevDisabled: true,
    handleNextStep: jest.fn(),
    handlePrevStep: jest.fn(),
  }
})


describe('Wizard Footer test', () => {
  test('Should match snapshot', () => {
    expect(render(<WizardFooter {...props} />)).toMatchSnapshot()
  })

  test('Next button can\'t be actionable if the currentStep is disabled', async () => {
    props.isStepDisabled = true;
    render(<WizardFooter {...props}/>)

    const nextButton = screen.getByRole('button', {name: 'next-button'})
    userEvent.click(nextButton)
    expect(props.handleNextStep).not.toHaveBeenCalled()
  })

  test('Prev button can\'t be actionable if the currentStep is disabled', async () => {
    render(<WizardFooter {...props}/>)

    const prevButton = screen.getByRole('button', {name: 'prev-button'})
    userEvent.click(prevButton)
    expect(props.handlePrevStep).not.toHaveBeenCalled()
  })

  test('Next step handle should be called', async () => {
    render(<WizardFooter {...props}/>)

    const nextButton = screen.getByRole('button', {name: 'next-button'})
    userEvent.click(nextButton)
    expect(props.handleNextStep).toHaveBeenCalled()
  })

  test('Prev next handle should be called', async () => {
    props.isPrevDisabled = false;
    render(<WizardFooter {...props}/>)

    const prevButton = screen.getByRole('button', {name: 'prev-button'})
    userEvent.click(prevButton)
    expect(props.handlePrevStep).toHaveBeenCalled()
  })
})