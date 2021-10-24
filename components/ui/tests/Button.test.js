import * as React from 'react'
import { render } from '../../../test-helpers'

import Button from '../Button'

describe('Button test', () => {
  it('renders Button', () => {
    expect(render(<Button>Test</Button>)).toMatchSnapshot()
  })
})

