import { StyleSheet } from 'react-native'
import { IThemedComponentProps } from '../../theme'

const styles = (props: IThemedComponentProps) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: props.theme?.DEFAULT_BG_COLOR,
    }
})

export default styles
