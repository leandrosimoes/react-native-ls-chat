import { StyleSheet } from 'react-native'
import { IThemedComponentProps } from '../../../theme'

const styles = (props: IThemedComponentProps) =>
    StyleSheet.create({
        closeIcon: {
            color: props.theme?.CLOSE_ICON_FG_COLOR,
        },
    })

export default styles
