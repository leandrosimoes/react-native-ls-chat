import { StyleSheet } from 'react-native'

import { IThemedComponentProps } from '../../../interfaces'
import { COMMON_COLORS } from '../../../theme'

const styles = (props: IThemedComponentProps) =>
    StyleSheet.create({
        container: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        controlsWrapper: {
            flexDirection: 'row',
            position: 'relative',
            top: -60,
        },
        controlButton: {
            backgroundColor: props.theme?.CONTROLS_BG_COLOR,
            flex: 1,
            height: 70,
            paddingTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4,
            shadowColor: COMMON_COLORS.BLACK,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
        },
        controlButtonBordered: {
            borderWidth: 0.5,
            borderColor: props.theme?.DEFAULT_BG_COLOR,
        },
    })

export default styles
