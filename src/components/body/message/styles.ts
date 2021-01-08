import { StyleSheet, Dimensions } from 'react-native'
import { COMMON_COLORS, IThemedComponentProps } from '../../../theme'

const { width } = Dimensions.get('screen')

const styles = (props: IThemedComponentProps) =>
    StyleSheet.create({
        messageWrapper: {
            flex: 1,
            marginHorizontal: 15,
        },
        messageWrapperFromUser: {
            alignItems: 'flex-end',
        },
        messageWrapperFromAnotherUser: {
            alignItems: 'flex-start',
        },
        message: {
            flex: 1,
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
        },
        messageFromUser: {
            alignItems: 'flex-end',
            backgroundColor: props.theme?.USER_MESSAGE_BG_COLOR,
        },
        messageFromAnotherUser: {
            alignItems: 'flex-start',
            backgroundColor: props.theme?.MESSAGE_BG_COLOR,
        },
        messageUserWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
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
        messageDate: {
            fontSize: 9,
            opacity: 0.8,
            position: 'absolute',
            bottom: 9,
            right: 30,
        },
        messageStatusIcon: { 
            position: 'absolute', 
            bottom: 5, 
            right: 5 ,
        },
        messageStatusDeliveredIcon1: { right: 10 },
        messageStatusDeliveredIcon2: { right: 5 },
        dateSeparator: {
            color: props.theme?.DEFAULT_COLOR,
            textAlign: 'center',
            width: width - 20,
            fontSize: 12,
            opacity: .8,
            marginBottom: 15,
            marginTop: 20,
        },
    })

export default styles
