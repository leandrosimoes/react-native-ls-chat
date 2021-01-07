import * as React from 'react'
import { TextInput, View } from 'react-native'
import { COMMON_COLORS, ThemeContext } from '../../theme'

import styles from './styles'

const Footer: React.FC = () => {
    const theme = React.useContext(ThemeContext)

    const themedStyle = styles({ theme })

    return (
        <View style={themedStyle.container}>
            <TextInput
                style={themedStyle.input}
                placeholder='Type your message here!'
                placeholderTextColor={COMMON_COLORS.GREY}
                multiline
            />
        </View>
    )
}

export default Footer
