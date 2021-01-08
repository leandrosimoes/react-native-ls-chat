import * as React from 'react'
import { FlatList, View } from 'react-native'

import { ILsChatMessage, ILsChatUser } from '../../interfaces'
import { ThemeContext } from '../../theme'
import Message from './Message'
import EmptyMessages from './EmptyMessages'

import styles from './styles'

interface IBodyProps {
    user: ILsChatUser
    messages: ILsChatMessage[]
}

type TLsChatMessageDesign = ILsChatMessage & { showDateOnTop: boolean, showUser: boolean }

const Body: React.FC<IBodyProps> = ({ messages, user }) => {
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })
    const messagesListRef = React.useRef<FlatList<TLsChatMessageDesign>>(null)

    let lastDate = React.useRef<Date | undefined>().current
    let lastUser = React.useRef<number>(0).current

    const onMessageItemLongPress = (
        message: ILsChatMessage,
        loggedUser: ILsChatUser
    ) => {
        console.log(message, loggedUser)
    }

    if (!messages || messages.length === 0) return <EmptyMessages />

    const formatedMessages: TLsChatMessageDesign[] = messages.map(message => {
        const { time, user: messageUser } = message

        const messageDate = new Date(time)
        const showDateOnTop =
            !lastDate ||
            lastDate.toDateString() !== messageDate.toDateString()

        const showUser = !lastUser || lastUser !== messageUser.id

        lastDate = new Date(time)
        lastUser = messageUser.id
        
        return { ...message, showDateOnTop, showUser }
    })

    return (
        <View style={themedStyles.container}>
            <FlatList
                ref={messagesListRef}
                data={formatedMessages.reverse()}
                inverted
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <Message
                            loggedUser={user}
                            message={item}
                            showDateOnTop={item.showDateOnTop}
                            showUser={item.showUser}
                            onMessageItemLongPress={onMessageItemLongPress}
                        />
                    )
                }}
            />
        </View>
    )
}

export default Body
