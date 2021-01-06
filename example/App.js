import React from 'react'
import LsChat from 'react-native-ls-chat'

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

const headerContainerStyle = {
    backgroundColor: '#FFF',
}

const options = {
    headerProps: {
        containerStyle: headerContainerStyle,
        title: 'Example Chat!',
        onCloseButtonPress: () => {},
    },
    messages: mockMessages,
}

const App = () => <LsChat {...options} />

export default App
