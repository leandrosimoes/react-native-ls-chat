import * as React from 'react'
import {
    Animated,
    Easing,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { ILsChatMessage, ILsChatUser } from '../../interfaces'
import { COMMON_COLORS, ThemeContext } from '../../theme'
import { guid } from '../../utils'
import Message from '../Body/Message'
import Icon from '../Icon'
import { ICONS } from '../Icon/icons'

import styles from './styles'

interface IFooterProps {
    user: ILsChatUser
    replyingMessage?: ILsChatMessage
    onCancelReplyingMessage: { (): void }
    onSendMessage: { (message: ILsChatMessage): Promise<ILsChatMessage> }
    onSuccessSendMessage: { (message: ILsChatMessage): void }
    onErrorSendMessage: { (message: ILsChatMessage, error: any): void }
}

const Footer: React.FC<IFooterProps> = ({
    user,
    replyingMessage,
    onCancelReplyingMessage,
    onSendMessage,
    onSuccessSendMessage,
    onErrorSendMessage,
}) => {
    const theme = React.useContext(ThemeContext)
    const [message, setMessage] = React.useState('')
    const inputRef = React.useRef<TextInput>(null)
    const animatedTop = React.useRef(new Animated.Value(0)).current

    const slideUpAnimation = Animated.timing(animatedTop, {
        toValue: -80,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.in(Easing.elastic(1))
    })

    const slideDownAnimation = Animated.timing(animatedTop, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.elastic(1))
    })

    const themedStyle = styles({ theme })

    const onCancelReplyingMessageInternal = () => {
        slideDownAnimation.start(() => {
            onCancelReplyingMessage()
        })
    }

    const onSendButtonPress = async () => {
        if (!message) return

        const messageToSend: ILsChatMessage = {
            id: guid(),
            text: message,
            user,
            time: new Date().getTime(),
        }

        if (replyingMessage) {
            messageToSend.replyingTo = { ...replyingMessage }
        }

        onCancelReplyingMessage()
        setMessage('')
        inputRef?.current?.blur()

        try {
            const messageSend = await onSendMessage(messageToSend)

            if (messageSend) {
                onSuccessSendMessage(messageSend)
            } else {
                onErrorSendMessage(messageToSend, 'Unknown Error')
            }
        } catch (error) {
            onErrorSendMessage(messageToSend, error)
        }
    }

    if (replyingMessage) {
        slideUpAnimation.start()
    }

    return (
        <View style={themedStyle.container}>
            {replyingMessage && (
                <Animated.View style={[themedStyle.replyingMessageWrapper, { top: animatedTop }]}>
                    <Message
                        loggedUser={user}
                        message={replyingMessage}
                        showDateOnTop={false}
                        showUser={true}
                        onMessageItemLongPress={() => {}}
                        isSelected={false}
                    />
                    <TouchableWithoutFeedback onPress={onCancelReplyingMessageInternal}>
                        <View>
                            <Icon
                                path={ICONS.timesCircle}
                                fill={COMMON_COLORS.WHITE}
                                stroke={COMMON_COLORS.WHITE}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            )}
            <View style={themedStyle.controlsWrapper}>
                <TextInput
                    ref={inputRef}
                    style={themedStyle.input}
                    placeholder='Type your message here!'
                    placeholderTextColor={COMMON_COLORS.GREY}
                    multiline
                    value={message}
                    onChange={({ nativeEvent }) => setMessage(nativeEvent.text)}
                />
                <TouchableWithoutFeedback onPress={onSendButtonPress}>
                    <View style={themedStyle.sendButton}>
                        <Icon
                            path={ICONS.send}
                            fill={theme.PRIMARY_BUTTON_FG_COLOR}
                            stroke={theme.PRIMARY_BUTTON_FG_COLOR}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

export default Footer
