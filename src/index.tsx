import * as React from 'react'
import { View } from 'react-native'

import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

import { IHeaderProps, ILsChatMessage } from './interfaces'
import { ETheme, Theme, ThemeContext } from './theme'

import styles from './styles'
import { useContext } from 'react'

export interface IChatProps {
    theme?: ETheme
    headerProps?: IHeaderProps
    messages?: ILsChatMessage[]
}

export { ETheme as LsChatTheme } from './theme'

const ContentWrapper: React.FC<IChatProps> = ({ headerProps, messages = [] }) => {
    const theme = useContext(ThemeContext)

    return (
        <View style={styles({ theme }).container}>
            <Header {...headerProps} />
            <Body messages={messages} />
            <Footer />
        </View>
    )
}

const LsChat: React.FC<IChatProps> = ({
    theme = ETheme.DARK,
    headerProps = {
        isVisible: true,
        title: '',
    },
    messages = [],
}) => {
    const currentTheme = theme === ETheme.LIGHT ? Theme.LightTheme : Theme.DarkTheme

    return (
        <ThemeContext.Provider value={currentTheme}>
            <ContentWrapper headerProps={headerProps} messages={messages} />
        </ThemeContext.Provider>
    )
}

export default LsChat
