import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabLayout from './app/(tabs)/_layout';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <TabLayout />
    </SafeAreaProvider>
  );
}
