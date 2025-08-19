import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../utils/colors';
import { getConversionRate } from '../services/api';

export default function RateDetails({ baseRate }) {
  const [usdToBrl, setUsdToBrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdditionalRates();
  }, []);

  const loadAdditionalRates = async () => {
    setLoading(true);
    const rate = await getConversionRate('USD', 'BRL');
    setUsdToBrl(rate);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações Adicionais</Text>
      
      <View style={styles.row}>
        <View style={styles.item}>
          <Icon name="dollar-sign" size={20} color={colors.primary} />
          <Text style={styles.label}>USD → BRL</Text>
          <Text style={styles.value}>
            R$ {usdToBrl ? usdToBrl.toFixed(4) : 'N/A'}
          </Text>
        </View>
        
        <View style={styles.item}>
          <Icon name="percent" size={20} color={colors.primary} />
          <Text style={styles.label}>Spread EUR/USD</Text>
          <Text style={styles.value}>
            {((baseRate / usdToBrl - 1) * 100).toFixed(2)}%
          </Text>
        </View>
      </View>
      
      <View style={styles.note}>
        <Icon name="info" size={16} color={colors.textSecondary} />
        <Text style={styles.noteText}>
          Taxas de câmbio do mercado. Bancos podem aplicar taxas adicionais.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
  },
  value: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  noteText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
});