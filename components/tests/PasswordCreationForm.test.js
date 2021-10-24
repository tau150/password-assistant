import * as React from 'react'
import { render } from '../../test-helpers'

import PasswordCreationForm from '../PasswordCreationForm'
import Wizard from '../Wizard'


function Wrapper() {
  return (
    <Wizard>
      <PasswordCreationForm />
    </Wizard>
  )
}

describe('Password Confirmation Form test', () => {
  it('renders Password Confirmation', () => {
    expect(render(<Wrapper />)).toMatchSnapshot()
  })

})

