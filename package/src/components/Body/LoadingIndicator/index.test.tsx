import React from 'react'

import { render } from '@testing-library/react-native'

import LoadingIndicator from '.'

const LoadingIndicatorA11yLabel = 'Fetching Messages Indicator'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

describe('LoadingIndicator tests', () => {
    it('Should LoadingIndicator component render properly', () => {
        const { queryByLabelText } = render(
            <LoadingIndicator isFeching={false} />
        )

        const loadingIndicator = queryByLabelText(LoadingIndicatorA11yLabel)

        expect(loadingIndicator).not.toBeNull()
    })
})
