import * as React from 'react'
import { FlatList, View } from 'react-native'

import { ILsChatMessage, ILsChatUser } from '../../interfaces'
import { ThemeContext } from '../../theme'
import { MessageFromUser, MessageFromAnotherUser } from './Message'
import EmptyMessages from './EmptyMessages'

import styles from './styles'
import Controls from './Controls'
import TypingIndicator from './TypingIndicator'
import LoadingIndicator from './LoadingIndicator'

interface IBodyProps {
    user: ILsChatUser
    messages: ILsChatMessage[]
    messageSelectionEnabled: boolean
    isTyping: boolean
    isFeching: boolean
    onReachEndOfMessagesList?: { (info: { distanceFromEnd: number; }): void }
    onReplyControlPress: { (replyingMessage: ILsChatMessage): void }
    onDeleteMessage: { (message: ILsChatMessage): Promise<ILsChatMessage> }
    onSuccessDeleteMessage: { (message: ILsChatMessage): void }
    onErrorDeleteMessage: { (error: any): void }
}

type TLsChatMessageDesign = ILsChatMessage & {
    showDateOnTop: boolean
    showArrow: boolean
}

const Body: React.FC<IBodyProps> = ({
    messages,
    user,
    messageSelectionEnabled,
    isTyping,
    isFeching,
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

    let lastDate = React.useRef<Date | undefined>().current
    let lastUser = React.useRef<number>(0).current

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
            onErrorDeleteMessage(selectedMessage)
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

    if (!messages || messages.length === 0) return <EmptyMessages />

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
            <Controls
                message={selectedMessage}
                loggedUser={user}
                onPressControlBody={onPressControlBody}
                onDeleteControlButtonPress={onDeleteControlButtonPress}
                onReplyControlButtonPress={onReplyControlButtonPress}
            />
            <FlatList
                ref={messagesListRef}
                data={formatedMessages.reverse()}
                inverted
                keyExtractor={(_, index) => index.toString()}
                ListFooterComponent={<LoadingIndicator isFeching={isFeching} />}
                ListHeaderComponent={<TypingIndicator isTyping={isTyping} />}
                onEndReached={onReachEndOfMessagesList}
                onEndReachedThreshold={0.2}
                renderItem={({ item }) => {
                    if (user.id === item.user.id) {
                        return (
                            <MessageFromUser
                                user={user}
                                message={item}
                                showDateOnTop={item.showDateOnTop}
                                showArrow={item.showArrow}
                                onMessageItemLongPress={onMessageItemLongPress}
                                isSelected={selectedMessage?.id === item.id}
                            />
                        )
                    }

                    return (
                        <MessageFromAnotherUser
                            user={user}
                            message={item}
                            showDateOnTop={item.showDateOnTop}
                            showArrow={item.showArrow}
                            onMessageItemLongPress={onMessageItemLongPress}
                            isSelected={selectedMessage?.id === item.id}
                        />
                    )
                }}
            />
        </View>
    )
}

export default Body
