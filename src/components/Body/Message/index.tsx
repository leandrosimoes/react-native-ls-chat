import * as React from 'react'
import { Animated, Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import { EStatusMessage } from '../../../enums'
import { IMessageProps, IReplyProps } from '../../../interfaces'
import { ThemeContext } from '../../../theme'
import { formatDate, getTimeProperly } from '../../../utils'
import ImageIcon from '../../ImageIcon'
import { ICONS } from '../../ImageIcon/ImageIcons'
import Arrow from './Arrow'

import styles from './styles'

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

type TReplyProps = React.PropsWithChildren<IReplyProps>

export const ReplyWrapper: React.FC<TReplyProps> = ({ children, message, user }) => {
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
        isFromUser ? themedStyles.messageFromUser : themedStyles.messageFromAnotherUser,
        themedStyles.replyingMessage,
    ]

    return (
        <View style={themedStyles.replyingWrapper} accessibilityLabel='Replying Message Wrapper'>
            <Text style={themedStyles.replyingText}>Replying to:</Text>
            <View style={messageStyle}>
                <View style={themedStyles.messageUserWrapper}>
                    {replyingUser.photo && (
                        <Image
                            style={themedStyles.messageUserPhoto}
                            source={{ uri: replyingUser.photo }}
                            accessibilityLabel='Replying Message User Photo'
                            accessibilityRole='image'
                        />
                    )}
                    <Text
                        style={themedStyles.messageUserName}
                        accessibilityLabel='Replying Message User Name'
                        accessibilityRole='text'>
                        {replyingUser.name}
                    </Text>
                </View>
                <Text style={themedStyles.messageText}>{text}</Text>
            </View>
            {children}
        </View>
    )
}

export const MessageFromUser: React.FC<IMessageProps> = ({
    user,
    message,
    showDateOnTop,
    showArrow,
    isSelected,
    messageDateFormat,
    onMessageItemLongPress,
}) => {
    const animatedOpacity = React.useRef(new Animated.Value(1)).current
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })
    const [isLoading, setIsLoading] = React.useState(true)

    const { time, text, isDelivered, isRead } = message
    const wrapperStyle = [themedStyles.messageWrapper, themedStyles.messageWrapperFromUser]
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
            onLongPress={() => onMessageItemLongPress(message)}
            accessibilityLabel='Message Wrapper'
            accessibilityHint='Ling press to select'
            accessibilityRole='button'>
            <View style={wrapperStyle}>
                {showDateOnTop && (
                    <Text
                        style={themedStyles.dateSeparator}
                        accessibilityLabel='Message Date'
                        accessibilityRole='text'>
                        {formatDate(messageDate, messageDateFormat)}
                    </Text>
                )}
                <ReplyWrapper message={message} user={user}>
                    <Animated.View
                        style={[messageStyle, { opacity: isLoading ? animatedOpacity : 1 }]}>
                        {(showDateOnTop || showArrow) && (
                            <Arrow position='right' isSelected={isSelected} />
                        )}
                        <Text style={themedStyles.messageText}>{text}</Text>
                        <Text style={themedStyles.messageDate}>{getTimeProperly(messageDate)}</Text>
                        {status === EStatusMessage.WAITING && (
                            <ImageIcon
                                style={themedStyles.messageStatusIcon}
                                icon={ICONS.clock}
                                width={13}
                                height={13}
                            />
                        )}
                        {status === EStatusMessage.DELIVERED && (
                            <ImageIcon style={themedStyles.messageStatusIcon} icon={ICONS.check} />
                        )}
                        {status === EStatusMessage.VIEWED && (
                            <ImageIcon
                                style={[
                                    themedStyles.messageStatusIcon,
                                    themedStyles.messageStatusDeliveredIcon,
                                ]}
                                icon={ICONS.checkDouble}
                            />
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
    messageDateFormat,
    onMessageItemLongPress,
}) => {
    const animatedOpacity = React.useRef(new Animated.Value(1)).current
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })
    const [isLoading, setIsLoading] = React.useState(true)

    const { user: messageUser, time, text, isDelivered, isRead } = message
    const wrapperStyle = [themedStyles.messageWrapper, themedStyles.messageWrapperFromAnotherUser]
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
            onLongPress={() => onMessageItemLongPress(message)}
            accessibilityLabel='Message Wrapper'
            accessibilityHint='Ling press to select'
            accessibilityRole='button'>
            <View style={wrapperStyle}>
                {showDateOnTop && (
                    <Text
                        style={themedStyles.dateSeparator}
                        accessibilityLabel='Message Date'
                        accessibilityRole='text'>
                        {formatDate(messageDate, messageDateFormat)}
                    </Text>
                )}
                <ReplyWrapper message={message} user={user}>
                    <Animated.View
                        style={[messageStyle, { opacity: isLoading ? animatedOpacity : 1 }]}>
                        {(showDateOnTop || showArrow) && (
                            <Arrow position='left' isSelected={isSelected} />
                        )}
                        <View style={themedStyles.messageUserWrapper}>
                            {message.user.photo && (
                                <Image
                                    style={themedStyles.messageUserPhoto}
                                    source={{ uri: message.user.photo }}
                                    accessibilityLabel='Message User Photo'
                                    accessibilityRole='image'
                                />
                            )}
                            <Text
                                style={themedStyles.messageUserName}
                                accessibilityLabel='Message User Name'
                                accessibilityRole='text'>
                                {messageUser.name}
                            </Text>
                        </View>
                        <Text
                            style={themedStyles.messageText}
                            accessibilityLabel='Message Text'
                            accessibilityRole='text'>
                            {text}
                        </Text>
                        <Text
                            style={themedStyles.messageDate}
                            accessibilityLabel='Message Hour'
                            accessibilityRole='text'>
                            {getTimeProperly(messageDate)}
                        </Text>
                        {status === EStatusMessage.WAITING && (
                            <ImageIcon
                                style={themedStyles.messageStatusIcon}
                                icon={ICONS.clock}
                                width={13}
                                height={13}
                            />
                        )}
                        {status === EStatusMessage.DELIVERED && (
                            <ImageIcon style={themedStyles.messageStatusIcon} icon={ICONS.check} />
                        )}
                        {status === EStatusMessage.VIEWED && (
                            <ImageIcon
                                style={[
                                    themedStyles.messageStatusIcon,
                                    themedStyles.messageStatusDeliveredIcon,
                                ]}
                                icon={ICONS.checkDouble}
                            />
                        )}
                    </Animated.View>
                </ReplyWrapper>
            </View>
        </TouchableWithoutFeedback>
    )
}

/* eslint-disable @typescript-eslint/naming-convention */
export default {
    MessageFromUser,
    MessageFromAnotherUser,
    ReplyWrapper,
}
/* eslint-enable @typescript-eslint/naming-convention */
