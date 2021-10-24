import * as React from 'react'
import { screen } from '@testing-library/dom'
import { render } from '../../../test-helpers'

import StatusCard from '../StatusCard'

describe('Status Card test', () => {
  it('renders Status Card', () => {
    expect(render(<StatusCard />)).toMatchSnapshot()
  })

  it('show the correct props', () => {
    const title = 'FAKE_TITLE'
    const body = 'FAKE_BODY'

    render(<StatusCard title={title} body={body}  />)
    expect(screen.getByText(title)).toBeInTheDocument()
  })
})

