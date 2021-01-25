import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

import { IHeaderProps } from '../../../interfaces'

import ImageIcon, { ICONS } from '../../ImageIcon'

const CloseButton: React.FC<IHeaderProps> = ({ onCloseButtonPress }) => {
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
                <ImageIcon icon={ICONS.close} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CloseButton
