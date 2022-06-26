import React from 'react'

import { render } from '@testing-library/react-native'

import ImageIcon, { ICONS } from '.'

describe('Icon tests', () => {
    it('Should Icon component render properly', () => {
        const { queryByLabelText } = render(<ImageIcon icon={ICONS.clock} />)

        const icon = queryByLabelText('Icon')

        expect(icon).not.toBeNull()
    })
})
