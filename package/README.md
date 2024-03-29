# React Native Ls Chat

React Native Ls Chat is a chat component ready to use. Just follow the documentation below and you'll be just fine.


[![Codacy Badge](https://app.codacy.com/project/badge/Grade/1414bdedd8a54214b02e8f06a3bdbb8c)](https://www.codacy.com/gh/leandrosimoes/react-native-ls-chat/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=leandrosimoes/react-native-ls-chat&amp;utm_campaign=Badge_Grade)
[![npm version](https://badge.fury.io/js/react-native-ls-chat.svg)](https://badge.fury.io/js/react-native-ls-chat)
![Node CI](https://github.com/leandrosimoes/react-native-ls-chat/workflows/Node%20CI/badge.svg)
![Node.js Package](https://github.com/leandrosimoes/react-native-ls-chat/workflows/Node%2Ejs%20Package/badge.svg)

## How it looks

<p align="center">
    <img src="https://github.com/leandrosimoes/react-native-ls-chat/raw/master/rn-ls-chat-sample.gif" alt="LS Chat Sample" width="200"  />
</p>

To see it working on your device, get a look at the [sample project](https://github.com/leandrosimoes/react-native-ls-chat/tree/main/example) included in this repository. Just clone this and follow the steps described there to run on your device.

## Installation

`npm i react-native-ls-chat` or `yarn add react-native-ls-chat`

## Data Structure

* [Interfaces](https://github.com/leandrosimoes/react-native-ls-chat/tree/master/package/src/interfaces)
* [Types](https://github.com/leandrosimoes/react-native-ls-chat/tree/master/package/src/types)
* [Enums](https://github.com/leandrosimoes/react-native-ls-chat/tree/master/package/src/enums)

## Usage

```javascript
import React, { useState, useEffect } from 'react'
import { Modal } from 'react-native'
import LsChat, { LsChatTheme } from 'react-native-ls-chat'

const Chat = ({ isVisible }) => {
    const [messages, setMessages] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [isFeching, setIsFeching] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isDarkTheme, setIsDarkTheme] = useState(true)

    // ON SEND MESSAGE BUTTON PRESS
    const onSendMessage = async (message) => {
        // SEND THE MESSAGE TO THE SERVER HERE AND RETURN IT WITH THE
        // RIGHT ID IF NECESSARY
        // YOU CAN ADD THE MESSAGE TO THE LISTS IF YOU WANT TO, THIS WAY, THE
        // MESSAGE WILL BE INCLUDED TO THE LIST WITH A WAITING STATUS
        return message
    }

    // CALLED AS SOON THE onSendMessage RETURNS THE MESSAGE WITH NO ERRORS
    const onSuccessSendMessage = async (message) => {
        // HERE YOU CAN CHANGE THE MESSAGE STATUS TO DELIVERED IF YOU WANT
    }

    // CALLED AS SOON THE onSendMessage FAILS
    const onErrorSendMessage = async (message, error) => {
        // HERE YOU CAN REMOVE THE FAILED MESSAGE FROM THE LIST AND SHOW A
        // ALERT TO THE USER OR SOMETHING LIKE THAT
    }

    // ON DELETE MESSAGE BUTTON PRESS
    const onDeleteMessage = async (message) => {
        // DELETE THIS MESSAGE FROM SERVER
        // RETURN THE MESSAGE WITH ID THAT WAS DELETED ON SERVER
        return message
    }

    // CALLED AS SOON THE onDeleteMessage RETURNS THE MESSAGE WITH NO ERRORS
    const onSuccessDeleteMessage = async (message) => {
        // HERE YOU CAN REMOVE THE MESSAGE FROM THE LIST
    }

    // CALLED AS SOON THE onDeleteMessage FAILS
    const onErrorDeleteMessage = async (error) => {
        // HERE YOU CAN SHOW AN ALERT TO THE USE OR SOMETHING LIKE THAT
    }

    // GET REALTIME FEEDBACK FROM THE USER MESSAGE TEXT INPUT
    const onMessageTextInputChange = (text) => {
        // HERE IS A GOOD PLACE TO SEND TO THE SERVER A isTypging STATUS
        // SO YOU CAN SHOW AT THE OTHER APPS THROUGH WEBSOCKET OR SOMETHING
        // LIKE THAT
    }

    // CALLED AS SOON THE TOP OF THE LIST IS REACHED
    const onReachEndOfMessagesList = async () => {
        // HERE IS A GOOD PLACE TO START TO GET MORE MESSAGES FROM THE SERVER
        // JUST CHANGE THE STATUS OF isFeching TO true OR false IF NECESSARY

        setIsFeching(true)

        // await hereYouStartGetMessagesFromServer()

        setIsFeching(false)
    }

    // CALLED AS SOON THE CLOSE BUTTON IS PRESSED
    const onCloseButtonPress = () => {
        // HERE IS A GOOD PLACE TO CLEAR ALL DATA
        setIsLoading(false)
        setIsTyping(false)
        setIsFeching(false)
        setMessages([])
    }

    // usEffect IS A GOOD PLACE TO PUT YOUR INITIAL MESSAGES FETCH LOGIC
    // JUST CHANGE THE STATUS OF isLoading AND isFeching TO true OR false IF NECESSARY
    useEffect(() => {
        if (isVisible) {
            setIsLoading(true)
            ;(async () => {
                // const messagesFromServer = await hereYouStartGetMessagesFromServer()

                setMessages(messagesFromServer)

                setIsLoading(false)
            })()
        } else {
            setIsLoading(false)
            setIsTyping(false)
            setIsFeching(false)
            setMessages([])
        }
    }, [isVisible])

    // THE LOGGED USER
    const user = {
        id: '123',
        name: 'Leandro Simões',
        photo:
            'https://avatars3.githubusercontent.com/u/5066378?s=400&u=98d81da11220a6d0f7f51532e2c3e949b50a445b&v=4',
    }

    const options = {
        user,
        theme: !isDarkTheme ? LsChatTheme.LIGHT : LsChatTheme.DARK,
        headerProps: {
            isVisible: true,
            title: 'Example Chat!',
            onCloseButtonPress,
            imageSource: {
                uri: 'https://avatars3.githubusercontent.com/u/5066378?s=400&u=98d81da11220a6d0f7f51532e2c3e949b50a445b&v=4',
            },
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
```

## Change Log

You can see all changes [here](https://github.com/leandrosimoes/react-native-ls-chat/blob/master/CHANGELOG.md)

## To do

- [x] Test in iOS
- [ ] Add image file selection support
- [ ] Add camera photo support
- [ ] Add video file selection support
- [ ] Add camera video recording support
- [ ] Add audio file selection support
- [ ] Add mic audio recording support
- [ ] Add file selection support
