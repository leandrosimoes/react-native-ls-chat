import React from 'react'

import { render } from '@testing-library/react-native'

import EmptyMessages from '.'

const EmptyMessagesA11yLabel = 'Empty Messages and Loading Messages Texts'
const EmptyMessagesTitleText = 'Awesome!'
const EmptyMessagesText = 'Be the first to leave a message!'
const EmptyMessagesLoadingText = 'Loading'

describe('EmptyMessages tests', () => {
    it('Should EmptyMessages component render properly', () => {
        const { queryByLabelText, queryByText } = render(
            <EmptyMessages isLoading={false} />
        )

        const emptyMessages = queryByLabelText(EmptyMessagesA11yLabel)
        const emptyMessagesTitle = queryByText(EmptyMessagesTitleText)
        const emptyMessagesText = queryByText(EmptyMessagesText)
        const emptyMessagesLoadingText = queryByText(EmptyMessagesLoadingText)

        expect(emptyMessages).not.toBeNull()
        expect(emptyMessagesTitle).not.toBeNull()
        expect(emptyMessagesText).not.toBeNull()
        expect(emptyMessagesLoadingText).toBeNull()
    })

    it('Should "Loading" message render if props "isLoading" === true', () => {
        const { queryByText } = render(<EmptyMessages isLoading />)

        const emptyMessagesTitle = queryByText(EmptyMessagesTitleText)
        const emptyMessagesText = queryByText(EmptyMessagesText)
        const emptyMessagesLoadingText = queryByText(EmptyMessagesLoadingText)

        expect(emptyMessagesTitle).toBeNull()
        expect(emptyMessagesText).toBeNull()
        expect(emptyMessagesLoadingText).not.toBeNull()
    })
})
