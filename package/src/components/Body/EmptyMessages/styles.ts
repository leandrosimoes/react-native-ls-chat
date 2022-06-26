import { StyleSheet } from 'react-native'

import { IThemedComponentProps } from '../../../interfaces'

const styles = (props: IThemedComponentProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
        },
        noMessagesText: {
            color: props.theme?.DEFAULT_COLOR,
            opacity: 0.6,
        },
    })

export default styles
