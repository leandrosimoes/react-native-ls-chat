import * as React from 'react'
import { Animated, Easing, View } from 'react-native'
import { ThemeContext } from '../../../theme'

import styles from './styles'

interface ITypingIndicatorProps {
    isTyping: boolean
}

const TypingIndicator: React.FC<ITypingIndicatorProps> = ({
    isTyping,
}) => {
    const theme = React.useContext(ThemeContext)
    const themedStyles = styles({ theme })
    const animatedOpacity = React.useRef(new Animated.Value(0)).current
    const animatedScaleDot1 = React.useRef(new Animated.Value(1)).current
    const animatedScaleDot2 = React.useRef(new Animated.Value(1)).current
    const animatedScaleDot3 = React.useRef(new Animated.Value(1)).current

    const basicOptions = {
        duration: 100,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
    }

    const show = Animated.timing(animatedOpacity, {
        toValue: 1,
        ...basicOptions,
    })

    const hide = Animated.timing(animatedOpacity, {
        toValue: 0,
        ...basicOptions,
    })

    const typing = Animated.loop(
        Animated.sequence([
            Animated.timing(animatedScaleDot1, {
                toValue: 1.5,
                ...basicOptions,
            }),
            Animated.timing(animatedScaleDot1, {
                toValue: 1,
                ...basicOptions,
            }),
            Animated.timing(animatedScaleDot2, {
                toValue: 1.5,
                ...basicOptions,
            }),
            Animated.timing(animatedScaleDot2, {
                toValue: 1,
                ...basicOptions,
            }),
            Animated.timing(animatedScaleDot3, {
                toValue: 1.5,
                ...basicOptions,
            }),
            Animated.timing(animatedScaleDot3, {
                toValue: 1,
                ...basicOptions,
            })
        ])
    )

    React.useEffect(() => {
        if (isTyping) {
            show.start(() => {
                typing.start()
            })
        } else {
            hide.start(() => {
                typing.stop()
            })
        }
    }, [isTyping])

    return (
        <View style={themedStyles.container}>
            <Animated.View
                style={[
                    themedStyles.dot,
                    { opacity: animatedOpacity },
                    { transform: [{ scale: animatedScaleDot1 }] },
                ]}
            />
            <Animated.View
                style={[
                    themedStyles.dot,
                    { opacity: animatedOpacity },
                    { transform: [{ scale: animatedScaleDot2 }] },
                ]}
            />
            <Animated.View
                style={[
                    themedStyles.dot,
                    { opacity: animatedOpacity },
                    { transform: [{ scale: animatedScaleDot3 }] },
                ]}
            />
        </View>
    )
}

export default TypingIndicator
