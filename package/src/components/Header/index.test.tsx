import React from 'react'

import { render } from '@testing-library/react-native'

import Header from '.'
import { ILsChatUser } from '../../interfaces'

let mockUser: ILsChatUser

describe('Header tests', () => {
    beforeEach(() => {
        mockUser = {
            id: '1',
            name: 'Test User',
            photo: 'https://avatars3.githubusercontent.com/u/5066378?s=400&u=98d81da11220a6d0f7f51532e2c3e949b50a445b&v=4',
        }
    })

    it('Should Header component render properly', () => {
        const testingTitle = 'Testing Title'
        const { queryByRole, queryByText } = render(
            <Header title={testingTitle} user={mockUser} />
        )
        const header = queryByRole('header')
        const testingTitleFound = queryByText(testingTitle)
        const image = queryByRole('image')!

        expect(header).not.toBeNull()
        expect(testingTitleFound).not.toBeNull()
        expect(image).not.toBeNull()
        expect(image.props.source.uri).toBe(mockUser.photo)
    })

    it('Should Header component NOT be rendered if "isVisible" props is equal to "false"', () => {
        const { queryByRole } = render(
            <Header isVisible={false} user={mockUser} />
        )
        const header = queryByRole('header')

        expect(header).toBeNull()
    })

    it('Should Header image NOT be rendered if user photo AND imageSource props are empty', () => {
        // Clean user photo to not render image
        mockUser.photo = ''

        const { queryByRole } = render(<Header user={mockUser} />)
        const header = queryByRole('header')
        const image = queryByRole('image')!

        expect(header).not.toBeNull()
        expect(image).toBeNull()
    })

    it('Should Header image be rendered with imageSource as image if both, user "photo" and "imageSource" are provided', () => {
        const mockImageSource = {
            uri: 'https://randomuser.me/api/portraits/women/66.jpg',
        }

        const { queryByRole } = render(
            <Header user={mockUser} imageSource={mockImageSource} />
        )
        const header = queryByRole('header')
        const image = queryByRole('image')!

        expect(header).not.toBeNull()
        expect(image).not.toBeNull()
        expect(image.props.source.uri).toBe(mockImageSource.uri)
    })
})
