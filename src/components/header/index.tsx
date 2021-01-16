import * as React from 'react'
import { Text, View, Image, ImageSourcePropType } from 'react-native'

import CloseButton from './CloseButton'

import { IHeaderProps, ILsChatUser } from '../../interfaces'
import styles from './styles'
import { ThemeContext } from '../../theme'

type IHeaderWithUserProps = IHeaderProps & { user: ILsChatUser }

const Header: React.FC<IHeaderWithUserProps> = ({
    user,
    isVisible = true,
    title = '',
    imageSource,
    onCloseButtonPress,
}) => {
    if (!isVisible) return null

    const theme = React.useContext(ThemeContext)
    const themedStyle = styles({ theme })

    if (title.length > 30) {
        title = title.substr(0, 30) + '...'
    }

    let finalImageSource: ImageSourcePropType | undefined = undefined

    if (user && user.photo) {
        finalImageSource = { uri: user.photo, cache: 'reload' }
    }

    if (imageSource) {
        finalImageSource = imageSource
    }

    return (
        <View
            style={themedStyle.container}
            accessibilityRole='header'
            accessibilityLabel='Header of the chat window'>
            {finalImageSource && (
                <Image
                    source={finalImageSource}
                    style={themedStyle.image}
                    accessibilityRole='image'
                />
            )}
            <Text
                style={themedStyle.title}
                accessibilityLabel='Title of the chat window'
                accessibilityRole='text'>
                {title}
            </Text>
            {onCloseButtonPress !== undefined && (
                <CloseButton onCloseButtonPress={onCloseButtonPress} />
            )}
        </View>
    )
}

export default Header
