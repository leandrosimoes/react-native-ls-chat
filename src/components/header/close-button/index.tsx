import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

import COLORS from '../../../colors'
import Icon, { ICONS } from '../../icon'
import { IHeaderProps } from '../../../interfaces'

const CloseButton: React.FC<IHeaderProps> = ({ onCloseButtonPress }) => {
    if (onCloseButtonPress === undefined) return null

    return (
        <TouchableWithoutFeedback onPress={onCloseButtonPress}>
            <View
                style={{
                    height: 60,
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Icon path={ICONS.timesCircle} fill={COLORS.CLOSE_ICON_COLOR} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CloseButton
