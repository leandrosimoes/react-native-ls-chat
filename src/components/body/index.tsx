import * as React from 'react'
import { FlatList, Text, View } from 'react-native'

import { ILsChatMessage, ILsChatUser } from '../../interfaces'
import { ThemeContext } from '../../theme'

import styles from './styles'

interface IBodyProps {
    user: ILsChatUser
    messages: ILsChatMessage[]
}

const Body: React.FC<IBodyProps> = ({ messages, user }) => {
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })

    if (!messages || messages.length === 0) return null

    return (
        <View style={themedStyles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const { user: messageUser, time, text } = item
                    const isFromCurrentUser = user.id === messageUser.id
                    const style = [[
                        themedStyles.messageWrapper,
                        isFromCurrentUser
                            ? themedStyles.messageWrapperFromUser
                            : themedStyles.messageWrapperFromAnotherUser,
                    ]]

                    return (
                        <View
                            style={style}>
                            <View style={themedStyles.message}>
                                <Text>{`${messageUser.name} said:`}</Text>
                                <Text>{text}</Text>
                                <Text>{`at ${new Date(
                                    time
                                ).toDateString()}`}</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Body
