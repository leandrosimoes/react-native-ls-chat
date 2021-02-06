import { StyleSheet } from 'react-native'
import { IThemedComponentProps } from './interfaces'

const styles = (props: IThemedComponentProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: props.theme?.DEFAULT_BG_COLOR,
            justifyContent: 'space-between',
        },
    })

export default styles
