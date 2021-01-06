import { ViewStyle, GestureResponderEvent } from 'react-native'

export interface ILsChatUser {
    id: number
    name: string
    photo?: string
}

export interface ILsChatMessage {
    id: number
    text: string
    user: ILsChatUser
}

export interface IHeaderProps {
    isVisible?: boolean
    title?: string
    containerStyle?: ViewStyle
    onCloseButtonPress?: { (event: GestureResponderEvent): void }
}
