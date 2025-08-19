import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import CurrencyCard from '../components/CurrencyCard';
import ExchangeChart from '../components/ExchangeChart';
import Calculator from '../components/Calculator';
import { colors } from '../utils/colors';
import { getExchangeRate, getHistoricalRates } from '../services/api';
import RateDetails from '../components/RateDetails';

export default function HomeScreen() {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [historicalData, setHistoricalData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.background, '#0f0f0f']}
        style={styles.gradient}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
        >
          <View style={styles.header}>
            <Text style={styles.title}>Currency Converter</Text>
            <Text style={styles.subtitle}>EUR → BRL</Text>
          </View>

          <View style={styles.rateContainer}>
            <Text style={styles.currentRate}>
              1 EUR = {exchangeRate.toFixed(4)} BRL
            </Text>
            <Text style={styles.lastUpdate}>
              Atualizado: {lastUpdate.toLocaleTimeString('pt-BR')}
            </Text>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
              onPress={() => setActiveTab('overview')}
            >
              <Icon name="trending-up" size={20} color={colors.text} />
              <Text style={styles.tabText}>Visão Geral</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'calculator' && styles.activeTab]}
              onPress={() => setActiveTab('calculator')}
            >
              <Icon name="trello" size={20} color={colors.text} />
              <Text style={styles.tabText}>Calculadora</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'overview' ? (
            <>
              <CurrencyCard
                fromCurrency="EUR"
                toCurrency="BRL"
                rate={exchangeRate}
                trend={historicalData}
              />
              
              <ExchangeChart data={historicalData} />
              <RateDetails baseRate={exchangeRate} />
              
              <View style={styles.infoCards}>
                <View style={styles.infoCard}>
                  <Icon name="trending-up" size={24} color={colors.success} />
                  <Text style={styles.infoTitle}>Alta do dia</Text>
                  <Text style={styles.infoValue}>
                    R$ {(Math.max(...historicalData.map(d => d.rate)) || exchangeRate).toFixed(4)}
                  </Text>
                </View>
                
                <View style={styles.infoCard}>
                  <Icon name="trending-down" size={24} color={colors.danger} />
                  <Text style={styles.infoTitle}>Baixa do dia</Text>
                  <Text style={styles.infoValue}>
                    R$ {(Math.min(...historicalData.map(d => d.rate)) || exchangeRate).toFixed(4)}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <Calculator exchangeRate={exchangeRate} />
          )}
        </ScrollView>
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
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  rateContainer: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  currentRate: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  lastUpdate: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.text,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
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
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
});