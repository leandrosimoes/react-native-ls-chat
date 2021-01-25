import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import Controls from '.'
import { ILsChatMessage, ILsChatUser } from '../../../interfaces'
import { delay } from '../../../utils'
import { GestureResponderEvent } from 'react-native'

let mockUser: ILsChatUser
let mockUser2: ILsChatUser
let mockMessage: ILsChatMessage

let onPressControlBody: (event: GestureResponderEvent) => void
let onDeleteControlButtonPress: (event: GestureResponderEvent) => void
let onReplyControlButtonPress: (event: GestureResponderEvent) => void

const ControlsA11yLabel = 'Selected Message Action Controls'
const ReplyControlsA11yLabel = 'Reply Message Control Button'
const DeleteControlsA11yLabel = 'Delete Message Control Button'

describe('Controls tests', () => {
    beforeEach(() => {
        onPressControlBody = jest.fn()
        onDeleteControlButtonPress = jest.fn()
        onReplyControlButtonPress = jest.fn()

        mockUser = {
            id: '1',
            name: 'Test User',
            photo:
                'https://avatars3.githubusercontent.com/u/5066378?s=400&u=98d81da11220a6d0f7f51532e2c3e949b50a445b&v=4',
        }

        mockUser2 = {
            id: '2',
            name: 'Test User 2',
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
    })

    it('Should Controls component render properly', () => {
        const { queryByA11yLabel } = render(
            <Controls
                user={mockUser}
                message={mockMessage}
                onPressControlBody={onPressControlBody}
                onDeleteControlButtonPress={onDeleteControlButtonPress}
                onReplyControlButtonPress={onReplyControlButtonPress}
            />
        )
        const controls = queryByA11yLabel(ControlsA11yLabel)

        expect(controls).not.toBeNull()
    })

    it('Should Controls component NOT render if prop "message" is null', () => {
        const { queryByA11yLabel } = render(
            <Controls
                user={mockUser}
                message={null}
                onPressControlBody={onPressControlBody}
                onDeleteControlButtonPress={onDeleteControlButtonPress}
                onReplyControlButtonPress={onReplyControlButtonPress}
            />
        )
        const controls = queryByA11yLabel(ControlsA11yLabel)

        expect(controls).toBeNull()
    })

    it('Should Delete button NOT render if message user is NOT the same as the logged user', () => {
        const { queryByA11yLabel } = render(
            <Controls
                user={mockUser2}
                message={mockMessage}
                onPressControlBody={onPressControlBody}
                onDeleteControlButtonPress={onDeleteControlButtonPress}
                onReplyControlButtonPress={onReplyControlButtonPress}
            />
        )
        const deleteButton = queryByA11yLabel(DeleteControlsA11yLabel)

        expect(deleteButton).toBeNull()
    })

    it('Should Delete button render if message user is the same as the logged user', () => {
        const { queryByA11yLabel } = render(
            <Controls
                user={mockUser}
                message={mockMessage}
                onPressControlBody={onPressControlBody}
                onDeleteControlButtonPress={onDeleteControlButtonPress}
                onReplyControlButtonPress={onReplyControlButtonPress}
            />
        )
        const deleteButton = queryByA11yLabel(DeleteControlsA11yLabel)

        expect(deleteButton).not.toBeNull()
    })

    it('Should Reply button NOT render if message prop "isDelivered" === false', () => {
        // Changing the status os the message to WAITING
        mockMessage.isDelivered = false
        mockMessage.isRead = false

        const { queryByA11yLabel } = render(
            <Controls
                user={mockUser}
                message={mockMessage}
                onPressControlBody={onPressControlBody}
                onDeleteControlButtonPress={onDeleteControlButtonPress}
                onReplyControlButtonPress={onReplyControlButtonPress}
            />
        )
        const replyButton = queryByA11yLabel(ReplyControlsA11yLabel)

        expect(replyButton).toBeNull()
    })

    it('Should Reply button render if message prop "isDelivered" === true', () => {
        // Changing the status os the message to WAITING
        mockMessage.isDelivered = true
        mockMessage.isRead = false

        const { queryByA11yLabel } = render(
            <Controls
                user={mockUser}
                message={mockMessage}
                onPressControlBody={onPressControlBody}
                onDeleteControlButtonPress={onDeleteControlButtonPress}
                onReplyControlButtonPress={onReplyControlButtonPress}
            />
        )
        const replyButton = queryByA11yLabel(ReplyControlsA11yLabel)

        expect(replyButton).not.toBeNull()
    })

    it('Should Reply button render if message prop "isRead" === true', () => {
        // Changing the status os the message to WAITING
        mockMessage.isDelivered = false
        mockMessage.isRead = true

        const { queryByA11yLabel } = render(
            <Controls
                user={mockUser}
                message={mockMessage}
                onPressControlBody={onPressControlBody}
                onDeleteControlButtonPress={onDeleteControlButtonPress}
                onReplyControlButtonPress={onReplyControlButtonPress}
            />
        )
        const replyButton = queryByA11yLabel(ReplyControlsA11yLabel)

        expect(replyButton).not.toBeNull()
    })

    it('Should onPressControlBody be triggered properly if body overlay is pressed', async (done) => {
        const { queryByA11yLabel } = render(
            <Controls
                user={mockUser}
                message={mockMessage}
                onPressControlBody={onPressControlBody}
                onDeleteControlButtonPress={onDeleteControlButtonPress}
                onReplyControlButtonPress={onReplyControlButtonPress}
            />
        )
        const overlayButton = queryByA11yLabel(ControlsA11yLabel)

        fireEvent(overlayButton, 'onPress')

        await delay(500)

        expect(onPressControlBody).toBeCalledTimes(1)

        done()
    })

    it('Should onDeleteControlButtonPress be triggered properly if delete button is pressed', () => {
        const { queryByA11yLabel } = render(
            <Controls
                user={mockUser}
                message={mockMessage}
                onPressControlBody={onPressControlBody}
                onDeleteControlButtonPress={onDeleteControlButtonPress}
                onReplyControlButtonPress={onReplyControlButtonPress}
            />
        )
        const deleteButton = queryByA11yLabel(DeleteControlsA11yLabel)

        fireEvent(deleteButton, 'onPress')

        expect(onDeleteControlButtonPress).toBeCalledTimes(1)
    })

    it('Should onReplyControlButtonPress be triggered properly if delete button is pressed', () => {
        const { queryByA11yLabel } = render(
            <Controls
                user={mockUser}
                message={mockMessage}
                onPressControlBody={onPressControlBody}
                onDeleteControlButtonPress={onDeleteControlButtonPress}
                onReplyControlButtonPress={onReplyControlButtonPress}
            />
        )
        const replyButton = queryByA11yLabel(ReplyControlsA11yLabel)

        fireEvent(replyButton, 'onPress')

        expect(onReplyControlButtonPress).toBeCalledTimes(1)
    })
})
