import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import {images} from 'assets/constants/images'
import {icons} from 'assets/constants/icons'
import { StyleProp, TextStyle } from 'react-native';


type Props = {
  placeholder: string;
  onPress?: () => void;
  value: string;
  onCancelButtonPress?: () => void;
  onChangeText: (text: string) => void;
  style?: StyleProp<TextStyle>; 
};

const SearchBar = ({placeholder,onPress,value,onChangeText,style}: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image source={icons.search} className="size-5" resizeMode='contain' tintColor='#ab8bff'/>
      <TextInput
      onPress={onPress}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[{ color: 'black', padding: 10 }, style]}
      placeholderTextColor="#a8b5db"/>
    </View>
  )
}

export default SearchBar