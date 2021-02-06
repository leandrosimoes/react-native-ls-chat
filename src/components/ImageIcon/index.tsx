import * as React from 'react'
import { Image } from 'react-native'
import { IIconProps } from '../../interfaces'

export { default as ICONS } from './ImageIcons'

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
