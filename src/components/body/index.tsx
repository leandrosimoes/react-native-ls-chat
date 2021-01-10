import * as React from 'react'
import { FlatList, View } from 'react-native'

import { ILsChatMessage, ILsChatUser } from '../../interfaces'
import { ThemeContext } from '../../theme'
import Message from './Message'
import EmptyMessages from './EmptyMessages'

import styles from './styles'
import Controls from './Controls'

interface IBodyProps {
    user: ILsChatUser
    messages: ILsChatMessage[]
    messageSelectionEnabled: boolean
    onDeleteMessage: { (message: ILsChatMessage): Promise<ILsChatMessage> }
    onSuccessDeleteMessage: { (message: ILsChatMessage): void }
    onErrorDeleteMessage: { (error: any): void }
}

type TLsChatMessageDesign = ILsChatMessage & {
    showDateOnTop: boolean
    showUser: boolean
}

const Body: React.FC<IBodyProps> = ({
    messages,
    user,
    messageSelectionEnabled,
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

    const onDeleteControlPress = async () => {
        if (!selectedMessage || selectedMessage.user.id !== user.id) return

        try {
            await onDeleteMessage(selectedMessage)
            onSuccessDeleteMessage(selectedMessage)
            setSelectedMessage(undefined)
        } catch (error) {
            onErrorDeleteMessage(selectedMessage)
        }
    }

    const onReplyControlPress = () => {
        if (!selectedMessage || !selectedMessage.id) return

        console.log(selectedMessage)
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

        const showUser = !lastUser || lastUser !== messageUser.id

        lastDate = new Date(time)
        lastUser = messageUser.id

        return { ...message, showDateOnTop, showUser }
    })

    return (
        <View style={themedStyles.container}>
            <Controls
                message={selectedMessage}
                loggedUser={user}
                onPressControlBody={onPressControlBody}
                onDeleteControlPress={onDeleteControlPress}
                onReplyControlPress={onReplyControlPress}
            />
            <FlatList
                ref={messagesListRef}
                data={formatedMessages.reverse()}
                inverted
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <Message
                            loggedUser={user}
                            message={item}
                            showDateOnTop={item.showDateOnTop}
                            showUser={item.showUser}
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
