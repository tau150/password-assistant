import { render } from '../../test-helpers/index'
import { screen } from '@testing-library/react';

import StepsIndicator from './StepsIndicator'

let props;

beforeEach(() => {
  props = {
    stepsNumber: 3,
    activeStep: 1,
  }
})


describe('Steps Indicator test', () => {
  test('Should match snapshot', () => {
    expect(render(<StepsIndicator {...props} />)).toMatchSnapshot()
  })

  test('Should exist badges as number of steps with their identifier', () => {
    render(<StepsIndicator {...props} />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  test('Active step should be identifier', () => {
    render(<StepsIndicator {...props} />)

    expect(screen.getByRole('status', {name: '1 is active'})).toBeInTheDocument()
    expect(screen.getByRole('status', {name: '2'})).toBeInTheDocument()
    expect(screen.getByRole('status', {name: '3'})).toBeInTheDocument()
  })
})