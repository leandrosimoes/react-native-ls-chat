import { StyleSheet } from 'react-native'
import { COMMON_COLORS, IThemedComponentProps } from '../../theme'

const style = (props: IThemedComponentProps) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        backgroundColor: props.theme?.DEFAULT_BG_COLOR.toString(),
        borderBottomColor: COMMON_COLORS.BLACK,
        borderBottomWidth: .5,
        zIndex: 9,
    },
    title: {
        color: props.theme?.DEFAULT_COLOR.toString(),
        flex: 1,
        overflow: 'hidden',
        textAlign: 'center',
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 40,
        resizeMode: 'cover',
        marginLeft: 15,
    }
})

export default style