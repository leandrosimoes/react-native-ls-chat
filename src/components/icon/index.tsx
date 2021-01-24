import * as React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { ThemeContext } from '../../theme'

export { default as ICONS } from './Icons'

export enum EIconSize {
    LARGE = 2.0,
    MEDIUM = 1.5,
    NORMAL = 1.2,
    SMALL = 1.0,
    TINY = 0.8,
}

interface IIconProps {
    fill?: string
    stroke?: string
    path: string[]
    width?: number
    height?: number
    style?: StyleProp<ViewStyle>
    size?: EIconSize
}

const Icon: React.FC<IIconProps> = ({
    fill,
    stroke,
    path,
    width = 20,
    height = 20,
    style = {},
    size = EIconSize.NORMAL,
}) => {
    const theme = React.useContext(ThemeContext)

    if (path.length === 0) return null

    return (
        <Svg
            width={width}
            height={height}
            style={[{ transform: [{ scale: size }] }, style]}
            accessibilityLabel='Icon'>
            {path.map((p, i) => (
                <Path
                    key={i}
                    d={p}
                    fill={fill || theme.DEFAULT_COLOR}
                    stroke={stroke || theme.DEFAULT_COLOR}
                />
            ))}
        </Svg>
    )
}

export default Icon
