import { View, Text,Image} from 'react-native'
import React from 'react'
import { icons } from '@/assets/constants/icons'

const profile = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flx-col gap-5">
<Image source={icons.person} className="size-10" tintColor="#Fff"/>
     
     <Text className='text-gray-500'>
      Profile
     </Text>
     
      </View>
    </View>
  )
}

export default profile