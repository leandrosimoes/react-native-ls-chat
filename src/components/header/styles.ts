import { StyleSheet } from 'react-native'
import { IThemedComponentProps } from '../../theme'

const style = (props: IThemedComponentProps) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        backgroundColor: props.theme?.DEFAULT_BG_COLOR.toString(),
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.8,
    },
    title: {
        marginLeft: 15,
        color: props.theme?.DEFAULT_COLOR.toString()
    },
})

export default style