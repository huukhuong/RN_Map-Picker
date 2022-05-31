import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './LoginScreen.styles'
import { ILoginProp } from './ILoginProps'

const LoginScreen: React.FC<ILoginProp> = ({ navigation }) => {

  return (
    <View>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: 'red'
        }}
        onPress={() => {
          navigation.navigate("HomeScreen")
        }}>
        <Text>Click</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen