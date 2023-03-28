import { View, Text } from 'react-native'
import React from 'react'

const ArtCard = ({item}) => {
  console.log(item);
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  )
}

export default ArtCard