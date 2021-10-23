import * as React from 'react'
import { render } from '../../test-helpers/index'

import Button from './Button'

it('renders Button', () => {
  expect(render(<Button>Test</Button>)).toMatchSnapshot()
})

