import * as React from 'react'
import { screen } from '@testing-library/dom'
import { render } from '../../test-helpers'
import userEvent from '@testing-library/user-event'
import * as nextRouter from 'next/router'

import Header from '../Header'

const mockedPush = jest.fn()
beforeEach(() => {
  nextRouter.useRouter = jest.fn()
  nextRouter.useRouter.mockImplementation(() => ({ locale: 'en', push: mockedPush }))
})

describe('Header test', () => {
  it('renders Information Intro', () => {
    expect(render(<Header />)).toMatchSnapshot()
  })

  it('should change language', () => {
    render(<Header />)
    const langSelector = screen.getByRole('combobox', {name: 'language-selector'})
    userEvent.selectOptions(langSelector, ['es'])
    expect(mockedPush).toHaveBeenCalled()
  })
})

