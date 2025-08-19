import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '../utils/colors';

const screenWidth = Dimensions.get('window').width;

export default function ExchangeChart({ data }) {
  if (!data || data.length === 0) return null;

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [{
      data: data.map(d => d.rate),
    }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de 7 dias</Text>
      
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: colors.card,
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.cardHover,
          decimalPlaces: 3,
          color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(161, 161, 170, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: colors.primary,
          },
        }}
        bezier
        style={styles.chart}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={false}
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
  chart: {
    borderRadius: 16,
  },
});