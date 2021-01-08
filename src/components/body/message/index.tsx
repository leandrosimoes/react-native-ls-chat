import * as React from 'react'
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import { ILsChatMessage, ILsChatUser } from '../../../interfaces'
import { ThemeContext } from '../../../theme'
import Icon, { EIconSize } from '../../Icon'

import { ICONS } from '../../Icon/icons'
import styles from './styles'

interface IMessageProps {
    loggedUser: ILsChatUser
    message: ILsChatMessage
    showDateOnTop: boolean
    showUser: boolean
    onMessageItemLongPress: {
        (message: ILsChatMessage, loggedUser: ILsChatUser): void
    }
}

const Message: React.FC<IMessageProps> = ({
    loggedUser,
    message,
    showDateOnTop,
    showUser,
    onMessageItemLongPress,
}) => {
    const theme = React.useContext(ThemeContext)

    const themedStyles = styles({ theme })

    const { user: messageUser, time, text, isDelivered, isRead } = message
    const isFromCurrentUser = loggedUser.id === messageUser.id
    const wrapperStyle = [
        themedStyles.messageWrapper,
        isFromCurrentUser
            ? themedStyles.messageWrapperFromUser
            : themedStyles.messageWrapperFromAnotherUser,
    ]
    const messageStyle = [
        themedStyles.message,
        isFromCurrentUser
            ? themedStyles.messageFromUser
            : themedStyles.messageFromAnotherUser,
    ]
    const messageDate = new Date(time)

    return (
        <TouchableWithoutFeedback
            onLongPress={() => onMessageItemLongPress(message, loggedUser)}>
            <View style={wrapperStyle}>
                {showDateOnTop && (
                    <Text style={themedStyles.dateSeparator}>
                        {messageDate.toDateString()}
                    </Text>
                )}
                <View style={messageStyle}>
                    {!isFromCurrentUser && showUser && (
                        <View style={themedStyles.messageUserWrapper}>
                            {loggedUser.photo && <Image style={themedStyles.messageUserPhoto} source={{ uri: loggedUser.photo }} />}
                            <Text style={themedStyles.messageUserName}>
                                {messageUser.name}
                            </Text>
                        </View>
                    )}
                    <Text style={themedStyles.messageText}>{text}</Text>
                    <Text style={themedStyles.messageDate}>
                        {`${messageDate.getHours()}:${messageDate.getMinutes()}`}
                    </Text>
                    {!isDelivered && !isRead && (
                        <Icon
                            style={themedStyles.messageStatusIcon}
                            path={ICONS.clock}
                            fill={theme.MESSAGE_PENDING_ICON_COLOR}
                            stroke={theme.MESSAGE_PENDING_ICON_COLOR}
                            size={EIconSize.TINY}
                        />
                    )}
                    {isDelivered && !isRead && (
                        <Icon
                            style={themedStyles.messageStatusIcon}
                            path={ICONS.check}
                            fill={theme.MESSAGE_DELIVERY_ICON_COLOR}
                            stroke={theme.MESSAGE_DELIVERY_ICON_COLOR}
                            size={EIconSize.TINY}
                        />
                    )}
                    {isRead && (
                        <>
                            <Icon
                                style={[
                                    themedStyles.messageStatusIcon,
                                    themedStyles.messageStatusDeliveredIcon1,
                                ]}
                                path={ICONS.check}
                                fill={theme.MESSAGE_READ_ICON_COLOR}
                                stroke={theme.MESSAGE_READ_ICON_COLOR}
                                size={EIconSize.TINY}
                            />
                            <Icon
                                style={[
                                    themedStyles.messageStatusIcon,
                                    themedStyles.messageStatusDeliveredIcon2,
                                ]}
                                path={ICONS.check}
                                fill={theme.MESSAGE_READ_ICON_COLOR}
                                stroke={theme.MESSAGE_READ_ICON_COLOR}
                                size={EIconSize.TINY}
                            />
                        </>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Message
