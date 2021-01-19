import * as React from 'react'
import { Animated, Easing, Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import { ILsChatMessage, ILsChatUser } from '../../../interfaces'
import { COMMON_COLORS, ThemeContext } from '../../../theme'
import Icon, { ICONS } from '../../Icon'

import styles from './styles'

interface IReplyingMessageProps {
    user: ILsChatUser
    message?: ILsChatMessage
    onCancelReplyingMessage: { (): void }
}

const ReplyingMessage: React.FC<IReplyingMessageProps> = ({
    user,
    message,
    onCancelReplyingMessage,
}) => {
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })
    const animatedTop = React.useRef(new Animated.Value(0)).current

    const slideUpAnimation = Animated.timing(animatedTop, {
        toValue: -80,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.in(Easing.elastic(1)),
    })

    const slideDownAnimation = Animated.timing(animatedTop, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.elastic(1)),
    })

    const onCancelReplyingMessageInternal = () => {
        slideDownAnimation.start(() => {
            onCancelReplyingMessage()
        })
    }

    if (message) {
        slideUpAnimation.start()
    } else {
        return null
    }

    const isFromUser = user.id === message?.user.id

    return (
        <Animated.View
            style={[themedStyles.container, { top: animatedTop }]}
            accessibilityLabel='Chat replying message representation'>
            <View
                style={[
                    themedStyles.message,
                    isFromUser ? themedStyles.messageFromUser : themedStyles.messageFromAnotherUser,
                ]}>
                <View style={themedStyles.messageUserWrapper}>
                    {message.user.photo && (
                        <Image
                            style={themedStyles.messageUserPhoto}
                            source={{ uri: message.user.photo }}
                            accessibilityLabel='Replying Message User Photo'
                            accessibilityRole='image'
                        />
                    )}
                    <Text
                        style={themedStyles.messageUserName}
                        accessibilityRole='text'
                        accessibilityLabel='Replying Message User Name'>
                        {message.user.name}
                    </Text>
                </View>
                <Text style={themedStyles.messageText}>{message.text}</Text>
            </View>
            <TouchableWithoutFeedback
                onPress={onCancelReplyingMessageInternal}
                accessibilityRole='button'
                accessibilityLabel='Cancel Message Reply Button'>
                <View style={themedStyles.closeButton}>
                    <Icon
                        path={ICONS.timesCircle}
                        fill={COMMON_COLORS.WHITE}
                        stroke={COMMON_COLORS.WHITE}
                    />
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    )
}

export default ReplyingMessage
