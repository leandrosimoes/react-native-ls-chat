import { StyleSheet, Dimensions } from 'react-native'
import { COMMON_COLORS, IThemedComponentProps } from '../../../theme'

const { width } = Dimensions.get('screen')

const styles = (props: IThemedComponentProps) =>
    StyleSheet.create({
        messageWrapper: {
            flex: 1,
            marginHorizontal: 25,
        },
        messageWrapperFromUser: {
            alignItems: 'flex-end',
        },
        messageWrapperFromAnotherUser: {
            alignItems: 'flex-start',
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
            alignItems: 'flex-end',
            backgroundColor: props.theme?.USER_MESSAGE_BG_COLOR,
            borderTopRightRadius: 0,
        },
        messageFromAnotherUser: {
            alignItems: 'flex-start',
            backgroundColor: props.theme?.MESSAGE_BG_COLOR,
            borderTopLeftRadius: 0,
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
            right: 5,
        },
        messageStatusDeliveredIcon: {
            right: 5,
        },
        dateSeparator: {
            color: props.theme?.DEFAULT_COLOR,
            textAlign: 'center',
            width: width - 20,
            fontSize: 12,
            opacity: 0.8,
            marginBottom: 15,
            marginTop: 20,
        },
        messageArrow: {
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 12,
            borderRightWidth: 12,
            borderBottomWidth: 12,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            position: 'absolute',
            top: -2,
            zIndex: 2,
        },
        messageArrowLeft: {
            borderBottomColor: props.theme?.MESSAGE_BG_COLOR,
            left: -16,
            transform: [
                {
                    rotate: '45deg',
                },
            ],
        },
        messageArrowRight: {
            borderBottomColor: props.theme?.USER_MESSAGE_BG_COLOR,
            right: -16,
            transform: [
                {
                    rotate: '-45deg',
                },
            ],
        },
        messageArrowShadow: {
            borderBottomColor: COMMON_COLORS.BLACK,
            opacity: 0.1,
            top: 1,
            zIndex: 1,
        },
        messageSelected: {
            backgroundColor: props.theme?.MESSAGE_SELECTED_BG_COLOR,
        },
        replyingWrapper: {
            flex: 1,
            backgroundColor: props.theme?.MESSAGE_REPLY_BG_COLOR,
            marginTop: 15,
            paddingTop: 0,
            paddingHorizontal: 25,
            paddingBottom: 15,
            borderRadius: 5,
        },
        replyingMessage: {
            opacity: 0.7,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            position: 'relative',
            transform: [
                {
                    scale: 0.9,
                },
            ],
            top: 25,
        },
        replyingText: {
            color: props.theme?.DEFAULT_COLOR,
            fontSize: 10,
            position: 'absolute',
            top: 15,
            left: 30,
            opacity: 0.9,
        },
    })

export default styles
