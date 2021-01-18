import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { COMMON_COLORS } from '../../../theme'
import Icon, { EIconSize } from '../../Icon'
import { ICONS } from '../../Icon/icons'

import styles from './styles'

interface IScrollToBottomButtonProps {
    isVisible: boolean
    onPress: { (): void }
}

const ScrollToBottomButton: React.FC<IScrollToBottomButtonProps> = ({
    isVisible,
    onPress,
}) => {
    if (!isVisible) return null

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            accessibilityLabel='Button to scroll the list of messsages back to bottom'
            accessibilityRole='button'>
            <View style={styles.container}>
                <Icon
                    path={ICONS.chevronDownCircle}
                    fill={COMMON_COLORS.BLUE}
                    stroke={COMMON_COLORS.BLUE}
                    size={EIconSize.MEDIUM}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ScrollToBottomButton
