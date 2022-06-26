import { StyleSheet } from 'react-native'

import { IThemedComponentProps } from '../../interfaces'
import { COMMON_COLORS } from '../../theme'

const styles = (props: IThemedComponentProps) =>
    StyleSheet.create({
        container: {
            flexDirection: 'column',
            position: 'relative',
            zIndex: 3,
        },
        controlsWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 60,
            marginTop: 5,
            backgroundColor: props.theme?.DEFAULT_BG_COLOR.toString(),
            borderTopColor: COMMON_COLORS.BLACK,
            borderTopWidth: 0.5,
        },
        input: {
            flex: 1,
            height: 60,
            backgroundColor: props.theme?.INPUT_BG_COLOR,
            color: props.theme?.INPUT_FG_COLOR,
            paddingHorizontal: 10,
        },
        sendButton: {
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: props.theme?.PRIMARY_BUTTON_BG_COLOR,
        },
        cancelReplyButton: {
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: props.theme?.MESSAGE_SELECTED_BG_COLOR,
        },
    })

export default styles
