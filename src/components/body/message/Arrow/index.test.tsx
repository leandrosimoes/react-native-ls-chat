import React from 'react'
import { render } from '@testing-library/react-native'

import Arrow from '.'

const ArrowA11yLabel = 'Message Arrow'

describe('Message tests', () => {
    it('Should MessageFromUser component render properly', () => {
        const { queryByA11yLabel } = render(
            <Arrow isSelected={false} position='left' />
        )

        const arrow = queryByA11yLabel(ArrowA11yLabel)

        expect(arrow).not.toBeNull()
    })
})
