import * as React from 'react'
import { View } from 'react-native'

import Header from './components/header'
import Body from './components/body'
import Footer from './components/footer'

import { ILsChatMessage } from './interfaces'

import styles from './styles'

interface IChatProps {
    showHeader: boolean
    messages?: ILsChatMessage[]
}

const LsChat: React.FC<IChatProps> = ({ showHeader = true, messages = [] }) => {
    return (
        <View style={styles.container}>
            <Header isVisible={showHeader} />
            <Body messages={messages} />
            <Footer />
        </View>
    )
}

export default LsChat
