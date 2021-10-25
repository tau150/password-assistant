import * as React from 'react'
import { screen } from '@testing-library/dom'

import { render } from '../../../test-helpers'
import ErrorInputLabel from '../ErrorInputLabel'

describe('Error Input test', () => {
  it('renders Error Input Label', () => {
    expect(render(<ErrorInputLabel>Test</ErrorInputLabel>)).toMatchSnapshot()
  })

  it('show the correct content and status prop', () => {
    const content = 'Test content'
    const status = 'success'

    render(<ErrorInputLabel status={status}>{content}</ErrorInputLabel>)

    expect(screen.getByText(content)).toBeInTheDocument()
    expect(screen.getByRole('status', {name: status})).toBeInTheDocument()
  })
})

