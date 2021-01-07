import { StyleSheet } from 'react-native'
import { COMMON_COLORS, IThemedComponentProps } from '../../theme'

const styles = (props: IThemedComponentProps) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        marginTop: 5,
        backgroundColor: props.theme?.DEFAULT_BG_COLOR.toString(),
        borderTopColor: COMMON_COLORS.BLACK,
        borderTopWidth: .5,
    },
    input: {
        flex: 1,
        height: 60,
        backgroundColor: props.theme?.INPUT_BG_COLOR,
        color: props.theme?.INPUT_FG_COLOR,
        paddingHorizontal: 10,
    }
})

export default styles
