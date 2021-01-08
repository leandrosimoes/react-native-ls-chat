import * as React from 'react'
import { FlatList, Text, View } from 'react-native'

import { ILsChatMessage } from '../../interfaces'
import { ThemeContext } from '../../theme'

import styles from './styles'

interface IBodyProps {
    messages: ILsChatMessage[]
}

const Body: React.FC<IBodyProps> = ({ messages }) => {
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })
    
    if (!messages || messages.length === 0) return null

    return (
        <View style={themedStyles.container}>
            <FlatList 
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const { user, time, text } = item

                    return (
                        <View style={themedStyles.messageWrapper}>
                            <View style={themedStyles.message}>
                                <Text>{`${user.name} said:`}</Text>
                                <Text>{text}</Text>
                                <Text>{`at ${new Date(time).toDateString()}`}</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Body
