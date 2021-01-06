import * as React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

interface ILsChatHeaderProps {
    isVisible: boolean
}

const Header: React.FC<ILsChatHeaderProps> = ({ isVisible = true }) => {
    if (!isVisible) return null

    return (
        <View style={styles.container}>
            <Text>HEADER</Text>
        </View>
    )
}

export default Header
