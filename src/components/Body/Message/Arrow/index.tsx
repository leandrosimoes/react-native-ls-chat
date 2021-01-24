import * as React from 'react'
import { View } from 'react-native'
import { ThemeContext } from '../../../../theme'

import styles from './styles'

interface IArrowProps {
    position: 'right' | 'left'
    isSelected: boolean
}

const Arrow: React.FC<IArrowProps> = ({ position, isSelected }) => {
    const theme = React.useContext(ThemeContext)

    const themedStyles = styles({ theme })

    return (
        <>
            <View
                accessibilityLabel='Message Arrow'
                style={[
                    themedStyles.messageArrow,
                    position === 'right'
                        ? themedStyles.messageArrowRight
                        : themedStyles.messageArrowLeft,
                    isSelected ? themedStyles.messageArrowSelected : {},
                ]}
            />
            <View
                style={[
                    themedStyles.messageArrow,
                    position === 'right'
                        ? themedStyles.messageArrowRight
                        : themedStyles.messageArrowLeft,
                    themedStyles.messageArrowShadow,
                    isSelected ? themedStyles.messageArrowSelected : {},
                ]}
            />
        </>
    )
}

export default Arrow
