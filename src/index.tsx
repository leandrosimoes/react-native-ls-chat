import * as React from 'react'
import { View } from 'react-native'

import Header from './components/header'
import Body from './components/body'
import Footer from './components/footer'

import { IHeaderProps, ILsChatMessage } from './interfaces'

import styles from './styles'

interface IChatProps {
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
