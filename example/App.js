import React from 'react'
import LsChat, { LsChatTheme } from 'react-native-ls-chat'

const mockMessages = [
    {
        id: 1,
        text: 'Message 1',
    },
    {
        id: 2,
        text: 'Message 2',
    },
    {
        id: 3,
        text: 'Message 3',
    },
]

const options = {
    theme: LsChatTheme.DARK,
    headerProps: {
        title: 'Example Chat!',
        onCloseButtonPress: () => {},
    },
    messages: mockMessages,
}

const App = () => <LsChat {...options} />

export default App
