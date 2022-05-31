import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './LoginScreen.styles'
import { INavigationProps } from '../../navigations/INavigationProps'

const LoginScreen: React.FC<INavigationProps> = ({ navigation }) => {

  return (
    <View>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: 'red'
        }}
        onPress={() => {
          navigation.navigate("HomeScreen", { title: "Hello" })
        }}>
        <Text>Click</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen