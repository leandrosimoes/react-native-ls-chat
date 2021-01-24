import React from 'react'
import { render } from '@testing-library/react-native'

import SvgIcon, { ICONS } from '.'
import { COMMON_COLORS } from '../../theme'

describe('Icon tests', () => {
    it('Should Icon component render properly', () => {
        const { queryByA11yLabel } = render(
            <SvgIcon
                path={ICONS.clock}
                fill={COMMON_COLORS.BLACK}
                stroke={COMMON_COLORS.BLACK}
            />
        )

        const icon = queryByA11yLabel('Icon')

        expect(icon).not.toBeNull()
    })

    it('Should Icon component NOT render if prop "path" is not provided', () => {
        const { queryByA11yLabel } = render(
            <SvgIcon
                path={[]}
                fill={COMMON_COLORS.BLACK}
                stroke={COMMON_COLORS.BLACK}
            />
        )

        const icon = queryByA11yLabel('Icon')

        expect(icon).toBeNull()
    })
})
