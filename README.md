# React Native Ls Chat

React Native Ls Chat is a chat component ready to use. Just follow the documentation bellow and you'll be just fine.

## How it looks

<p align="center">
    <img src="rn-ls-chat-sample.gif" alt="LS Chat Sample" width="200"  />
</p>

To see it working on your device, get a look at the [sample project](https://github.com/leandrosimoes/react-native-ls-chat/tree/main/example) included in this repository. Just clone this and follow the steps described there to run on your device.

## Installation

`npm i react-native-ls-chat` or `yarn add react-native-ls-chat`

## Data Structure

```typescript
import { GestureResponderEvent, ImageSourcePropType } from 'react-native'

interface IChatProps {
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

interface ILsChatUser {
    id: string
    name: string
    photo?: string
}

interface ILsChatMessage {
    id: string
    // Timestamp
    time: number
    text: string
    user: ILsChatUser
    replyingTo?: ILsChatMessage
    isDelivered?: boolean
    isRead?: boolean
}

interface IHeaderProps {
    isVisible?: boolean
    // if title empty/undefined the header title will be hidden
    title?: string
    // if imageSource empty/undefined the header image will be hidden
    imageSource?: ImageSourcePropType
    // if onCloseButtonPress empty/undefined the close button will be hidden
    onCloseButtonPress?: { (event: GestureResponderEvent): void }
}
```

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

## FAQ

* This package has a third party package as a direct dependency. The package is the [react-native-svg](https://github.com/react-native-svg/react-native-svg/tree/v12.1.0) at version `12.1.0` so if this package do not install by default, just follow the instructions there to install it properly.

## To do

- [ ] Add image file selection support
- [ ] Add camera photo support
- [ ] Add video file selection support
- [ ] Add camera video recording support
- [ ] Add audio file selection support
- [ ] Add mic audio recording support
- [ ] Add file selection support
