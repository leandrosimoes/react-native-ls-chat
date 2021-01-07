import React from 'react'
import { render } from '@testing-library/react-native'

import Header from '.'

describe('Header tests', () => {
    it('Should Header component render properly', () => {
        const testingTitle = "Testing Title"
        const { queryByA11yRole, queryByText } = render(<Header title={testingTitle} />)
        const header = queryByA11yRole('header')
        const testingTitleFound = queryByText(testingTitle)

        expect(header).not.toBeNull()
        expect(testingTitleFound).not.toBeNull()
    })

    it('Should Header component NOT be rendered if "isVisible" props is equal to "false"', () => {
        const { queryByA11yRole } = render(<Header isVisible={false} />)
        const header = queryByA11yRole('header')
        
        expect(header).toBeNull()
    })
})
