import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { colors } from '../src/utils/colors';
import { getExchangeRate } from '../src/services/api';
import Calculator from '../src/components/Calculator';

export default function CalculatorScreen() {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      const rate = await getExchangeRate();
      setExchangeRate(rate);
    };
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Calculator' }} />
      <LinearGradient colors={[colors.background, '#0f0f0f']} style={styles.gradient}>
        {exchangeRate === null ? (
          <View style={[styles.center, { flex: 1 }]}> 
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <Calculator exchangeRate={exchangeRate} />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
