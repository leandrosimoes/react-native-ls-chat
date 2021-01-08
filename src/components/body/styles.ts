import { StyleSheet, Dimensions } from 'react-native'
import { COMMON_COLORS, IThemedComponentProps } from '../../theme'

const { width } = Dimensions.get('screen')

const styles = (props: IThemedComponentProps) => StyleSheet.create({
    container: {
        flex: 1,
    },
    messageWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
    messageWrapperFromUser: {
        alignItems: 'flex-start'
    },
    messageWrapperFromAnotherUser: {
        alignItems: 'flex-end'
    },
    message: {
        flex: 1,
        backgroundColor: props.theme?.MESSAGE_BG_COLOR,
        width: width * 0.7,
        borderRadius: 5,
        marginTop: 10,
        elevation: 4,
        shadowColor: COMMON_COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    }
})

export default styles
