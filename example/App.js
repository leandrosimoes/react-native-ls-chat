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

const App = () => <LsChat messages={mockMessages} />

export default App
