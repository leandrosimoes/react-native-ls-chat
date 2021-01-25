import React from 'react'
import { render } from '@testing-library/react-native'

import ImageIcon, { ICONS } from '.'

describe('Icon tests', () => {
    it('Should Icon component render properly', () => {
        const { queryByA11yLabel } = render(<ImageIcon icon={ICONS.clock} />)

        const icon = queryByA11yLabel('Icon')

        expect(icon).not.toBeNull()
    })
})
