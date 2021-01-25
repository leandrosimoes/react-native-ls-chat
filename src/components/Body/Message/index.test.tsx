import React from 'react'
import { Text } from 'react-native'
import { fireEvent, render } from '@testing-library/react-native'
import { ILsChatMessage, ILsChatUser } from '../../../interfaces'

import { MessageFromUser, MessageFromAnotherUser, ReplyWrapper } from '.'

let mockUser: ILsChatUser
let mockMessage: ILsChatMessage
let mockMessage2: ILsChatMessage

const MessageA11yLabel = 'Message Wrapper'
const MessageDateA11yLabel = 'Message Date'
const MessageUserNameA11yLabel = 'Message User Name'
const MessageUserPhotoA11yLabel = 'Message User Photo'
const MessageArrowA11yLabel = 'Message Arrow'
const ReplyingMessageA11yLabel = 'Replying Message Wrapper'

let onMessageItemLongPress: (message: ILsChatMessage) => void

describe('Message tests', () => {
    beforeEach(() => {
        onMessageItemLongPress = jest.fn()

        mockUser = {
            id: '1',
            name: 'Test User',
            photo:
                'https://avatars3.githubusercontent.com/u/5066378?s=400&u=98d81da11220a6d0f7f51532e2c3e949b50a445b&v=4',
        }

        mockMessage = {
            id: '1',
            text: 'Test Message',
            user: mockUser,
            time: new Date().getTime(),
            isDelivered: true,
            isRead: true,
        }

        mockMessage2 = {
            id: '1',
            text: 'Test Message',
            user: mockUser,
            time: new Date().getTime(),
            isDelivered: true,
            isRead: true,
            replyingTo: mockMessage,
        }
    })

    it('Should MessageFromUser component render properly', () => {
        const { queryByA11yLabel } = render(
            <MessageFromUser
                user={mockUser}
                message={mockMessage}
                isSelected={false}
                showArrow={false}
                showDateOnTop={false}
                onMessageItemLongPress={onMessageItemLongPress}
            />
        )

        const message = queryByA11yLabel(MessageA11yLabel)
        const messageDate = queryByA11yLabel(MessageDateA11yLabel)
        const messageUserName = queryByA11yLabel(MessageUserNameA11yLabel)
        const messageUserPhoto = queryByA11yLabel(MessageUserPhotoA11yLabel)
        const replyingMessageWrapper = queryByA11yLabel(
            ReplyingMessageA11yLabel
        )

        expect(message).not.toBeNull()
        expect(messageDate).toBeNull()
        expect(messageUserName).toBeNull()
        expect(messageUserPhoto).toBeNull()
        expect(replyingMessageWrapper).toBeNull()
    })

    it('Should MessageFromAnotherUser component render properly', () => {
        const { queryByA11yLabel } = render(
            <MessageFromAnotherUser
                user={mockUser}
                message={mockMessage}
                isSelected={false}
                showArrow={false}
                showDateOnTop={false}
                onMessageItemLongPress={onMessageItemLongPress}
            />
        )

        const message = queryByA11yLabel(MessageA11yLabel)
        const messageDate = queryByA11yLabel(MessageDateA11yLabel)
        const messageUserName = queryByA11yLabel(MessageUserNameA11yLabel)
        const messageUserPhoto = queryByA11yLabel(MessageUserPhotoA11yLabel)

        expect(message).not.toBeNull()
        expect(messageDate).toBeNull()
        expect(messageUserName).not.toBeNull()
        expect(messageUserPhoto).not.toBeNull()
    })

    fit('Should MessageFromUser ReplyWrapper be render if the message has the property "replyingTo"', () => {
        const { queryByA11yLabel } = render(
            <MessageFromUser
                user={mockUser}
                message={mockMessage2}
                isSelected={false}
                showArrow={false}
                showDateOnTop={true}
                onMessageItemLongPress={onMessageItemLongPress}
            />
        )

        const message = queryByA11yLabel(MessageA11yLabel)
        const replyWrapper = queryByA11yLabel(ReplyingMessageA11yLabel)

        expect(message).not.toBeNull()
        expect(replyWrapper).not.toBeNull()
    })

    it('Should MessageFromAnotherUser ReplyWrapper be render if the message has the property "replyingTo"', () => {
        const { queryByA11yLabel } = render(
            <MessageFromAnotherUser
                user={mockUser}
                message={mockMessage2}
                isSelected={false}
                showArrow={false}
                showDateOnTop={true}
                onMessageItemLongPress={onMessageItemLongPress}
            />
        )

        const message = queryByA11yLabel(MessageA11yLabel)
        const replyWrapper = queryByA11yLabel(ReplyingMessageA11yLabel)

        expect(message).not.toBeNull()
        expect(replyWrapper).not.toBeNull()
    })

    it('Should MessageFromUser date be render if prop "showDateOnTop" === true', () => {
        const { queryByA11yLabel } = render(
            <MessageFromUser
                user={mockUser}
                message={mockMessage}
                isSelected={false}
                showArrow={false}
                showDateOnTop={true}
                onMessageItemLongPress={onMessageItemLongPress}
            />
        )

        const message = queryByA11yLabel(MessageA11yLabel)
        const messageDate = queryByA11yLabel(MessageDateA11yLabel)

        expect(message).not.toBeNull()
        expect(messageDate).not.toBeNull()
    })

    it('Should MessageFromAnotherUser date be render if prop "showDateOnTop" === true', () => {
        const { queryByA11yLabel } = render(
            <MessageFromAnotherUser
                user={mockUser}
                message={mockMessage}
                isSelected={false}
                showArrow={false}
                showDateOnTop={true}
                onMessageItemLongPress={onMessageItemLongPress}
            />
        )

        const message = queryByA11yLabel(MessageA11yLabel)
        const messageDate = queryByA11yLabel(MessageDateA11yLabel)

        expect(message).not.toBeNull()
        expect(messageDate).not.toBeNull()
    })

    it('Should MessageFromAnotherUser arrow be render if prop "showArrow" === true', () => {
        const { queryByA11yLabel } = render(
            <MessageFromAnotherUser
                user={mockUser}
                message={mockMessage}
                isSelected={false}
                showArrow={true}
                showDateOnTop={false}
                onMessageItemLongPress={onMessageItemLongPress}
            />
        )

        const message = queryByA11yLabel(MessageA11yLabel)
        const messageArrow = queryByA11yLabel(MessageArrowA11yLabel)

        expect(message).not.toBeNull()
        expect(messageArrow).not.toBeNull()
    })

    it('Should MessageFromAnotherUser arrow be render if prop "showDateOnTop" === true', () => {
        const { queryByA11yLabel } = render(
            <MessageFromAnotherUser
                user={mockUser}
                message={mockMessage}
                isSelected={false}
                showArrow={false}
                showDateOnTop={true}
                onMessageItemLongPress={onMessageItemLongPress}
            />
        )

        const message = queryByA11yLabel(MessageA11yLabel)
        const messageArrow = queryByA11yLabel(MessageArrowA11yLabel)

        expect(message).not.toBeNull()
        expect(messageArrow).not.toBeNull()
    })

    it('Should MessageFromUser arrow be render if prop "showArrow" === true', () => {
        const { queryByA11yLabel } = render(
            <MessageFromUser
                user={mockUser}
                message={mockMessage}
                isSelected={false}
                showArrow={true}
                showDateOnTop={false}
                onMessageItemLongPress={onMessageItemLongPress}
            />
        )

        const message = queryByA11yLabel(MessageA11yLabel)
        const messageArrow = queryByA11yLabel(MessageArrowA11yLabel)

        expect(message).not.toBeNull()
        expect(messageArrow).not.toBeNull()
    })

    it('Should MessageFromUser arrow be render if prop "showDateOnTop" === true', () => {
        const { queryByA11yLabel } = render(
            <MessageFromUser
                user={mockUser}
                message={mockMessage}
                isSelected={false}
                showArrow={false}
                showDateOnTop={true}
                onMessageItemLongPress={onMessageItemLongPress}
            />
        )

        const message = queryByA11yLabel(MessageA11yLabel)
        const messageArrow = queryByA11yLabel(MessageArrowA11yLabel)

        expect(message).not.toBeNull()
        expect(messageArrow).not.toBeNull()
    })

    it('Should MessageFromUser arrow be render if prop "showDateOnTop" === true', () => {
        const { queryByA11yLabel } = render(
            <MessageFromUser
                user={mockUser}
                message={mockMessage}
                isSelected={false}
                showArrow={false}
                showDateOnTop={true}
                onMessageItemLongPress={onMessageItemLongPress}
            />
        )

        const message = queryByA11yLabel(MessageA11yLabel)

        fireEvent(message, 'onLongPress')

        expect(onMessageItemLongPress).toBeCalledTimes(1)
    })

    it('Should MessageAnotherFromUser arrow be render if prop "showDateOnTop" === true', () => {
        const { queryByA11yLabel } = render(
            <MessageFromAnotherUser
                user={mockUser}
                message={mockMessage}
                isSelected={false}
                showArrow={false}
                showDateOnTop={true}
                onMessageItemLongPress={onMessageItemLongPress}
            />
        )

        const message = queryByA11yLabel(MessageA11yLabel)

        fireEvent(message, 'onLongPress')

        expect(onMessageItemLongPress).toBeCalledTimes(1)
    })

    it('Should ReplyWrapper render children properly', () => {
        const childText = 'Reply Wrapper Child'

        const { queryByText } = render(
            <ReplyWrapper user={mockUser} message={mockMessage}>
                <Text>{childText}</Text>
            </ReplyWrapper>
        )

        const children = queryByText(childText)

        expect(children).not.toBeNull()
    })
})
