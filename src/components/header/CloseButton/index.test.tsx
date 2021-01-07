import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import CloseButton from '.'

describe('CloseButton tests', () => {
    it('Should CloseButton NOT render if no onCloseButtonPress event is passed', () => {
        const { queryByA11yRole } = render(<CloseButton />)
        const button = queryByA11yRole('button')

        expect(button).toBeNull() 
    })

    it('Should CloseButton component render properly', () => {
        const onCloseButtonPress = jest.fn()
        const { queryByA11yRole } = render(<CloseButton onCloseButtonPress={onCloseButtonPress} />)
        const button = queryByA11yRole('button')

        expect(button).not.toBeNull()
    })

    it('Should fire onCloseButtonPress event once', () => {
        const onCloseButtonPress = jest.fn()
        const { queryByA11yRole } = render(<CloseButton onCloseButtonPress={onCloseButtonPress} />)
        const button = queryByA11yRole('button')
        
        fireEvent.press(button)

        expect(onCloseButtonPress).toBeCalledTimes(1)
    })
})
