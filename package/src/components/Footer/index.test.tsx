import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import Footer from '.'
import { ILsChatMessage, ILsChatUser } from '../../interfaces'
import { delay } from '../../utils'

let mockUser: ILsChatUser

let onMessageTextInputChange: (text: string) => void
let onCancelReplyingMessage: () => void
let onSendMessage: (message: ILsChatMessage) => Promise<ILsChatMessage>
let onSuccessSendMessage: (message: ILsChatMessage) => void
let onErrorSendMessage: (message: ILsChatMessage, error: any) => void

const FooterA11yLabel = 'Chat footer'
const MessageInputA11yLabel = 'Chat message input'

describe('Footer tests', () => {
    beforeEach(() => {
        onMessageTextInputChange = jest.fn()
        onCancelReplyingMessage = jest.fn()
        onSendMessage = jest.fn()
        onSuccessSendMessage = jest.fn()
        onErrorSendMessage = jest.fn()

        mockUser = {
            id: '1',
            name: 'Test User',
            photo: 'https://avatars3.githubusercontent.com/u/5066378?s=400&u=98d81da11220a6d0f7f51532e2c3e949b50a445b&v=4',
        }
    })

    it('Should Footer component render properly', () => {
        const { queryByLabelText } = render(
            <Footer
                user={mockUser}
                isLoading={false}
                onMessageTextInputChange={onMessageTextInputChange}
                onCancelReplyingMessage={onCancelReplyingMessage}
                onSendMessage={onSendMessage}
                onSuccessSendMessage={onSuccessSendMessage}
                onErrorSendMessage={onErrorSendMessage}
            />
        )
        const footer = queryByLabelText(FooterA11yLabel)
        const input = queryByLabelText(MessageInputA11yLabel)!

        expect(footer).not.toBeNull()
        expect(input).not.toBeNull()
    })

    it('Should onMessageTextInputChange be triggered on input change', () => {
        const testMessageText = 'Testing Text'

        const { queryByLabelText } = render(
            <Footer
                user={mockUser}
                isLoading={false}
                onMessageTextInputChange={onMessageTextInputChange}
                onCancelReplyingMessage={onCancelReplyingMessage}
                onSendMessage={onSendMessage}
                onSuccessSendMessage={onSuccessSendMessage}
                onErrorSendMessage={onErrorSendMessage}
            />
        )
        const input = queryByLabelText(MessageInputA11yLabel)!

        fireEvent(input, 'change', { nativeEvent: { text: testMessageText } })

        expect(onMessageTextInputChange).toBeCalledTimes(1)
        expect(onMessageTextInputChange).toBeCalledWith(testMessageText)
    })

    it('Should onSendMessag be triggered on send button press', () => {
        const testMessageText = 'Testing Text'
        const mockMessage = {
            text: testMessageText,
            user: mockUser,
        }

        const { queryByLabelText, queryByRole } = render(
            <Footer
                user={mockUser}
                isLoading={false}
                onMessageTextInputChange={onMessageTextInputChange}
                onCancelReplyingMessage={onCancelReplyingMessage}
                onSendMessage={onSendMessage}
                onSuccessSendMessage={onSuccessSendMessage}
                onErrorSendMessage={onErrorSendMessage}
            />
        )
        const input = queryByLabelText(MessageInputA11yLabel)!
        const button = queryByRole('button')!

        fireEvent(input, 'change', { nativeEvent: { text: testMessageText } })
        fireEvent(button, 'onPress')

        expect(onSendMessage).toBeCalledTimes(1)
        expect(onSendMessage).toBeCalledWith(
            expect.objectContaining(mockMessage)
        )
    })

    it('Should onSuccessSendMessage be triggered on send button press', async () => {
        const testMessageText = 'Testing Text'
        const mockMessage = {
            text: testMessageText,
            user: mockUser,
        }

        const mockOnSend = async (message: ILsChatMessage) => {
            return message
        }

        const { queryByLabelText, queryByRole } = render(
            <Footer
                user={mockUser}
                isLoading={false}
                onMessageTextInputChange={onMessageTextInputChange}
                onCancelReplyingMessage={onCancelReplyingMessage}
                onSendMessage={mockOnSend}
                onSuccessSendMessage={onSuccessSendMessage}
                onErrorSendMessage={onErrorSendMessage}
            />
        )
        const input = queryByLabelText(MessageInputA11yLabel)!
        const button = queryByRole('button')!

        fireEvent(input, 'change', { nativeEvent: { text: testMessageText } })
        fireEvent(button, 'onPress')

        await delay(1000)

        expect(onSuccessSendMessage).toBeCalledTimes(1)
        expect(onSuccessSendMessage).toBeCalledWith(
            expect.objectContaining(mockMessage)
        )
    })

    it('Should onErrorSendMessage be triggered on send button press', async () => {
        const testMessageText = 'Testing Text'
        const mockMessage = {
            text: testMessageText,
            user: mockUser,
        }
        const mockError = new Error('Expected Error')

        const mockOnSend = async (message: ILsChatMessage) => {
            throw mockError
        }

        const { queryByLabelText, queryByRole } = render(
            <Footer
                user={mockUser}
                isLoading={false}
                onMessageTextInputChange={onMessageTextInputChange}
                onCancelReplyingMessage={onCancelReplyingMessage}
                onSendMessage={mockOnSend}
                onSuccessSendMessage={onSuccessSendMessage}
                onErrorSendMessage={onErrorSendMessage}
            />
        )
        const input = queryByLabelText(MessageInputA11yLabel)!
        const button = queryByRole('button')!

        fireEvent(input, 'change', { nativeEvent: { text: testMessageText } })
        fireEvent(button, 'onPress')

        await delay(1000)

        expect(onErrorSendMessage).toBeCalledTimes(1)
        expect(onErrorSendMessage).toBeCalledWith(
            expect.objectContaining(mockMessage),
            mockError
        )
    })

    it('Should onSendMessage & onSuccessSendMessage & onErrorSendMessage NOT be triggered on send button press with no text in input message', () => {
        const testMessageText = ''

        const { queryByLabelText, queryByRole } = render(
            <Footer
                user={mockUser}
                isLoading={false}
                onMessageTextInputChange={onMessageTextInputChange}
                onCancelReplyingMessage={onCancelReplyingMessage}
                onSendMessage={onSendMessage}
                onSuccessSendMessage={onSuccessSendMessage}
                onErrorSendMessage={onErrorSendMessage}
            />
        )
        const input = queryByLabelText(MessageInputA11yLabel)!
        const button = queryByRole('button')!

        fireEvent(input, 'change', { nativeEvent: { text: testMessageText } })
        fireEvent(button, 'onPress')

        expect(onSendMessage).toBeCalledTimes(0)
        expect(onSuccessSendMessage).toBeCalledTimes(0)
        expect(onErrorSendMessage).toBeCalledTimes(0)
    })

    it('Should onSendMessage & onSuccessSendMessage & onErrorSendMessage NOT be triggered on send button press with props isLoading === true', async () => {
        const testMessageText = 'Teste Message'

        const { queryByLabelText, queryByRole } = render(
            <Footer
                user={mockUser}
                isLoading
                onMessageTextInputChange={onMessageTextInputChange}
                onCancelReplyingMessage={onCancelReplyingMessage}
                onSendMessage={onSendMessage}
                onSuccessSendMessage={onSuccessSendMessage}
                onErrorSendMessage={onErrorSendMessage}
            />
        )
        const input = queryByLabelText(MessageInputA11yLabel)!
        const button = queryByRole('button')!

        fireEvent(input, 'change', { nativeEvent: { text: testMessageText } })
        fireEvent(button, 'onPress')

        expect(onSendMessage).toBeCalledTimes(0)

        await delay(1000)

        expect(onSuccessSendMessage).toBeCalledTimes(0)
        expect(onErrorSendMessage).toBeCalledTimes(0)
    })
})
