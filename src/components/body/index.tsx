import * as React from 'react'
import { Text, View } from 'react-native'

import { ILsChatMessage } from '../../interfaces'

import styles from './styles'

interface IBodyProps {
    messages: ILsChatMessage[]
}

const Body: React.FC<IBodyProps> = ({ messages }) => {
    if (!messages || messages.length === 0) return null

    return (
        <View style={styles.container}>
            {messages.map((message) => (
                <Text key={message.id}>{message.text}</Text>
            ))}
        </View>
    )
}

export default Body
