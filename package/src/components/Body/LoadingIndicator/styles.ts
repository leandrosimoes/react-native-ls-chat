import { StyleSheet } from 'react-native'

import { IThemedComponentProps } from '../../../interfaces'

const styles = (props: IThemedComponentProps) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            paddingVertical: 15,
            alignItems: 'center',
            justifyContent: 'center',
        },
        dot: {
            width: 5,
            height: 5,
            borderRadius: 5,
            backgroundColor: props.theme?.DEFAULT_COLOR,
            marginHorizontal: 3,
        },
    })

export default styles
