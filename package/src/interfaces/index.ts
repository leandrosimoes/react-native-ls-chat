import {
    GestureResponderEvent,
    ImageSourcePropType,
    ImageStyle,
    StyleProp,
} from 'react-native'

import { ETheme } from '../enums'

export interface IChatProps {
    user: ILsChatUser
    theme?: ETheme
    headerProps?: IHeaderProps
    messages?: ILsChatMessage[]
    messageSelectionEnabled?: boolean
    isTyping?: boolean
    isFeching?: boolean
    isLoading?: boolean
    messageDateFormat?: string
    interfaceTexts?: IInterfaceTexts
    onReachEndOfMessagesList?: { (info: { distanceFromEnd: number }): void }
    onMessageTextInputChange: { (text: string): void }
    onSendMessage: { (message: ILsChatMessage): Promise<ILsChatMessage> }
    onSuccessSendMessage: { (message: ILsChatMessage): void }
    onErrorSendMessage: { (message: ILsChatMessage, error: any): void }
    onDeleteMessage: { (message: ILsChatMessage): Promise<ILsChatMessage> }
    onSuccessDeleteMessage: { (message: ILsChatMessage): void }
    onErrorDeleteMessage: { (error: any): void }
}

export interface IFooterProps {
    user: ILsChatUser
    replyingMessage?: ILsChatMessage
    isLoading: boolean
    interfaceTexts?: IInterfaceTexts
    onMessageTextInputChange?: { (text: string): void }
    onCancelReplyingMessage: { (): void }
    onSendMessage: { (message: ILsChatMessage): Promise<ILsChatMessage> }
    onSuccessSendMessage: { (message: ILsChatMessage): void }
    onErrorSendMessage: { (message: ILsChatMessage, error: any): void }
}

export interface IThemedComponentProps {
    theme?: ITheme
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface ITheme {
    DEFAULT_MESSAGE_TEXT_COLOR: string
    DEFAULT_BG_COLOR: string
    DEFAULT_COLOR: string
    INPUT_BG_COLOR: string
    INPUT_FG_COLOR: string
    PRIMARY_BUTTON_BG_COLOR: string
    PRIMARY_BUTTON_FG_COLOR: string
    MESSAGE_BG_COLOR: string
    USER_MESSAGE_BG_COLOR: string
    MESSAGE_PENDING_ICON_COLOR: string
    MESSAGE_DELIVERY_ICON_COLOR: string
    MESSAGE_READ_ICON_COLOR: string
    MESSAGE_SELECTED_BG_COLOR: string
    MESSAGE_REPLY_BG_COLOR: string
    CLOSE_ICON_FG_COLOR: string
    CONTROLS_BG_COLOR: string
}
/* eslint-enable @typescript-eslint/naming-convention */

export interface IIconProps {
    icon: ImageSourcePropType
    width?: number
    height?: number
    style?: StyleProp<ImageStyle>
}

export interface IReplyingMessageProps {
    user: ILsChatUser
    message?: ILsChatMessage
    isVisible: boolean
    onCancelReplyingMessage: { (): void }
}

export interface IBodyProps {
    user: ILsChatUser
    messages: ILsChatMessage[]
    messageSelectionEnabled: boolean
    isTyping: boolean
    isFeching: boolean
    isLoading: boolean
    messageDateFormat?: string
    interfaceTexts?: IInterfaceTexts
    onReachEndOfMessagesList?: { (info: { distanceFromEnd: number }): void }
    onReplyControlPress: { (replyingMessage: ILsChatMessage): void }
    onDeleteMessage: { (message: ILsChatMessage): Promise<ILsChatMessage> }
    onSuccessDeleteMessage: { (message: ILsChatMessage): void }
    onErrorDeleteMessage: { (error: any): void }
}

export interface ITypingIndicatorProps {
    isTyping: boolean
}

export interface IScrollToBottomButtonProps {
    isVisible: boolean
    onPress: { (): void }
}

export interface IArrowProps {
    position: 'right' | 'left'
    isSelected: boolean
}

export interface IMessageProps {
    user: ILsChatUser
    message: ILsChatMessage
    showDateOnTop: boolean
    showArrow: boolean
    isSelected: boolean
    messageDateFormat?: string
    onMessageItemLongPress: {
        (message: ILsChatMessage): void
    }
}

export interface IReplyProps {
    user: ILsChatUser
    message: ILsChatMessage | undefined
}

export interface ILoadingIndicatorProps {
    isFeching: boolean
}

export interface IEmptyProps {
    isLoading: boolean
    title?: string
    message?: string
    loadingMessage?: string
}

export interface IControlsProps {
    message: ILsChatMessage | undefined
    user: ILsChatUser
    onPressControlBody: { (event: GestureResponderEvent): void }
    onDeleteControlButtonPress: { (event: GestureResponderEvent): void }
    onReplyControlButtonPress: { (event: GestureResponderEvent): void }
}

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
    onCloseButtonPress?: { (event: any): void }
}

export interface IInterfaceTexts {
    messageInputPlaceholder?: string
    loading?: string
    emptyMessagesTitle?: string
    emptyMessagesMessage?: string
}
