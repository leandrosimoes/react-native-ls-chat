import * as React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import COLORS from '../../colors'

export { default as ICONS } from './icons'

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
    fill = COLORS.DEFAULT_COLOR,
    stroke = 'none',
    path,
    width = 20,
    height = 20,
    style = {},
    size = EIconSize.NORMAL,
}) => {
    if (!path || path.length === 0) return null

    return (
        <Svg width={width} height={height} style={[{ transform: [{ scale: size }] }, style]}>
            {path.map((p, i) => (
                <Path key={i} d={p} fill={fill} stroke={stroke} />
            ))}
        </Svg>
    )
}

export default Icon
