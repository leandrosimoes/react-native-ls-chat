import * as React from 'react'
import {
    Animated,
    Image,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { ILsChatMessage, ILsChatUser } from '../../../interfaces'
import { ThemeContext } from '../../../theme'
import Icon, { EIconSize } from '../../Icon'
import Arrow from './Arrow'

import { ICONS } from '../../Icon/icons'
import styles from './styles'

enum EStatusMessage {
    WAITING,
    DELIVERED,
    VIEWED,
}

const pulseAnimation = (animatedOpacity: Animated.Value) =>
    Animated.loop(
        Animated.sequence([
            Animated.timing(animatedOpacity, {
                toValue: 0.5,
                duration: 1000,
                useNativeDriver: false,
            }),
            Animated.timing(animatedOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            }),
        ])
    )

interface IReplyProps {
    user: ILsChatUser
    message: ILsChatMessage | undefined
}

type TReplyProps = React.PropsWithChildren<IReplyProps>

const ReplyWrapper: React.FC<TReplyProps> = ({ children, message, user }) => {
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })

    if (!children || !message) return null

    if (!message.replyingTo) {
        return <>{children}</>
    }

    const { user: replyingUser, text } = message.replyingTo
    const isFromUser = replyingUser.id === user.id

    const messageStyle = [
        themedStyles.message,
        isFromUser
            ? themedStyles.messageFromUser
            : themedStyles.messageFromAnotherUser,
        themedStyles.replyingMessage,
    ]

    return (
        <View style={themedStyles.replyingWrapper}>
            <Text style={themedStyles.replyingText}>Replying to:</Text>
            <View style={messageStyle}>
                <View style={themedStyles.messageUserWrapper}>
                    {replyingUser.photo && (
                        <Image
                            style={themedStyles.messageUserPhoto}
                            source={{ uri: replyingUser.photo }}
                        />
                    )}
                    <Text style={themedStyles.messageUserName}>
                        {replyingUser.name}
                    </Text>
                </View>
                <Text style={themedStyles.messageText}>{text}</Text>
            </View>
            {children}
        </View>
    )
}

interface IMessageProps {
    user: ILsChatUser
    message: ILsChatMessage
    showDateOnTop: boolean
    showArrow: boolean
    isSelected: boolean
    onMessageItemLongPress: {
        (message: ILsChatMessage): void
    }
}

