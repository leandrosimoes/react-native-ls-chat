import * as React from 'react'
import {
    Animated,
    Easing,
    GestureResponderEvent,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { ILsChatMessage, ILsChatUser } from '../../../interfaces'
import { COMMON_COLORS, ThemeContext } from '../../../theme'
import Icon from '../../Icon'
import icons from '../../Icon/icons'
import styles from './styles'

interface IControlsProps {
    message: ILsChatMessage | undefined
    loggedUser: ILsChatUser
    onPressControlBody: { (event: GestureResponderEvent): void }
    onDeleteControlButtonPress: { (event: GestureResponderEvent): void }
    onReplyControlButtonPress: { (event: GestureResponderEvent): void }
}

const Controls: React.FC<IControlsProps> = ({
    message,
    loggedUser,
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
        easing: Easing.out(Easing.elastic(1))
    })

    const slideDownAnimation = Animated.timing(animatedTop, {
        toValue: -10,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.in(Easing.elastic(1))
    })

    const onPressControlBodyInternal = (event: GestureResponderEvent) => {
        slideUpAnimation.start(() => {
            onPressControlBody(event)
        })
    }

    if (!message) return null

    slideDownAnimation.start()

    const { isDelivered, isRead } = message
    const isUserMessage = message.user.id === loggedUser.id

    return (
        <TouchableWithoutFeedback onPress={onPressControlBodyInternal}>
            <View style={themedStyles.container}>
                <Animated.View style={[themedStyles.controlsWrapper, { top: animatedTop }]}>
                    {(isDelivered || isRead) && (
                        <TouchableWithoutFeedback onPress={onReplyControlButtonPress}>
                            <View
                                style={[
                                    themedStyles.controlButton,
                                    themedStyles.controlButtonBordered,
                                ]}>
                                <Icon
                                    path={icons.reply}
                                    fill={COMMON_COLORS.WHITE}
                                    stroke={COMMON_COLORS.WHITE}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    {isUserMessage && (
                        <TouchableWithoutFeedback
                            onPress={onDeleteControlButtonPress}>
                            <View style={themedStyles.controlButton}>
                                <Icon
                                    path={icons.trash}
                                    fill={COMMON_COLORS.WHITE}
                                    stroke={COMMON_COLORS.WHITE}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Controls
