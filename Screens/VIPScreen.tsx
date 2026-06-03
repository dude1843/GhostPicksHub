import { View, Text, StyleSheet } from 'react-native';

export default function VIPScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>VIP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#C9A227',
    fontSize: 24,
    fontWeight: 'bold',
  },
});