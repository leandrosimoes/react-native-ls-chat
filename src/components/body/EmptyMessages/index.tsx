import * as React from 'react'
import { Text, View } from 'react-native'
import { ThemeContext } from '../../../theme'

import styles from './styles'

interface IEmptyProps {
    isLoading: boolean
}

const EmptyMessages: React.FC<IEmptyProps> = ({ isLoading }) => {
    const theme = React.useContext(ThemeContext)

    const themedStyles = styles({ theme })

    return (
        <View style={themedStyles.container} accessibilityLabel='Empty Messages and Loading Messages Texts'>
            {!isLoading && <Text style={themedStyles.noMessagesText}>Awesome!</Text>}
            {!isLoading && <Text style={themedStyles.noMessagesText}>Be the first to leave a message!</Text>}
            {isLoading && <Text style={themedStyles.noMessagesText}>Loading</Text>}
        </View>
    )
}

export default EmptyMessages
