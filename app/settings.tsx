import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { colors } from '../src/utils/colors';
import { getExchangeRate, getHistoricalRates } from '../src/services/api';
import CurrencyCard from '../src/components/CurrencyCard';
import ExchangeChart from '../src/components/ExchangeChart';
import RateDetails from '../src/components/RateDetails';

export default function SettingsScreen() {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [historicalData, setHistoricalData] = useState<{ date: string; rate: number; }[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const rate = await getExchangeRate();
    const historical = await getHistoricalRates();
    setExchangeRate(rate);
    setHistoricalData(historical);
    setLastUpdate(new Date());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const maxRate = historicalData.length ? Math.max(...historicalData.map(d => d.rate)) : exchangeRate ?? 0;
  const minRate = historicalData.length ? Math.min(...historicalData.map(d => d.rate)) : exchangeRate ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Mais informações' }} />
      <LinearGradient colors={[colors.background, '#0f0f0f']} style={styles.gradient}>
        {loading || exchangeRate === null ? (
          <View style={[styles.center, { flex: 1 }]}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
            <View style={styles.header}> 
              <Text style={styles.title}>EUR → BRL</Text>
              <Text style={styles.subtitle}>1 EUR = {exchangeRate.toFixed(4)} BRL</Text>
              <Text style={styles.timestamp}>Atualizado: {lastUpdate.toLocaleTimeString('pt-BR')}</Text>
            </View>

            <CurrencyCard fromCurrency="EUR" toCurrency="BRL" rate={exchangeRate} trend={historicalData} />

            <ExchangeChart data={historicalData} />

            <RateDetails baseRate={exchangeRate} />

            <View style={styles.infoCards}>
              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Alta do dia</Text>
                <Text style={styles.infoValue}>R$ {maxRate.toFixed(4)}</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Baixa do dia</Text>
                <Text style={styles.infoValue}>R$ {minRate.toFixed(4)}</Text>
              </View>
            </View>
          </ScrollView>
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
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 6,
  },
  infoCards: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoTitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 6,
  },
  infoValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
