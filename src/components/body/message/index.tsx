import * as React from 'react'
import { Animated, Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import { ILsChatMessage, ILsChatUser } from '../../../interfaces'
import { ThemeContext } from '../../../theme'
import Icon, { EIconSize } from '../../Icon'
import Arrow from './Arrow'

import { ICONS } from '../../Icon/icons'
import styles from './styles'

interface IMessageProps {
    loggedUser: ILsChatUser
    message: ILsChatMessage
    showDateOnTop: boolean
    showUser: boolean
    isSelected: boolean
    onMessageItemLongPress: {
        (message: ILsChatMessage): void
    }
}

enum EStatusMessage {
    WAITING,
    DELIVERED,
    VIEWED,
}

const Message: React.FC<IMessageProps> = ({
    loggedUser,
    message,
    showDateOnTop,
    showUser,
    isSelected,
    onMessageItemLongPress,
}) => {
    const animatedOpacity = React.useRef(new Animated.Value(1)).current
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })
    const [isLoading, setIsLoading] = React.useState(true)

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
        isSelected 
            ? themedStyles.messageSelected 
            : {}
    ]
    const messageDate = new Date(time)
    const status = !isDelivered && !isRead
        ? EStatusMessage.WAITING
        : !isRead
        ? EStatusMessage.DELIVERED
        : EStatusMessage.VIEWED

    const pulseAnimation = Animated.loop(
        Animated.sequence(
            [
                Animated.timing(
                    animatedOpacity,
                    {
                        toValue: 0.5,
                        duration: 1000,
                        useNativeDriver: false,
                    }
                ),
                Animated.timing(
                    animatedOpacity,
                    {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: false,
                    }
                )
            ]
        )
    )

    React.useEffect(() => {
        if (status === EStatusMessage.WAITING) {
            setIsLoading(true)
            pulseAnimation.start()
        } else {
            setIsLoading(false)
            pulseAnimation.stop()
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
                <Animated.View style={[messageStyle, { opacity: isLoading ? animatedOpacity : 1 }]}>
                    {isFromCurrentUser && showUser && (
                        <Arrow position='right' isSelected={isSelected} />
                    )}
                    {!isFromCurrentUser && showUser && (
                        <Arrow position='left' isSelected={isSelected} />
                    )}
                    {!isFromCurrentUser && showUser && (
                        <View style={themedStyles.messageUserWrapper}>
                            {loggedUser.photo && (
                                <Image
                                    style={themedStyles.messageUserPhoto}
                                    source={{ uri: loggedUser.photo }}
                                />
                            )}
                            <Text style={themedStyles.messageUserName}>
                                {messageUser.name}
                            </Text>
                        </View>
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
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Message
