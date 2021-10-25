import * as React from 'react'
import { render } from '../../../test-helpers'

import ErrorInputLabel from '../ErrorInputLabel'

describe('Error Input test', () => {
  it('renders Error Input Label', () => {
    expect(render(<ErrorInputLabel>Test</ErrorInputLabel>)).toMatchSnapshot()
  })
})

