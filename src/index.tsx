import * as React from 'react'
import { View } from 'react-native'

import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

import { IHeaderProps, ILsChatMessage } from './interfaces'

import styles from './styles'

export interface IChatProps {
    headerProps?: IHeaderProps
    messages?: ILsChatMessage[]
}

const LsChat: React.FC<IChatProps> = ({
    headerProps = {
        isVisible: true,
        title: '',
        containerStyle: {},
    },
    messages = [],
}) => {
    return (
        <View style={styles.container}>
            <Header {...headerProps} />
            <Body messages={messages} />
            <Footer />
        </View>
    )
}

export default LsChat
