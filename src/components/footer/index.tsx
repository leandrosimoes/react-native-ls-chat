import * as React from 'react'
import { TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { ILsChatMessage, ILsChatUser } from '../../interfaces'
import { COMMON_COLORS, ThemeContext } from '../../theme'
import Icon from '../Icon'
import { ICONS } from '../Icon/icons'

import styles from './styles'

interface IFooterProps {
    user: ILsChatUser
    onSendMessage: { (message: ILsChatMessage): Promise<ILsChatMessage> }
    onSuccessSendMessage: { (message: ILsChatMessage): void }
    onErrorSendMessage: { (error: any): void }
}

const Footer: React.FC<IFooterProps> = ({ user, onSendMessage, onSuccessSendMessage, onErrorSendMessage }) => {
    const theme = React.useContext(ThemeContext)
    const [message, setMessage] = React.useState('')
    const inputRef = React.useRef<TextInput>(null)

    const themedStyle = styles({ theme })

    const onSendButtonPress = async () => {
        if (!message) return

        try {
            const messageSend = await onSendMessage({
                id: 0,
                text: message,
                user,
                time: new Date().getTime()
            })

            if (messageSend) {
                setMessage('')
                inputRef?.current?.blur()
                onSuccessSendMessage(messageSend)
            } else {
                onErrorSendMessage('Unknown Error')
            }
        } catch (error) {
            onErrorSendMessage(error)
        }
    }

    return (
        <View style={themedStyle.container}>
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
                    <Icon path={ICONS.send} fill={theme.PRIMARY_BUTTON_FG_COLOR} stroke={theme.PRIMARY_BUTTON_FG_COLOR} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Footer
