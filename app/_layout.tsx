import { ClerkProvider } from "@clerk/clerk-expo"
import * as SecureStore from "expo-secure-store"
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { SplashScreen, Stack } from "expo-router"
import { useCallback, useEffect } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView, StyleSheet, View, Text } from "react-native"

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (error) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (error) {
      return
    }
  },
}

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from "expo-router"

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "(tabs)",
// }

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ["mon"]: Montserrat_400Regular,
    ["mon-sb"]: Montserrat_600SemiBold,
    ["mon-b"]: Montserrat_700Bold,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      console.log("ERRO")
      throw error
    }
  }, [error])

  useEffect(() => {
    if (loaded) {
      console.log("LEU", CLERK_PUBLISHABLE_KEY)

      SplashScreen.hideAsync()
    }
  }, [loaded])

  // const onLayoutRootView = useCallback(async () => {
  //   if (loaded || error) {
  //     console.log("LEU")
  //     SplashScreen.hideAsync()
  //   }
  // }, [loaded, error])

  // if (!loaded) {
  //   console.log("APP LOAD")
  //   return null
  // }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

function RootLayoutNav() {
  //const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  // useEffect(() => {
  //   if (isLoaded && !isSignedIn) {
  //     router.push("/(modals)/login")
  //   }
  // }, [isLoaded])
  return (
    <Stack screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: "Log in or sign up",
          //headerTitleStyle: { fontFamily: "mon-sb" },
          animation: "slide_from_bottom",
          presentation: "modal",
          headerLeft: (props) => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="listing/[id]" options={{ headerTitle: "" }} />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          animation: "fade",
          presentation: "transparentModal",
          headerLeft: (props) => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  )
}
