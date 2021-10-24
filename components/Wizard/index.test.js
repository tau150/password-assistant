import { render } from '../../test-helpers/index'
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import WizardFooter from './WizardFooter';
import { useStepsWizard } from '../../contexts/stepWizardContext';

import Wizard from './index'


function StepOne(){
  return (
    <>
      <p>Step 1</p>
      <WizardFooter />
    </>
  )
}

function StepTwo(){
  return (
    <>
      <p>Step 2</p>
      <WizardFooter />
    </>
  )
}
function WizardWrapper() {
  return (
    <Wizard>
      <StepOne />
      <StepTwo />
    </Wizard>
  )
}
describe('Steps Indicator test', () => {
  test('Should match snapshot', () => {
    expect(render(<WizardWrapper/>)).toMatchSnapshot()
  })

  test('Should show the correct step on the screen navigating among them', () => {
    render(<WizardWrapper/>)

    expect(screen.getByText(/step 1/i)).toBeInTheDocument()

    const nextButton = screen.getByRole('button', {name: 'next-button'})
    userEvent.click(nextButton)

    expect(screen.getByText(/step 2/i)).toBeInTheDocument()

    const prevButton = screen.getByRole('button', {name: 'prev-button'})
    userEvent.click(prevButton)

    expect(screen.getByText(/step 1/i)).toBeInTheDocument()
  })

  test('Should move to the next step with the Enter button when the the step is not disabled', () => {
    render(<WizardWrapper/>)

    expect(screen.getByText(/step 1/i)).toBeInTheDocument()
    userEvent.keyboard('{Enter}')

    expect(screen.getByText(/step 2/i)).toBeInTheDocument()

  })

  test('Should not move to the next step with the Enter button when the the step is disabled', () => {

    const ChildWithAction = () => {
      const { setIsStepDisabled } = useStepsWizard()

      React.useEffect( () => {
        setIsStepDisabled(true)
      }, [])

      return <div>Step 1</div>
    }
    render(
      <Wizard>
        <ChildWithAction />
        <div>Step 2</div>
      </Wizard>
    )

    expect(screen.getByText(/step 1/i)).toBeInTheDocument()
    userEvent.keyboard('{Enter}')

    expect(screen.queryByText(/step 2/i)).not.toBeInTheDocument()
  })
})