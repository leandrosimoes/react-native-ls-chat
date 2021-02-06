import * as React from 'react'
import { View } from 'react-native'

import { useContext } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

import { IChatProps, ILsChatMessage } from './interfaces'
import { Theme, ThemeContext } from './theme'

import styles from './styles'
import { ETheme } from './enums'

export { ETheme as LsChatTheme } from './enums'

const ContentWrapper: React.FC<IChatProps> = ({
    user,
    headerProps,
    messages = [],
    messageSelectionEnabled = true,
    isTyping = false,
    isFeching = false,
    isLoading = false,
    messageDateFormat,
    interfaceTexts,
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
                messageDateFormat={messageDateFormat}
                interfaceTexts={interfaceTexts}
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
                interfaceTexts={interfaceTexts}
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
    messageDateFormat,
    interfaceTexts,
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
                messageDateFormat={messageDateFormat}
                interfaceTexts={interfaceTexts}
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
