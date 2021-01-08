import * as React from 'react'
import { Text, View } from 'react-native'
import { ThemeContext } from '../../../theme'

import styles from './styles'

const EmptyMessages: React.FC = () => {
    const theme = React.useContext(ThemeContext)

    const themedStyles = styles({ theme })

    return (
        <View style={themedStyles.container}>
            <Text style={themedStyles.noMessagesText}>Awesome!</Text>
            <Text style={themedStyles.noMessagesText}>Be the first to leave a message!</Text>
        </View>
    )
}

export default EmptyMessages
