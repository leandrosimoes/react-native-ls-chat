import React, { useState } from 'react'
import { View, Text, Button, Switch } from 'react-native'
import Chat from './src/components/Chat'

const App = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(false)

    const onOpenChatButtonPress = () => setIsVisible(true)
    const onCloseButtonPress = () => setIsVisible(false)
    const toggleSwitch = () => setIsDarkTheme(!isDarkTheme)

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button title="Open Chat" onPress={onOpenChatButtonPress} />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <Text>Light Theme</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isDarkTheme ? '#81b0ff' : '#f4f3f4'}
                        ios_backgroundColor='#3e3e3e'
                        onValueChange={toggleSwitch}
                        value={isDarkTheme}
                    />
                    <Text>Dark Theme</Text>
                </View>
            </View>
            <Chat
                isVisible={isVisible}
                onCloseButtonPress={onCloseButtonPress}
                isDarkTheme={isDarkTheme}
            />
        </>
    )
}

export default App
