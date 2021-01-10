import * as React from 'react'
import {
    GestureResponderEvent,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { ILsChatMessage, ILsChatUser } from '../../../interfaces'
import { COMMON_COLORS, ThemeContext } from '../../../theme'
import Icon from '../../Icon'
import icons from '../../Icon/icons'
import styles from './styles'

interface IControlsProps {
    message: ILsChatMessage | undefined
    loggedUser: ILsChatUser
    onPressControlBody: { (event: GestureResponderEvent): void }
    onDeleteControlPress: { (event: GestureResponderEvent): void }
    onReplyControlPress: { (event: GestureResponderEvent): void }
}

const Controls: React.FC<IControlsProps> = ({ message, loggedUser, onPressControlBody, onReplyControlPress, onDeleteControlPress }) => {
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })

    if (!message) return null

    const { isDelivered, isRead } = message
    const isUserMessage = message.user.id === loggedUser.id

    return (
        <TouchableWithoutFeedback onPress={onPressControlBody}>
            <View
                style={themedStyles.container}>
                <View style={themedStyles.controlsWrapper}>
                    {(isDelivered || isRead) && <TouchableWithoutFeedback onPress={onReplyControlPress}>
                        <View style={[themedStyles.controlButton, themedStyles.controlButtonBordered]}>
                            <Icon
                                path={icons.reply}
                                fill={COMMON_COLORS.WHITE}
                                stroke={COMMON_COLORS.WHITE}
                            />
                        </View>
                    </TouchableWithoutFeedback>}
                    {isUserMessage && <TouchableWithoutFeedback onPress={onDeleteControlPress}>
                        <View style={themedStyles.controlButton}>
                            <Icon
                                path={icons.trash}
                                fill={COMMON_COLORS.WHITE}
                                stroke={COMMON_COLORS.WHITE}
                            />
                        </View>
                    </TouchableWithoutFeedback>}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Controls
