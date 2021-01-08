import React, { useState } from 'react'
import LsChat, { LsChatTheme } from 'react-native-ls-chat'

const currentDate = new Date()

const user = {
    id: 1234,
    name: 'User Test',
    photo: 'https://avatars3.githubusercontent.com/u/5066378?s=400&u=98d81da11220a6d0f7f51532e2c3e949b50a445b&v=4',
}

const mockMessages = [
    {
        id: 1,
        text: 'Message 1',
        time: currentDate.getTime(),
        user
    },
    {
        id: 2,
        text: 'Message 2',
        time: currentDate.setMinutes(currentDate.getMinutes() + 1),
        user,
    },
    {
        id: 3,
        text: 'Message 3',
        time: currentDate.setMinutes(currentDate.getMinutes() + 2),
        user,
    },
]

const App = () => {
    const [messages, setMessages] = useState(mockMessages)

    const onCloseButtonPress = () => {
        setMessages([])
        
        console.log('close')
    }
    
    const onSendMessage = async (message) => {
        // SEND THIS MESSAGE TO SERVER
        console.log(message)
    
        // RETURN THE MESSAGE WITH ID THAT WAS INCLUDED ON SERVER
        return message
    }
    
    const onSuccessSendMessage = async (message) => {
        setMessages([...messages, message])

        console.log(message)
    }
    
    const onErrorSendMessage = async (error) => {
        console.log(error)
    }
    
    const options = {
        user,
        theme: LsChatTheme.DARK,
        headerProps: {
            title: 'Example Chat!',
            onCloseButtonPress,
        },
        onSendMessage,
        onSuccessSendMessage,
        onErrorSendMessage,
    }

    return <LsChat messages={messages} {...options} />
}

export default App
