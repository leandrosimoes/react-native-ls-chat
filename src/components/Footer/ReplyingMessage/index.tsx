import * as React from 'react'
import { Animated, Easing, Image, Text, View } from 'react-native'
import { ILsChatMessage, ILsChatUser } from '../../../interfaces'
import { ThemeContext } from '../../../theme'

import styles from './styles'

interface IReplyingMessageProps {
    user: ILsChatUser
    message?: ILsChatMessage
    isVisible: boolean
    onCancelReplyingMessage: { (): void }
}

const ReplyingMessage: React.FC<IReplyingMessageProps> = ({
    user,
    message,
    isVisible,
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
        toValue: 10,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.elastic(1)),
    })

    React.useEffect(() => {
        if (isVisible) {
            slideUpAnimation.start()
        } else {
            slideDownAnimation.start(() => {
                onCancelReplyingMessage()
            })
        }
    }, [isVisible])

    if (!message) return null

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
        </Animated.View>
    )
}

export default ReplyingMessage
