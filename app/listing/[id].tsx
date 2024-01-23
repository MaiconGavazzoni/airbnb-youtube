import { useLocalSearchParams } from "expo-router"
import { View, Text } from "react-native"

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>()
  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}
