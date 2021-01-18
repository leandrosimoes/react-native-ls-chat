import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'

import ScrollToBottomButton from '.'

const ScrollToBottomButtonA11yLabel = 'Button to scroll the list of messsages back to bottom'

let onPress: () => void

describe('ScrollToBottomButton tests', () => {
    beforeAll(() => {
        onPress = jest.fn()
    })

    it('Should ScrollToBottomButton component render properly', () => {
        const { queryByA11yLabel } = render(
            <ScrollToBottomButton isVisible={true} onPress={onPress} />
        )

        const scrollToBottomButton = queryByA11yLabel(ScrollToBottomButtonA11yLabel)

        expect(scrollToBottomButton).not.toBeNull()
    })

    it('Should ScrollToBottomButton component NOT render if property "isVisible" === false', () => {
        const { queryByA11yLabel } = render(
            <ScrollToBottomButton isVisible={false} onPress={onPress} />
        )

        const scrollToBottomButton = queryByA11yLabel(ScrollToBottomButtonA11yLabel)

        expect(scrollToBottomButton).toBeNull()
    })

    it('Should onPress be triggered if the button is pressed', () => {
        const { queryByA11yLabel } = render(
            <ScrollToBottomButton isVisible={true} onPress={onPress} />
        )

        const scrollToBottomButton = queryByA11yLabel(ScrollToBottomButtonA11yLabel)

        fireEvent(scrollToBottomButton, 'click')

        expect(onPress).toBeCalledTimes(1)
    })
})
