import { GestureResponderEvent, ImageSourcePropType } from 'react-native'

export interface ILsChatUser {
    id: string
    name: string
    photo?: string
}

export interface ILsChatMessage {
    id: string
    time: number
    text: string
    user: ILsChatUser
    replyingTo?: ILsChatMessage
    isDelivered?: boolean
    isRead?: boolean
}

export interface IHeaderProps {
    isVisible?: boolean
    title?: string
    imageSource?: ImageSourcePropType
    onCloseButtonPress?: { (event: GestureResponderEvent): void }
}
