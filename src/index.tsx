import * as React from 'react'
import { View } from 'react-native'

import { useContext } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

import { IHeaderProps, ILsChatMessage, ILsChatUser } from './interfaces'
import { ETheme, Theme, ThemeContext } from './theme'

import styles from './styles'

export interface IChatProps {
    user: ILsChatUser
    theme?: ETheme
    headerProps?: IHeaderProps
    messages?: ILsChatMessage[]
    messageSelectionEnabled?: boolean
    isTyping?: boolean
    isFeching?: boolean
    isLoading?: boolean
    onReachEndOfMessagesList?: { (info: { distanceFromEnd: number }): void }
    onMessageTextInputChange: { (text: string): void }
    onSendMessage: { (message: ILsChatMessage): Promise<ILsChatMessage> }
    onSuccessSendMessage: { (message: ILsChatMessage): void }
    onErrorSendMessage: { (error: any): void }
    onDeleteMessage: { (message: ILsChatMessage): Promise<ILsChatMessage> }
    onSuccessDeleteMessage: { (message: ILsChatMessage): void }
    onErrorDeleteMessage: { (error: any): void }
}

export { ETheme as LsChatTheme } from './theme'

const ContentWrapper: React.FC<IChatProps> = ({
    user,
    headerProps,
    messages = [],
    messageSelectionEnabled = true,
    isTyping = false,
    isFeching = false,
    isLoading = false,
    onReachEndOfMessagesList,
    onMessageTextInputChange,
    onSendMessage,
    onSuccessSendMessage,
    onErrorSendMessage,
    onDeleteMessage,
    onSuccessDeleteMessage,
    onErrorDeleteMessage,
}) => {
    const theme = useContext(ThemeContext)
    const [replyingMessage, setReplyingMessage] = React.useState<ILsChatMessage | undefined>()

    const onReplyControlPress = (message: ILsChatMessage) => {
        setReplyingMessage(message)
    }

    return (
        <View style={styles({ theme }).container}>
            <Header user={user} {...headerProps} />
            <Body
                user={user}
                messages={messages}
                messageSelectionEnabled={messageSelectionEnabled}
                isTyping={isTyping}
                isFeching={isFeching}
                isLoading={isLoading}
                onReachEndOfMessagesList={onReachEndOfMessagesList}
                onReplyControlPress={onReplyControlPress}
                onDeleteMessage={onDeleteMessage}
                onSuccessDeleteMessage={onSuccessDeleteMessage}
                onErrorDeleteMessage={onErrorDeleteMessage}
            />
            <Footer
                user={user}
                isLoading={isLoading}
                replyingMessage={replyingMessage}
                onMessageTextInputChange={onMessageTextInputChange}
                onCancelReplyingMessage={() => setReplyingMessage(undefined)}
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
    messageSelectionEnabled = true,
    isTyping = false,
    isFeching = false,
    isLoading = false,
    onReachEndOfMessagesList,
    onMessageTextInputChange,
    onSendMessage,
    onSuccessSendMessage,
    onErrorSendMessage,
    onDeleteMessage,
    onSuccessDeleteMessage,
    onErrorDeleteMessage,
}) => {
    const currentTheme = theme === ETheme.LIGHT ? Theme.LightTheme : Theme.DarkTheme

    if (!user) return null

    return (
        <ThemeContext.Provider value={currentTheme}>
            <ContentWrapper
                user={user}
                headerProps={headerProps}
                messages={messages}
                messageSelectionEnabled={messageSelectionEnabled}
                isTyping={isTyping}
                isFeching={isFeching}
                isLoading={isLoading}
                onReachEndOfMessagesList={onReachEndOfMessagesList}
                onMessageTextInputChange={onMessageTextInputChange}
                onSendMessage={onSendMessage}
                onSuccessSendMessage={onSuccessSendMessage}
                onErrorSendMessage={onErrorSendMessage}
                onDeleteMessage={onDeleteMessage}
                onSuccessDeleteMessage={onSuccessDeleteMessage}
                onErrorDeleteMessage={onErrorDeleteMessage}
            />
        </ThemeContext.Provider>
    )
}

export default LsChat
