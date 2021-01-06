import * as React from 'react'
import { Text, View } from 'react-native'

import CloseButton from './close-button'

import { IHeaderProps } from '../../interfaces'
import styles from './styles'

const Header: React.FC<IHeaderProps> = ({
    isVisible = true,
    containerStyle = {},
    title = '',
    onCloseButtonPress,
}) => {
    if (!isVisible) return null

    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            <Text style={styles.title}>{title}</Text>
            {onCloseButtonPress !== undefined && (
                <CloseButton onCloseButtonPress={onCloseButtonPress} />
            )}
        </View>
    )
}

export default Header
