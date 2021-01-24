import React, { useState, useEffect } from 'react'
import { Modal } from 'react-native'
import LsChat, { LsChatTheme } from 'react-native-ls-chat'
import { random } from 'faker'
import { getPrevRandomMessages, getRandomMessages, getRandomUsers, MAIN_USER } from '../../api'
import { delay } from '../../utils'

const Chat = ({ isVisible, onCloseButtonPress, isDarkTheme }) => {
    const [messages, setMessages] = useState([])
    const [sentMessage, setSentMessage] = useState(null)
    const [users, setUsers] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [isFeching, setIsFeching] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const onSendMessage = async (message) => {
        setSentMessage({ ...message })

        // RETURN THE MESSAGE WITH ID THAT WAS INCLUDED ON SERVER
        return message
    }

    const changeMessageToDelivery = async (message) => {
        await delay()
        
        const newMessage = { ...message }
        newMessage.isDelivered = true
        
        setSentMessage(newMessage)

        return newMessage
    }

    const changeMessageToRead = async (message) => {
        await delay()
        
        const newMessage = { ...message }
        newMessage.isRead = true
        
        setSentMessage(newMessage)

        return newMessage
    }

    const sendMessageBack = async (message) => {
        setIsTyping(true)

        await delay()

        const newMessage = (await getRandomMessages(1, users))[0]
        newMessage.time = new Date().getTime()
        
        const isReplying = random.boolean()

        if (!isReplying) {
            newMessage.replyingTo = message
        }

        setSentMessage(newMessage)

        setIsTyping(false)
    }

    const onSuccessSendMessage = async (message) => {
        // CHANGE THE MESSAGE STATUS DO DELIVERED
        message = await changeMessageToDelivery(message)

        // CHANGE THE MESSAGE STATUS DO READ
        message = await changeMessageToRead(message)

        // SEND A MESSAGE BACK
        await sendMessageBack(message)

        setSentMessage(null)
    }

    const onErrorSendMessage = async (message, error) => {
        // IN CASE OF ERROR, REMOVE THE MESSAGE FROM THE LIST
        setMessages([...messages.filter((m) => m.id !== message.id)])

        console.log(error)
    }

    const onDeleteMessage = async (message) => {
        // DELETE THIS MESSAGE FROM SERVER
        console.log(message)
        
        // RETURN THE MESSAGE WITH ID THAT WAS DELETED ON SERVER
        return message
    }

    const onSuccessDeleteMessage = async (message) => {
        setMessages([...messages.filter((m) => m.id !== message.id)])
    }

    const onErrorDeleteMessage = async (error) => {
        console.log(error)
    }

    const onMessageTextInputChange = (text) => {
        console.log(text)
    }

    const onReachEndOfMessagesList = async () => {
        // LOAD MORE MESSAGES FROM SERVER HERE

        if (users) {
            setIsFeching(true)
            const newMessages = await getPrevRandomMessages(users)

            await delay()

            setMessages([...newMessages, ...messages])

            setIsFeching(false)
        }
    }

    useEffect(() => {
        if (isVisible) {
            setIsLoading(true)
            ;(async () => {
                const fakeUsers = await getRandomUsers(3)
                const fakeMassages = await getRandomMessages(5, fakeUsers)

                await delay()

                setUsers(fakeUsers)
                setMessages(fakeMassages)
                setIsLoading(false)
            })()
        } else {
            setIsLoading(false)
            setIsTyping(false)
            setIsFeching(false)
            setMessages([])
        }
    }, [isVisible])

    useEffect(() => {
        if (sentMessage) {
            setMessages([...messages.filter(m => m.id !== sentMessage.id), sentMessage])
        }
    }, [sentMessage])

    const options = {
        user: MAIN_USER,
        theme: !isDarkTheme ? LsChatTheme.LIGHT : LsChatTheme.DARK,
        headerProps: {
            title: 'Example Chat!',
            onCloseButtonPress,
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
