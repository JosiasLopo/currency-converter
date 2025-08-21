import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../utils/colors';

export default function Calculator({ exchangeRate }) {
  const [eurValue, setEurValue] = useState('');
  const [brlValue, setBrlValue] = useState('');
  const [lastEdited, setLastEdited] = useState('eur');
  const [isEurFirst, setIsEurFirst] = useState(true);

  const handleEurChange = (value) => {
    setEurValue(value);
    setLastEdited('eur');
    
    if (value === '') {
      setBrlValue('');
      return;
    }
    
    const numValue = parseFloat(value.replace(',', '.'));
    if (!isNaN(numValue)) {
      setBrlValue((numValue * exchangeRate).toFixed(2).replace('.', ','));
    }
  };

  const handleBrlChange = (value) => {
    setBrlValue(value);
    setLastEdited('brl');
    
    if (value === '') {
      setEurValue('');
      return;
    }
    
    const numValue = parseFloat(value.replace(',', '.'));
    if (!isNaN(numValue)) {
      setEurValue((numValue / exchangeRate).toFixed(2).replace('.', ','));
    }
  };

  const swapValues = () => {
    const temp = eurValue;
    setEurValue(brlValue);
    setBrlValue(temp);
    setLastEdited(lastEdited === 'eur' ? 'brl' : 'eur');
    setIsEurFirst(!isEurFirst);
    if (isEurFirst) {
      handleBrlChange(temp);
    } else {
      handleEurChange(temp);
    }
  };

  const clearValues = () => {
    setEurValue('');
    setBrlValue('');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        {isEurFirst ? (
          <View style={styles.inputWrapper}>
            <View style={styles.currencyLabel}>
              <Text style={styles.currencySymbol}>€</Text>
              <Text style={styles.currencyCode}>EUR</Text>
            </View>
            <TextInput
              style={styles.input}
              value={eurValue}
              onChangeText={handleEurChange}
              placeholder="0,00"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
        ) : (
          <View style={styles.inputWrapper}>
            <View style={styles.currencyLabel}>
              <Text style={styles.currencySymbol}>R$</Text>
              <Text style={styles.currencyCode}>BRL</Text>
            </View>
            <TextInput
              style={styles.input}
              value={brlValue}
              onChangeText={handleBrlChange}
              placeholder="0,00"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
        )}

        <TouchableOpacity style={styles.swapButton} onPress={swapValues}>
          <Icon name="repeat" size={24} color={colors.primary} />
        </TouchableOpacity>

        {!isEurFirst ? (
          <View style={styles.inputWrapper}>
            <View style={styles.currencyLabel}>
              <Text style={styles.currencySymbol}>€</Text>
              <Text style={styles.currencyCode}>EUR</Text>
            </View>
            <TextInput
              style={styles.input}
              value={eurValue}
              onChangeText={handleEurChange}
              placeholder="0,00"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
        ) : (
          <View style={styles.inputWrapper}>
            <View style={styles.currencyLabel}>
              <Text style={styles.currencySymbol}>R$</Text>
              <Text style={styles.currencyCode}>BRL</Text>
            </View>
            <TextInput
              style={styles.input}
              value={brlValue}
              onChangeText={handleBrlChange}
              placeholder="0,00"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={clearValues}>
        <Icon name="trash-2" size={20} color={colors.text} />
        <Text style={styles.clearButtonText}>Limpar</Text>
      </TouchableOpacity>

      <View style={styles.quickAmounts}>
        <Text style={styles.quickAmountsTitle}>Valores rápidos (EUR)</Text>
        <View style={styles.quickAmountsRow}>
          {['10', '50', '100', '500'].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={styles.quickAmount}
              onPress={() => {
                if (isEurFirst) {
                  handleEurChange(amount);
                } else {
                  handleBrlChange(amount);
                }
              }}
            >
              <Text style={styles.quickAmountText}>€{amount}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.conversionInfo}>
        <Icon name="info" size={16} color={colors.textSecondary} />
        <Text style={styles.conversionInfoText}>
          Taxa atual: 1 EUR = {exchangeRate.toFixed(4)} BRL
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  currencyLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 8,
  },
  currencyCode: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  input: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    padding: 0,
  },
  swapButton: {
    alignSelf: 'center',
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 50,
    marginVertical: -6,
    zIndex: 1,
    borderWidth: 1,
    borderColor: colors.border,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  clearButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  quickAmounts: {
    marginBottom: 24,
  },
  quickAmountsTitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  quickAmountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmount: {
    flex: 1,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickAmountText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  conversionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  conversionInfoText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginLeft: 8,
  },
});
