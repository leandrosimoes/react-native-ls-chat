import * as React from 'react'
import { Text, View, Image } from 'react-native'

import CloseButton from './CloseButton'

import { IHeaderProps, ILsChatUser } from '../../interfaces'
import styles from './styles'
import { ThemeContext } from '../../theme'

type IHeaderWithUserProps = IHeaderProps & { user: ILsChatUser }

const Header: React.FC<IHeaderWithUserProps> = ({
    user,
    isVisible = true,
    title = '',
    onCloseButtonPress,
}) => {
    if (!isVisible) return null

    const theme = React.useContext(ThemeContext)
    const themedStyle = styles({ theme })

    if (title.length > 30) {
        title = title.substr(0, 30) + '...'
    }

    return (
        <View style={themedStyle.container} accessibilityRole="header" accessibilityLabel="Header of the chat window">
            {user && user.photo && <Image source={{ uri: user.photo }} style={themedStyle.userPhoto} />}
            <Text style={themedStyle.title}>{title}</Text>
            {onCloseButtonPress !== undefined && (
                <CloseButton onCloseButtonPress={onCloseButtonPress} />
            )}
        </View>
    )
}

export default Header
