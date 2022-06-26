import * as React from 'react'
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    View,
} from 'react-native'

import { IBodyProps, ILsChatMessage } from '../../interfaces'
import { ThemeContext } from '../../theme'
import { TLsChatMessageDesign } from '../../types'
import Controls from './Controls'
import EmptyMessages from './EmptyMessages'
import LoadingIndicator from './LoadingIndicator'
import { MessageFromUser, MessageFromAnotherUser } from './Message'
import ScrollToBottomButton from './ScrollToBottomButton'
import styles from './styles'
import TypingIndicator from './TypingIndicator'

const Body: React.FC<IBodyProps> = ({
    messages,
    user,
    messageSelectionEnabled,
    isTyping,
    isFeching,
    isLoading,
    messageDateFormat,
    interfaceTexts,
    onReachEndOfMessagesList,
    onReplyControlPress,
    onDeleteMessage,
    onSuccessDeleteMessage,
    onErrorDeleteMessage,
}) => {
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })
    const messagesListRef = React.useRef<FlatList<TLsChatMessageDesign>>(null)
    const [selectedMessage, setSelectedMessage] = React.useState<
        ILsChatMessage | undefined
    >()
    const [showScrollToBottonButton, setShowScrollToBottonButton] =
        React.useState(false)

    let lastDate = React.useRef<Date | undefined>().current
    let lastUser = React.useRef<string>('0').current

    const onMessageItemLongPress = (message: ILsChatMessage) => {
        if (messageSelectionEnabled) setSelectedMessage(message)
    }

    const onDeleteControlButtonPress = async () => {
        if (!selectedMessage || selectedMessage.user.id !== user.id) return

        try {
            await onDeleteMessage(selectedMessage)
            onSuccessDeleteMessage(selectedMessage)
            setSelectedMessage(undefined)
        } catch (error) {
            onErrorDeleteMessage(error)
        }
    }

    const onReplyControlButtonPress = () => {
        if (!selectedMessage || !selectedMessage.id) return

        selectedMessage.text = `${selectedMessage.text.substr(0, 60)}...`

        onReplyControlPress(selectedMessage)

        setSelectedMessage(undefined)
    }

    const onPressControlBody = () => {
        setSelectedMessage(undefined)
    }

    const onMessageListScroll = (
        event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        setShowScrollToBottonButton(event.nativeEvent.contentOffset.y > 500)
    }

    const onScrollToBottomPress = () => {
        // eslint-disable-next-line no-unused-expressions
        messagesListRef.current?.scrollToOffset({
            animated: true,
            offset: 0,
        })
    }

    const formatedMessages: TLsChatMessageDesign[] = messages.map((message) => {
        const { time, user: messageUser } = message

        const messageDate = new Date(time)
        const showDateOnTop =
            !lastDate || lastDate.toDateString() !== messageDate.toDateString()

        const showArrow =
            !lastUser || lastUser !== messageUser.id || !!message.replyingTo

        lastDate = new Date(time)
        lastUser = messageUser.id

        return { ...message, showDateOnTop, showArrow }
    })

    return (
        <View style={themedStyles.container}>
            {!isLoading && (
                <Controls
                    message={selectedMessage}
                    user={user}
                    onPressControlBody={onPressControlBody}
                    onDeleteControlButtonPress={onDeleteControlButtonPress}
                    onReplyControlButtonPress={onReplyControlButtonPress}
                />
            )}
            <FlatList
                ref={messagesListRef}
                data={formatedMessages.reverse()}
                inverted={messages.length > 0}
                scrollEnabled={!isLoading}
                keyExtractor={(_, index) => index.toString()}
                ListFooterComponent={
                    <LoadingIndicator isFeching={isFeching || isLoading} />
                }
                ListHeaderComponent={<TypingIndicator isTyping={isTyping} />}
                ListEmptyComponent={
                    <EmptyMessages
                        isLoading={isLoading}
                        title={interfaceTexts?.emptyMessagesTitle}
                        message={interfaceTexts?.emptyMessagesMessage}
                        loadingMessage={interfaceTexts?.loading}
                    />
                }
                onEndReached={onReachEndOfMessagesList}
                onEndReachedThreshold={0.2}
                onScroll={onMessageListScroll}
                renderItem={({ item }) => {
                    if (user.id === item.user.id) {
                        return (
                            <MessageFromUser
                                user={user}
                                message={item}
                                showDateOnTop={item.showDateOnTop}
                                showArrow={item.showArrow}
                                messageDateFormat={messageDateFormat}
                                isSelected={selectedMessage?.id === item.id}
                                onMessageItemLongPress={onMessageItemLongPress}
                            />
                        )
                    }

                    return (
                        <MessageFromAnotherUser
                            user={user}
                            message={item}
                            showDateOnTop={item.showDateOnTop}
                            showArrow={item.showArrow}
                            messageDateFormat={messageDateFormat}
                            isSelected={selectedMessage?.id === item.id}
                            onMessageItemLongPress={onMessageItemLongPress}
                        />
                    )
                }}
            />
            <ScrollToBottomButton
                isVisible={showScrollToBottonButton}
                onPress={onScrollToBottomPress}
            />
        </View>
    )
}

export default Body
