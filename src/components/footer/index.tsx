import * as React from 'react'
import {
    NativeSyntheticEvent,
    TextInput,
    TextInputChangeEventData,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { ILsChatMessage, ILsChatUser } from '../../interfaces'
import { COMMON_COLORS, ThemeContext } from '../../theme'
import { guid } from '../../utils'
import Icon from '../Icon'
import { ICONS } from '../Icon/icons'
import ReplyingMessage from './ReplyingMessage'

import styles from './styles'

interface IFooterProps {
    user: ILsChatUser
    replyingMessage?: ILsChatMessage
    isLoading: boolean
    onMessageTextInputChange?: { (text: string): void }
    onCancelReplyingMessage: { (): void }
    onSendMessage: { (message: ILsChatMessage): Promise<ILsChatMessage> }
    onSuccessSendMessage: { (message: ILsChatMessage): void }
    onErrorSendMessage: { (message: ILsChatMessage, error: any): void }
}

const Footer: React.FC<IFooterProps> = ({
    user,
    replyingMessage,
    isLoading,
    onMessageTextInputChange,
    onCancelReplyingMessage,
    onSendMessage,
    onSuccessSendMessage,
    onErrorSendMessage,
}) => {
    const theme = React.useContext(ThemeContext)
    const themedStyle = styles({ theme })

    const [message, setMessage] = React.useState('')
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

    return (
        <View style={themedStyle.container} accessibilityLabel='Chat footer'>
            <ReplyingMessage
                user={user}
                message={replyingMessage}
                onCancelReplyingMessage={onCancelReplyingMessage}
            />
            <View style={themedStyle.controlsWrapper}>
                <TextInput
                    ref={inputRef}
                    style={themedStyle.input}
                    placeholder='Type your message here!'
                    placeholderTextColor={COMMON_COLORS.GREY}
                    multiline
                    value={message}
                    onChange={onMessageInputChangeInternal}
                    editable={!isLoading}
                    accessibilityLabel='Chat message input'
                />
                <TouchableWithoutFeedback
                    onPress={onSendButtonPress}
                    disabled={isLoading}
                    accessibilityLabel='Send chat message button'
                    accessibilityRole='button'>
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
