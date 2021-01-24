import React from 'react'
import { render } from '@testing-library/react-native'

import LoadingIndicator from '.'

const LoadingIndicatorA11yLabel = 'Fetching Messages Indicator'

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

describe('LoadingIndicator tests', () => {
    it('Should LoadingIndicator component render properly', () => {
        const { queryByA11yLabel } = render(
            <LoadingIndicator isFeching={false} />
        )

        const loadingIndicator = queryByA11yLabel(LoadingIndicatorA11yLabel)

        expect(loadingIndicator).not.toBeNull()
    })
})
