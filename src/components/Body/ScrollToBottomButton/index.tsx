import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import ImageIcon from '../../ImageIcon'
import { ICONS } from '../../ImageIcon/ImageIcons'

import styles from './styles'

interface IScrollToBottomButtonProps {
    isVisible: boolean
    onPress: { (): void }
}

const ScrollToBottomButton: React.FC<IScrollToBottomButtonProps> = ({ isVisible, onPress }) => {
    if (!isVisible) return null

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            accessibilityLabel='Button to scroll the list of messsages back to bottom'
            accessibilityRole='button'>
            <View style={styles.container}>
                <ImageIcon icon={ICONS.chevronDownCircle} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ScrollToBottomButton
