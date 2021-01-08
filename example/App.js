import React, { useState } from 'react'
import LsChat, { LsChatTheme } from 'react-native-ls-chat'

const currentDate = new Date()

const user = {
    id: 1,
    name: 'Leandro Simões',
    photo: 'https://avatars3.githubusercontent.com/u/5066378?s=400&u=98d81da11220a6d0f7f51532e2c3e949b50a445b&v=4',
}

const user2 = {
    id: 2,
    name: 'John Doe',
    photo: 'https://avatars3.githubusercontent.com/u/5066378?s=400&u=98d81da11220a6d0f7f51532e2c3e949b50a445b&v=4',
}

const mockMessages = [
    {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        time: currentDate.getTime(),
        user: user2,
        isRead: true
    },
    {
        id: 2,
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        time: currentDate.setMinutes(currentDate.getMinutes() + 1),
        user,
        isRead: true
    },
    {
        id: 3,
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        time: currentDate.setMinutes(currentDate.getMinutes() + 2),
        user: user2,
        isRead: true
    },
    {
        id: 4,
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        time: currentDate.setMinutes(currentDate.getMinutes() + 2),
        user: user2,
        isDelivered: true
    },
    {
        id: 5,
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        time: currentDate.setDate(currentDate.getDate() + 1),
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
        theme: LsChatTheme.LIGHT,
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
