import * as React from 'react'
import { StyleProp, Image, ImageStyle, ImageSourcePropType } from 'react-native'

export { default as ICONS } from './ImageIcons'

interface IIconProps {
    icon: ImageSourcePropType
    width?: number
    height?: number
    style?: StyleProp<ImageStyle>
}

const Icon: React.FC<IIconProps> = ({ icon, width = 20, height = 20, style = {} }) => {
    return (
        <Image
            style={[{ resizeMode: 'cover', width, height }, style]}
            accessibilityLabel='Icon'
            source={icon}
        />
    )
}

export default Icon
