import * as React from 'react'
import { Text, View } from 'react-native'

import { IEmptyProps } from '../../../interfaces'
import { ThemeContext } from '../../../theme'
import styles from './styles'

const EmptyMessages: React.FC<IEmptyProps> = ({
    isLoading,
    title = 'Awesome!',
    message = 'Be the first to leave a message!',
    loadingMessage = 'Loading',
}) => {
    const theme = React.useContext(ThemeContext)

    const themedStyles = styles({ theme })

    return (
        <View
            style={themedStyles.container}
            accessibilityLabel='Empty Messages and Loading Messages Texts'>
            {!isLoading && (
                <Text style={themedStyles.noMessagesText}>{title}</Text>
            )}
            {!isLoading && (
                <Text style={themedStyles.noMessagesText}>{message}</Text>
            )}
            {isLoading && (
                <Text style={themedStyles.noMessagesText}>
                    {loadingMessage}
                </Text>
            )}
        </View>
    )
}

export default EmptyMessages
