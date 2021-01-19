import { Dimensions, StyleSheet } from 'react-native'
import { COMMON_COLORS, IThemedComponentProps } from '../../../theme'

const { width } = Dimensions.get('window')

const styles = (props: IThemedComponentProps) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            backgroundColor: props.theme?.MESSAGE_SELECTED_BG_COLOR,
            padding: 10,
            minHeight: 1,
            width,
            alignItems: 'flex-start',
            justifyContent: 'space-around',
        },
        messageUserWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        message: {
            flex: 1,
            minWidth: 80,
            flexDirection: 'column',
            paddingHorizontal: 10,
            paddingVertical: 10,
            paddingBottom: 20,
            maxWidth: width * 0.7,
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
            zIndex: 3,
            position: 'relative',
        },
        messageFromUser: {
            backgroundColor: props.theme?.USER_MESSAGE_BG_COLOR,
        },
        messageFromAnotherUser: {
            backgroundColor: props.theme?.MESSAGE_BG_COLOR,
        },
        messageUserName: {
            fontSize: 9,
            opacity: 0.8,
            fontWeight: '700',
        },
        messageUserPhoto: {
            width: 20,
            height: 20,
            borderRadius: 20,
            marginRight: 5,
        },
        messageText: {
            fontSize: 12,
            marginVertical: 5,
        },
        closeButton: {
            position: 'absolute',
            right: 10,
            top: 20,
        },
    })

export default styles
