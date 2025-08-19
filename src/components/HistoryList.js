import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../utils/colors';

export default function HistoryList({ data }) {
  const renderItem = ({ item, index }) => {
    const previousRate = index > 0 ? data[index - 1].rate : item.rate;
    const change = item.rate - previousRate;
    const isPositive = change >= 0;

    return (
      <View style={styles.item}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        
        <View style={styles.rateContainer}>
          <Text style={styles.rate}>R$ {item.rate.toFixed(4)}</Text>
          <View style={styles.changeContainer}>
            <Icon 
              name={isPositive ? "arrow-up" : "arrow-down"} 
              size={16} 
              color={isPositive ? colors.success : colors.danger} 
            />
            <Text style={[
              styles.change,
              { color: isPositive ? colors.success : colors.danger }
            ]}>
              {Math.abs(change).toFixed(4)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico Detalhado</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateContainer: {
    flex: 1,
  },
  date: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  rateContainer: {
    alignItems: 'flex-end',
  },
  rate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  },
});