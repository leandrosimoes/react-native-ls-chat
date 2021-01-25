import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import ReplyingMessage from '.'
import { ILsChatMessage, ILsChatUser } from '../../../interfaces'
import { delay } from '../../../utils'

let mockUser: ILsChatUser
let mockMessage: ILsChatMessage

let onCancelReplyingMessage: () => void

const ReplyingMessageA11yLabel = 'Chat replying message representation'
const ReplyingMessageUserImageA11yLabel = 'Replying Message User Photo'

describe('ReplyingMessage tests', () => {
    beforeEach(() => {
        onCancelReplyingMessage = jest.fn()

        mockUser = {
            id: '1',
            name: 'Test User',
            photo:
                'https://avatars3.githubusercontent.com/u/5066378?s=400&u=98d81da11220a6d0f7f51532e2c3e949b50a445b&v=4',
        }

        mockMessage = {
            id: '1',
            text: 'Replying Test Message',
            time: new Date().getTime(),
            isDelivered: true,
            isRead: true,
            user: mockUser,
        }
    })

    it('Should ReplyingMessage component render properly', () => {
        const { queryByA11yLabel, queryByText } = render(
            <ReplyingMessage
                user={mockUser}
                message={mockMessage}
                isVisible={true}
                onCancelReplyingMessage={onCancelReplyingMessage}
            />
        )
        const footer = queryByA11yLabel(ReplyingMessageA11yLabel)
        const userImage = queryByA11yLabel(ReplyingMessageUserImageA11yLabel)
        const userName = queryByText(mockUser.name)

        expect(footer).not.toBeNull()
        expect(userImage).not.toBeNull()
        expect(userImage.props['source'].uri).toBe(mockUser.photo)
        expect(userName).not.toBeNull()
    })
})
