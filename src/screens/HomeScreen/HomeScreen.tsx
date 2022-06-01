import { StatusBar, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import styles from './HomeScreen.styles'
import { INavigationProps } from '../../navigations/INavigationProps'
import MapView from 'react-native-maps';

const HomeScreen: React.FC<INavigationProps> = ({ navigation, route }) => {

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.750870,
          longitude: 106.702710,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  )
}

export default HomeScreen