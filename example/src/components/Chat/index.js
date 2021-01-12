import React, { useState, useEffect } from 'react'
import { Modal } from 'react-native'
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

let mockMessages = [
    {
        id: '1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        time: currentDate.getTime(),
        user: user2,
        isRead: true,
    },
    {
        id: '2',
        text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        time: currentDate.setMinutes(currentDate.getMinutes() + 1),
        user,
        isRead: true,
    },
    {
        id: '3',
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        time: currentDate.setMinutes(currentDate.getMinutes() + 2),
        user: user2,
        isRead: true,
    },
    {
        id: '4',
        text: 'Duis ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        time: currentDate.setMinutes(currentDate.getMinutes() + 2),
        user: user2,
        isRead: true,
    },
    {
        id: '5',
        text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        time: currentDate.setDate(currentDate.getDate() + 1),
        user,
        isRead: true,
    },
    {
        id: '6',
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        time: currentDate.setMinutes(currentDate.getMinutes() + 2),
        user: user2,
        isRead: true,
        replyingTo: {
            id: '5',
            text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptat...',
            time: currentDate.setDate(currentDate.getDate() + 1),
            user,
            isRead: true,
        },
    },
    {
        id: '7',
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        time: currentDate.setMinutes(currentDate.getMinutes() + 2),
        user: user,
        isRead: true,
        replyingTo: {
            id: '6',
            text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptat...',
            time: currentDate.setMinutes(currentDate.getMinutes() + 2),
            user: user2,
            isRead: true,
        },
    },
]

const delay = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 3000)
    })
}

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

const Chat = ({ isVisible, onCloseButtonPress, isDarkTheme }) => {
    const [messages, setMessages] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [isFeching, setIsFeching] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const onCloseButtonPressInternal = () => {
        setIsLoading(false)
        setIsTyping(false)
        setIsFeching(false)
        setMessages([])

        if (onCloseButtonPress) onCloseButtonPress()
    }

    const onSendMessage = async (message) => {
        mockMessages = [...mockMessages, message]

        // INCLUDE THE MESSAGE WITH WAITING STATUS
        setIsTyping(false)
        setMessages(mockMessages)

        // SEND THIS MESSAGE TO SERVER
        await delay()

        // RETURN THE MESSAGE WITH ID THAT WAS INCLUDED ON SERVER
        return message
    }

    const onSuccessSendMessage = async (message) => {
        // IN CASE OF SUCCESS, CHANGE THE MESSAGE STATUS DO DELIVERED
        await asyncForEach(mockMessages, (m) => {
            if (m.id === message.id) {
                m.isDelivered = true
            }
        })

        mockMessages = [...mockMessages]

        setIsTyping(false)
        setMessages(mockMessages)

        await delay()

        // IN CASE OF SUCCESS, CHANGE THE MESSAGE STATUS DO DELIVERED
        await asyncForEach(mockMessages, (m) => {
            if (m.id === message.id) {
                m.isRead = true
            }
        })

        mockMessages = [...mockMessages]

        setIsTyping(false)
        setMessages(mockMessages)
    }

    const onErrorSendMessage = async (message, error) => {
        // IN CASE OF ERROR, REMOVE THE MESSAGE FROM THE LIST
        mockMessages = [...mockMessages.filter((m) => m.id !== message.id)]

        setIsTyping(false)
        setMessages(mockMessages)

        console.log(error)
    }

    const onDeleteMessage = async (message) => {
        // DELETE THIS MESSAGE FROM SERVER
        console.log(message)

        // RETURN THE MESSAGE WITH ID THAT WAS DELETED ON SERVER
        return message
    }

    const onSuccessDeleteMessage = async (message) => {
        mockMessages = [...mockMessages.filter((m) => m.id !== message.id)]

        setIsTyping(false)
        setMessages(mockMessages)

        console.log(message)
    }

    const onErrorDeleteMessage = async (error) => {
        setIsTyping(false)

        console.log(error)
    }

    const onMessageTextInputChange = (text) => {
        setIsTyping(!!text)

        console.log(text)
    }

    const onReachEndOfMessagesList = async () => {
        // LOAD MORE MESSAGES FROM SERVER HERE

        if (!mockMessages.find((m) => m.id === '8')) {
            setIsFeching(true)

            await delay()

            mockMessages = [
                {
                    id: '8',
                    text: 'This message was loaded on reach the top of the list',
                    time: new Date().getTime(),
                    user: user2,
                    isRead: true,
                },
                ...mockMessages,
            ]

            setMessages(mockMessages)
            setIsFeching(false)
        }
    }

    useEffect(() => {
        if (isVisible) {
            setIsLoading(true)

            setTimeout(() => {
                setMessages(mockMessages)
                setIsLoading(false)
            }, 2000)
        }
    }, [isVisible])

    const options = {
        user,
        theme: !isDarkTheme ? LsChatTheme.LIGHT : LsChatTheme.DARK,
        headerProps: {
            title: 'Example Chat!',
            onCloseButtonPress: onCloseButtonPressInternal,
        },
        isTyping,
        isFeching,
        isLoading,
        onReachEndOfMessagesList,
        onMessageTextInputChange,
        onSendMessage,
        onSuccessSendMessage,
        onErrorSendMessage,
        onDeleteMessage,
        onSuccessDeleteMessage,
        onErrorDeleteMessage,
    }

    return (
        <Modal visible={isVisible} animationType='slide'>
            <LsChat messages={messages} {...options} />
        </Modal>
    )
}

export default Chat