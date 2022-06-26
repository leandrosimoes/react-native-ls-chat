import { StyleSheet } from 'react-native'

import { IThemedComponentProps } from '../../../../interfaces'
import { COMMON_COLORS } from '../../../../theme'

const styles = (props: IThemedComponentProps) =>
    StyleSheet.create({
        messageArrow: {
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 12,
            borderRightWidth: 12,
            borderBottomWidth: 12,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            position: 'absolute',
            top: -1.6,
            zIndex: 2,
        },
        messageArrowLeft: {
            borderBottomColor: props.theme?.MESSAGE_BG_COLOR,
            left: -16,
            transform: [
                {
                    rotate: '45deg',
                },
            ],
        },
        messageArrowRight: {
            borderBottomColor: props.theme?.USER_MESSAGE_BG_COLOR,
            right: -16.2,
            transform: [
                {
                    rotate: '-45deg',
                },
            ],
        },
        messageArrowShadow: {
            borderBottomColor: COMMON_COLORS.BLACK,
            opacity: 0.1,
            top: 1,
            zIndex: 1,
        },
        messageArrowSelected: {
            borderBottomColor: props.theme?.MESSAGE_SELECTED_BG_COLOR,
        },
    })

export default styles
