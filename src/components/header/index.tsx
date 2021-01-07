import * as React from 'react'
import { Text, View } from 'react-native'

import CloseButton from './CloseButton'

import { IHeaderProps } from '../../interfaces'
import styles from './styles'
import { ThemeContext } from '../../theme'

const Header: React.FC<IHeaderProps> = ({
    isVisible = true,
    title = '',
    onCloseButtonPress,
}) => {
    if (!isVisible) return null

    const theme = React.useContext(ThemeContext)
    const themedStyle = styles({ theme })

    return (
        <View style={themedStyle.container} accessibilityRole="header" accessibilityLabel="Header of the chat window">
            <Text style={themedStyle.title}>{title}</Text>
            {onCloseButtonPress !== undefined && (
                <CloseButton onCloseButtonPress={onCloseButtonPress} />
            )}
        </View>
    )
}

export default Header
