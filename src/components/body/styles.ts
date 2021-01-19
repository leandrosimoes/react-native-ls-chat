import { Dimensions, StyleSheet } from 'react-native'
import { IThemedComponentProps } from '../../theme'

const { width } = Dimensions.get('window')

const styles = (props: IThemedComponentProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: props.theme?.DEFAULT_BG_COLOR,
        },
        messageWithReplyWrapper: {
            backgroundColor: props.theme?.MESSAGE_REPLY_BG_COLOR,
            width: width * 0.8,
            marginVertical: 15,
            paddingLeft: 25,
            paddingBottom: 15,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
        },
        messageWithReplyFromUser: {
            alignSelf: 'flex-end',
        },
        messageWithReplyFromAnotherUser: {
            alignSelf: 'flex-start',
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
    })

export default styles