export const MessageFromUser: React.FC<IMessageProps> = ({
    user,
    message,
    showDateOnTop,
    showArrow,
    isSelected,
    onMessageItemLongPress,
}) => {
    const animatedOpacity = React.useRef(new Animated.Value(1)).current
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })
    const [isLoading, setIsLoading] = React.useState(true)

    const { time, text, isDelivered, isRead } = message
    const wrapperStyle = [
        themedStyles.messageWrapper,
        themedStyles.messageWrapperFromUser,
    ]
    const messageStyle = [
        themedStyles.message,
        themedStyles.messageFromUser,
        isSelected ? themedStyles.messageSelected : {},
    ]
    const messageDate = new Date(time)
    const status =
        !isDelivered && !isRead
            ? EStatusMessage.WAITING
            : !isRead
            ? EStatusMessage.DELIVERED
            : EStatusMessage.VIEWED

    React.useEffect(() => {
        if (status === EStatusMessage.WAITING) {
            setIsLoading(true)
            pulseAnimation(animatedOpacity).start()
        } else {
            setIsLoading(false)
            pulseAnimation(animatedOpacity).stop()
        }
    }, [message])

    return (
        <TouchableWithoutFeedback
            onLongPress={() => onMessageItemLongPress(message)}>
            <View style={wrapperStyle}>
                {showDateOnTop && (
                    <Text style={themedStyles.dateSeparator}>
                        {messageDate.toDateString()}
                    </Text>
                )}
                <ReplyWrapper message={message} user={user}>
                    <Animated.View
                        style={[
                            messageStyle,
                            { opacity: isLoading ? animatedOpacity : 1 },
                        ]}>
                        {(showDateOnTop || showArrow) && (
                            <Arrow position='right' isSelected={isSelected} />
                        )}
                        <Text style={themedStyles.messageText}>{text}</Text>
                        <Text style={themedStyles.messageDate}>
                            {`${messageDate.getHours()}:${messageDate.getMinutes()}`}
                        </Text>
                        {status === EStatusMessage.WAITING && (
                            <Icon
                                style={themedStyles.messageStatusIcon}
                                path={ICONS.clock}
                                fill={theme.MESSAGE_PENDING_ICON_COLOR}
                                stroke={theme.MESSAGE_PENDING_ICON_COLOR}
                                size={EIconSize.TINY}
                            />
                        )}
                        {status === EStatusMessage.DELIVERED && (
                            <Icon
                                style={themedStyles.messageStatusIcon}
                                path={ICONS.check}
                                fill={theme.MESSAGE_DELIVERY_ICON_COLOR}
                                stroke={theme.MESSAGE_DELIVERY_ICON_COLOR}
                                size={EIconSize.TINY}
                            />
                        )}
                        {status === EStatusMessage.VIEWED && (
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
                    </Animated.View>
                </ReplyWrapper>
            </View>
        </TouchableWithoutFeedback>
    )
}

export const MessageFromAnotherUser: React.FC<IMessageProps> = ({
    user,
    message,
    showDateOnTop,
    showArrow,
    isSelected,
    onMessageItemLongPress,
}) => {
    const animatedOpacity = React.useRef(new Animated.Value(1)).current
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })
    const [isLoading, setIsLoading] = React.useState(true)

    const { user: messageUser, time, text, isDelivered, isRead } = message
    const wrapperStyle = [
        themedStyles.messageWrapper,
        themedStyles.messageWrapperFromAnotherUser,
    ]
    const messageStyle = [
        themedStyles.message,
        themedStyles.messageFromAnotherUser,
        isSelected ? themedStyles.messageSelected : {},
    ]
    const messageDate = new Date(time)
    const status =
        !isDelivered && !isRead
            ? EStatusMessage.WAITING
            : !isRead
            ? EStatusMessage.DELIVERED
            : EStatusMessage.VIEWED

    React.useEffect(() => {
        if (status === EStatusMessage.WAITING) {
            setIsLoading(true)
            pulseAnimation(animatedOpacity).start()
        } else {
            setIsLoading(false)
            pulseAnimation(animatedOpacity).stop()
        }
    }, [message])

    return (
        <TouchableWithoutFeedback
            onLongPress={() => onMessageItemLongPress(message)}>
            <View style={wrapperStyle}>
                {showDateOnTop && (
                    <Text style={themedStyles.dateSeparator}>
                        {messageDate.toDateString()}
                    </Text>
                )}
                <ReplyWrapper message={message} user={user}>
                    <Animated.View
                        style={[
                            messageStyle,
                            { opacity: isLoading ? animatedOpacity : 1 },
                        ]}>
                        {(showDateOnTop || showArrow) && (
                            <Arrow position='left' isSelected={isSelected} />
                        )}
                        <View style={themedStyles.messageUserWrapper}>
                            {message.user.photo && (
                                <Image
                                    style={themedStyles.messageUserPhoto}
                                    source={{ uri: message.user.photo }}
                                />
                            )}
                            <Text style={themedStyles.messageUserName}>
                                {messageUser.name}
                            </Text>
                        </View>
                        <Text style={themedStyles.messageText}>{text}</Text>
                        <Text style={themedStyles.messageDate}>
                            {`${messageDate.getHours()}:${messageDate.getMinutes()}`}
                        </Text>
                        {status === EStatusMessage.WAITING && (
                            <Icon
                                style={themedStyles.messageStatusIcon}
                                path={ICONS.clock}
                                fill={theme.MESSAGE_PENDING_ICON_COLOR}
                                stroke={theme.MESSAGE_PENDING_ICON_COLOR}
                                size={EIconSize.TINY}
                            />
                        )}
                        {status === EStatusMessage.DELIVERED && (
                            <Icon
                                style={themedStyles.messageStatusIcon}
                                path={ICONS.check}
                                fill={theme.MESSAGE_DELIVERY_ICON_COLOR}
                                stroke={theme.MESSAGE_DELIVERY_ICON_COLOR}
                                size={EIconSize.TINY}
                            />
                        )}
                        {status === EStatusMessage.VIEWED && (
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
                    </Animated.View>
                </ReplyWrapper>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default {
    MessageFromUser,
    MessageFromAnotherUser,
}
