import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../utils/colors';

export default function CurrencyCard({ fromCurrency, toCurrency, rate, trend }) {
  const percentChange = trend.length > 1 
    ? ((trend[trend.length - 1].rate - trend[0].rate) / trend[0].rate * 100)
    : 0;
  
  const isPositive = percentChange >= 0;

  return (
    <View style={styles.container}>
      <View style={styles.currencyRow}>
        <View style={styles.currency}>
          <Text style={styles.currencySymbol}>€</Text>
          <Text style={styles.currencyCode}>{fromCurrency}</Text>
        </View>
        
        <Icon name="arrow-right" size={24} color={colors.textSecondary} />
        
        <View style={styles.currency}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.currencyCode}>{toCurrency}</Text>
        </View>
      </View>
      
      <View style={styles.changeRow}>
        <Icon 
          name={isPositive ? "trending-up" : "trending-down"} 
          size={20} 
          color={isPositive ? colors.success : colors.danger} 
        />
        <Text style={[
          styles.changeText,
          { color: isPositive ? colors.success : colors.danger }
        ]}>
          {isPositive ? '+' : ''}{percentChange.toFixed(2)}%
        </Text>
        <Text style={styles.changePeriod}>últimos 7 dias</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  currency: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  currencySymbol: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  currencyCode: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  changePeriod: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});