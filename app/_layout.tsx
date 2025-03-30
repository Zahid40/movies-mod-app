import { Stack } from "expo-router";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar hidden />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
