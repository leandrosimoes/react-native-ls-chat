import React from 'react'

import { render } from '@testing-library/react-native'

import TypingIndicator from '.'

const TypingIndicatorA11yLabel = 'Typing Indicator'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

describe('TypingIndicator tests', () => {
    it('Should TypingIndicator component render properly', () => {
        const { queryByLabelText } = render(
            <TypingIndicator isTyping={false} />
        )

        const typingIndicator = queryByLabelText(TypingIndicatorA11yLabel)

        expect(typingIndicator).not.toBeNull()
    })
})
