import React from 'react'

import { render } from '@testing-library/react-native'

import Arrow from '.'

const ArrowA11yLabel = 'Message Arrow'

describe('Message tests', () => {
    it('Should MessageFromUser component render properly', () => {
        const { queryByLabelText } = render(
            <Arrow isSelected={false} position='left' />
        )

        const arrow = queryByLabelText(ArrowA11yLabel)

        expect(arrow).not.toBeNull()
    })
})
