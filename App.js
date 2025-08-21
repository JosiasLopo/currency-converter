import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabLayout from './app/(tabs)/_layout';
import Constants from 'expo-constants';
import { Linking } from 'react-native';

export default function App() {
  useEffect(() => {
    if (Constants.platform?.web) {
      // Inject manifest link
      const link = document.createElement('link');
      link.rel = 'manifest';
      link.href = '/manifest.json';
      document.head.appendChild(link);

      // Register service worker
      const registerServiceWorker = async () => {
        if ('serviceWorker' in navigator) {
          try {
            const registration = await navigator.serviceWorker.register(
              '/service-worker.js',
              {
                scope: '/',
              }
            );
            if (registration.installing) {
              console.log('Service worker installing');
            } else if (registration.waiting) {
              console.log('Service worker installed; ready to work offline');
            } else if (registration.active) {
              console.log('Service worker active');
            }
          } catch (error) {
            console.error(`Registration failed with ${error}`);
          }
        }
      };
      registerServiceWorker();
    }
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <TabLayout />
    </SafeAreaProvider>
  );
}
