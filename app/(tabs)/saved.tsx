import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { icons } from '@/assets/constants/icons'

const saved = () => {
  return (
       <View className="bg-primary flex-1 px-10">
         <View className="flex justify-center items-center flex-1 flx-col gap-5">
   <Image source={icons.save} className="size-10" tintColor="#Fff"/>
        
        <Text className='text-gray-500'>
         Saved
        </Text>
        
         </View>
       </View>
     )
}

export default saved