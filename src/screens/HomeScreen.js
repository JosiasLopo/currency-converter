import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useRouter } from 'expo-router';

import { colors } from '../utils/colors';
import { getExchangeRate, getHistoricalRates } from '../services/api';

export default function HomeScreen() {
  const router = useRouter();

  const [exchangeRate, setExchangeRate] = useState(0);
  const [historicalData, setHistoricalData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchData = async () => {
    const rate = await getExchangeRate();
    const historical = await getHistoricalRates();
    setExchangeRate(rate);
    setHistoricalData(historical);
    setLastUpdate(new Date());
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Atualiza a cada minuto
    return () => clearInterval(interval);
  }, []);

  const isUp = useMemo(() => {
    if (!historicalData || historicalData.length < 2) return true;
    const last = historicalData[historicalData.length - 1]?.rate ?? 0;
    const prev = historicalData[historicalData.length - 2]?.rate ?? 0;
    return last >= prev;
  }, [historicalData]);

  const formatTimestamp = (date) => {
    try {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const mm = String(date.getMinutes()).padStart(2, '0');
      return `${y}-${m}-${d} ${hh}:${mm}`;
    } catch (e) {
      return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#dddddd', '#000000']}
        locations={[0.4, 0.8]}
        style={styles.gradient}
      >
        <View style={styles.centerContent}>
          <Text style={styles.pairLabel}>EUR/BRL</Text>

          <Text style={styles.bigNumber}>{exchangeRate.toFixed(2)}</Text>

          <Text style={styles.timestamp}>{formatTimestamp(lastUpdate)}</Text>

          <Icon
            name={isUp ? 'arrow-up-right' : 'arrow-down-right'}
            size={64}
            color={colors.card}
            style={styles.trendIcon}
          />
        </View>

        {/* Calculator no canto inferior esquerdo */}
        <TouchableOpacity onPress={() => router.push('/calculator')} style={[styles.cornerButton, styles.leftBottom]}>
          <Icon name="trello" size={28} color={colors.text} />
        </TouchableOpacity>

        {/* Mais info (antigo settings) no canto inferior direito */}
        <TouchableOpacity onPress={() => router.push('/settings')} style={[styles.cornerButton, styles.rightBottom]}>
          <Icon name="info" size={28} color={colors.text} />
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  pairLabel: {
    fontSize: 18,
    color: colors.card,
    opacity: 0.9,
    letterSpacing: 1,
    marginBottom: 8,
  },
  bigNumber: {
    fontSize: 96,
    color: colors.card,
    fontWeight: '700',
    lineHeight: 108,
  },
  timestamp: {
    fontSize: 16,
    color: colors.card,
    opacity: 0.85,
    marginTop: 8,
  },
  trendIcon: {
    marginTop: 24,
    opacity: 0.9,
  },
  cornerButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    padding: 16,
  },
  leftBottom: {
    left: 8,
    bottom: 8,
  },
  rightBottom: {
    right: 8,
    bottom: 8,
  },
});
