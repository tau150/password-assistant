import * as React from 'react'
import { screen } from '@testing-library/dom'
import { render } from '../../test-helpers'
import userEvent from '@testing-library/user-event';

import InformationIntro from '../InformationIntro'
import Wizard from '../Wizard'


function IntroWrapper() {
  return (
    <Wizard>
      <InformationIntro />
    </Wizard>
  )
}

describe('Information Intro test', () => {
  it('renders Information Intro', () => {
    expect(render(<IntroWrapper />)).toMatchSnapshot()
  })

  it('toggle checkbox', () => {
    render(<IntroWrapper />)

    let checkbox = screen.getByRole('checkbox', {name: 'age'})
    expect(checkbox.checked).toEqual(false)

    userEvent.click(checkbox)
    checkbox = screen.getByRole('checkbox', {name: 'age'})
    expect(checkbox.checked).toEqual(true)
  })
})

