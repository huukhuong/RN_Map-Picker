import { Text, View } from 'react-native'
import React from 'react'
import styles from './HomeScreen.styles'
import { IHomeProps } from './IHomeProps'

const HomeScreen: React.FC<IHomeProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Home page</Text>
    </View>
  )
}

export default HomeScreen