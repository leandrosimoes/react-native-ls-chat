import * as React from 'react'
import { View } from 'react-native'

import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

import { IHeaderProps, ILsChatMessage, ILsChatUser } from './interfaces'
import { ETheme, Theme, ThemeContext } from './theme'

import styles from './styles'
import { useContext } from 'react'

export interface IChatProps {
    user: ILsChatUser
    theme?: ETheme
    headerProps?: IHeaderProps
    messages?: ILsChatMessage[]
    onSendMessage: { (message: ILsChatMessage): Promise<ILsChatMessage> }
    onSuccessSendMessage: { (message: ILsChatMessage): void }
    onErrorSendMessage: { (error: any): void }
}

export { ETheme as LsChatTheme } from './theme'

const ContentWrapper: React.FC<IChatProps> = ({
    user,
    headerProps,
    messages = [],
    onSendMessage,
    onSuccessSendMessage,
    onErrorSendMessage,
}) => {
    const theme = useContext(ThemeContext)

    return (
        <View style={styles({ theme }).container}>
            <Header user={user} {...headerProps} />
            <Body messages={messages} />
            <Footer
                user={user}
                onSendMessage={onSendMessage}
                onSuccessSendMessage={onSuccessSendMessage}
                onErrorSendMessage={onErrorSendMessage}
            />
        </View>
    )
}

const LsChat: React.FC<IChatProps> = ({
    user,
    theme = ETheme.DARK,
    headerProps = {
        isVisible: true,
        title: '',
    },
    messages = [],
    onSendMessage,
    onSuccessSendMessage,
    onErrorSendMessage,
}) => {
    const currentTheme =
        theme === ETheme.LIGHT ? Theme.LightTheme : Theme.DarkTheme

    if (!user) return null

    return (
        <ThemeContext.Provider value={currentTheme}>
            <ContentWrapper
                user={user}
                headerProps={headerProps}
                messages={messages}
                onSendMessage={onSendMessage}
                onSuccessSendMessage={onSuccessSendMessage}
                onErrorSendMessage={onErrorSendMessage}
            />
        </ThemeContext.Provider>
    )
}

export default LsChat
