import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import CloseButton from '.'

describe('CloseButton tests', () => {
    it('Should CloseButton NOT render if no onCloseButtonPress event is passed', () => {
        const { queryByRole } = render(<CloseButton />)
        const button = queryByRole('button')

        expect(button).toBeNull()
    })

    it('Should CloseButton component render properly', () => {
        const onCloseButtonPress = jest.fn()
        const { queryByRole } = render(
            <CloseButton onCloseButtonPress={onCloseButtonPress} />
        )
        const button = queryByRole('button')

        expect(button).not.toBeNull()
    })

    it('Should fire onCloseButtonPress event once', () => {
        const onCloseButtonPress = jest.fn()
        const { queryByRole } = render(
            <CloseButton onCloseButtonPress={onCloseButtonPress} />
        )
        const button = queryByRole('button')!

        fireEvent.press(button)

        expect(onCloseButtonPress).toBeCalledTimes(1)
    })
})
