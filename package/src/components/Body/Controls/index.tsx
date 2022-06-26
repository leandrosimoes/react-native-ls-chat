import * as React from 'react'
import {
    Animated,
    Easing,
    GestureResponderEvent,
    TouchableWithoutFeedback,
    View,
} from 'react-native'

import { IControlsProps } from '../../../interfaces'
import { ThemeContext } from '../../../theme'
import ImageIcon from '../../ImageIcon'
import { ICONS } from '../../ImageIcon/ImageIcons'
import styles from './styles'

const Controls: React.FC<IControlsProps> = ({
    message,
    user,
    onPressControlBody,
    onReplyControlButtonPress,
    onDeleteControlButtonPress,
}) => {
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })
    const animatedTop = React.useRef(new Animated.Value(-60)).current

    const slideUpAnimation = Animated.timing(animatedTop, {
        toValue: -60,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.elastic(1)),
    })

    const slideDownAnimation = Animated.timing(animatedTop, {
        toValue: -10,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.in(Easing.elastic(1)),
    })

    const onPressControlBodyInternal = (event: GestureResponderEvent) => {
        slideUpAnimation.start(() => {
            onPressControlBody(event)
        })
    }

    if (!message) return null

    slideDownAnimation.start()

    const { isDelivered, isRead } = message
    const isUserMessage = message.user.id === user.id

    return (
        <TouchableWithoutFeedback
            onPress={onPressControlBodyInternal}
            accessibilityLabel='Selected Message Action Controls'
            accessibilityRole='button'>
            <View style={themedStyles.container}>
                <Animated.View
                    style={[
                        themedStyles.controlsWrapper,
                        { top: animatedTop },
                    ]}>
                    {(isDelivered || isRead) && (
                        <TouchableWithoutFeedback
                            onPress={onReplyControlButtonPress}
                            accessibilityRole='button'
                            accessibilityLabel='Reply Message Control Button'>
                            <View
                                style={[
                                    themedStyles.controlButton,
                                    themedStyles.controlButtonBordered,
                                ]}>
                                <ImageIcon icon={ICONS.reply} />
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    {isUserMessage && (
                        <TouchableWithoutFeedback
                            onPress={onDeleteControlButtonPress}
                            accessibilityRole='button'
                            accessibilityLabel='Delete Message Control Button'>
                            <View style={themedStyles.controlButton}>
                                <ImageIcon icon={ICONS.trash} />
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Controls
