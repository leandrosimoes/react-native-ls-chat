import { GestureResponderEvent } from 'react-native'

export interface ILsChatUser {
    id: number
    name: string
    photo?: string
}

export interface ILsChatMessage {
    id: number
    time: number
    text: string
    user: ILsChatUser
    replyingTo?: ILsChatMessage
}

export interface IHeaderProps {
    isVisible?: boolean
    title?: string
    onCloseButtonPress?: { (event: GestureResponderEvent): void }
}
