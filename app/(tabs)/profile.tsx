import { useAuth } from "@clerk/clerk-expo"
import { Link } from "expo-router"
import { View, Text, Button } from "react-native"

export default function Page() {
  //const { signOut, isSignedIn } = useAuth()
  return (
    <View>
      {/* <Button title="Log out" onPress={() => signOut()} />
      {!isSignedIn && (
        <Link href={"/(modals)/login"}>
          <Text>Login</Text>
        </Link>
      )} */}
    </View>
  )
}
