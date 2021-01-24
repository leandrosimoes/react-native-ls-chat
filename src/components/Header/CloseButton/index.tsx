import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

import { IHeaderProps } from '../../../interfaces'
import { ThemeContext } from '../../../theme'

import SvgIcon, { ICONS } from '../../SvgIcon'

const CloseButton: React.FC<IHeaderProps> = ({ onCloseButtonPress }) => {
    const theme = React.useContext(ThemeContext)

    if (onCloseButtonPress === undefined) return null

    return (
        <TouchableWithoutFeedback
            onPress={onCloseButtonPress}
            accessibilityLabel='Close chat button'
            accessibilityRole='button'>
            <View
                style={{
                    height: 60,
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <SvgIcon
                    path={ICONS.timesCircle}
                    fill={theme.CLOSE_ICON_FG_COLOR}
                    stroke={theme.CLOSE_ICON_FG_COLOR}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CloseButton
