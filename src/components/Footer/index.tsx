import * as React from 'react'
import {
    NativeSyntheticEvent,
    TextInput,
    TextInputChangeEventData,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { IFooterProps, ILsChatMessage } from '../../interfaces'
import { COMMON_COLORS, ThemeContext } from '../../theme'
import { guid } from '../../utils'
import ImageIcon, { ICONS } from '../ImageIcon'
import ReplyingMessage from './ReplyingMessage'

import styles from './styles'

const Footer: React.FC<IFooterProps> = ({
    user,
    replyingMessage,
    isLoading,
    interfaceTexts,
    onMessageTextInputChange,
    onCancelReplyingMessage,
    onSendMessage,
    onSuccessSendMessage,
    onErrorSendMessage,
}) => {
    const theme = React.useContext(ThemeContext)
    const themedStyle = styles({ theme })

    const [message, setMessage] = React.useState('')
    const [isReplyingMessage, setIsReplyingMessage] = React.useState(false)
    const inputRef = React.useRef<TextInput>(null)

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

        // eslint-disable-next-line no-unused-expressions
        inputRef?.current?.blur()

        try {
            const finalMessage = await onSendMessage(messageToSend)

            if (finalMessage) {
                onSuccessSendMessage(finalMessage)
            } else {
                onErrorSendMessage(messageToSend, 'Unknown Error')
            }
        } catch (error) {
            onErrorSendMessage(messageToSend, error)
        }
    }

    const onMessageInputChangeInternal = ({
        nativeEvent,
    }: NativeSyntheticEvent<TextInputChangeEventData>) => {
        if (onMessageTextInputChange) onMessageTextInputChange(nativeEvent.text)

        setMessage(nativeEvent.text)
    }

    const onCancelReplyingMessageInternal = () => {
        setIsReplyingMessage(false)
    }

    React.useEffect(() => {
        setIsReplyingMessage(!!replyingMessage)
    }, [replyingMessage])

    return (
        <View style={themedStyle.container} accessibilityLabel='Chat footer'>
            <ReplyingMessage
                user={user}
                message={replyingMessage}
                isVisible={isReplyingMessage}
                onCancelReplyingMessage={onCancelReplyingMessage}
            />
            <View style={themedStyle.controlsWrapper}>
                <TextInput
                    ref={inputRef}
                    style={themedStyle.input}
                    placeholder={
                        interfaceTexts?.messageInputPlaceholder || 'Type your message here!'
                    }
                    placeholderTextColor={COMMON_COLORS.GREY}
                    multiline
                    value={message}
                    onChange={onMessageInputChangeInternal}
                    editable={!isLoading}
                    accessibilityLabel='Chat message input'
                />
                {isReplyingMessage && (
                    <TouchableWithoutFeedback onPress={onCancelReplyingMessageInternal}>
                        <View style={themedStyle.cancelReplyButton}>
                            <ImageIcon icon={ICONS.closeWhite} />
                        </View>
                    </TouchableWithoutFeedback>
                )}
                <TouchableWithoutFeedback
                    onPress={onSendButtonPress}
                    disabled={isLoading}
                    accessibilityLabel='Send chat message button'
                    accessibilityRole='button'>
                    <View style={themedStyle.sendButton}>
                        <ImageIcon icon={ICONS.send} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

export default Footer
