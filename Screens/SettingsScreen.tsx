import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Switch, Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GOLD = '#C9A227';
const BLACK = '#0A0A0A';
const CARD = '#1A1A1A';

export default function SettingsScreen({ navigation }: any) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [promoEnabled, setPromoEnabled] = useState(true);
  const [resultEnabled, setResultEnabled] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={GOLD} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.sectionRow}>
        <Ionicons name="notifications-outline" size={16} color={GOLD} />
        <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
      </View>
      <View style={styles.section}>
        {[
          { label: 'Push Notifications', sub: 'Get notified when picks drop', value: pushEnabled, setter: setPushEnabled },
          { label: 'SMS Alerts', sub: 'Text message alerts for picks', value: smsEnabled, setter: setSmsEnabled },
          { label: 'Promo Alerts', sub: 'Limited-time deals and offers', value: promoEnabled, setter: setPromoEnabled },
          { label: 'Result Updates', sub: 'Get notified when results post', value: resultEnabled, setter: setResultEnabled },
        ].map((item, i, arr) => (
          <View key={item.label}>
            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowValue}>{item.sub}</Text>
              </View>
              <Switch
                value={item.value}
                onValueChange={item.setter}
                trackColor={{ false: '#2A2A2A', true: GOLD }}
                thumbColor={item.value ? BLACK : '#888'}
              />
            </View>
            {i < arr.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>

      <View style={styles.sectionRow}>
        <Ionicons name="shield-checkmark-outline" size={16} color={GOLD} />
        <Text style={styles.sectionLabel}>LEGAL</Text>
      </View>
      <View style={styles.section}>
        {[
          { label: 'Terms of Service', url: 'https://www.ghostpicksats.com/terms-and-conditions' },
          { label: 'Privacy Policy', url: 'https://www.ghostpicksats.com/terms-and-conditions' },
        ].map((item, i, arr) => (
          <View key={item.label}>
            <TouchableOpacity style={styles.row} onPress={() => Linking.openURL(item.url)}>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>{item.label}</Text>
              </View>
              <Ionicons name="open-outline" size={18} color="#444" />
            </TouchableOpacity>
            {i < arr.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>

      <View style={styles.sectionRow}>
        <Ionicons name="information-circle-outline" size={16} color={GOLD} />
        <Text style={styles.sectionLabel}>DISCLAIMER</Text>
      </View>
      <View style={styles.disclaimerCard}>
        <Ionicons name="information-circle-outline" size={20} color={GOLD} style={{ marginBottom: 8 }} />
        <Text style={styles.disclaimerText}>
          Ghost Picks is a sports analysis and information service for entertainment and informational purposes only. No wagers are processed within the app. Ghost Picks does not link to any sportsbooks. Must be 21+ to use this service.
        </Text>
      </View>

      <Text style={styles.version}>Ghost Picks Hub • Version 1.0.0</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLACK },
  content: { paddingBottom: 60 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: GOLD, fontSize: 15 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: '600', letterSpacing: 0.3 },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
    gap: 8,
  },
  sectionLabel: { color: GOLD, fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  section: {
    marginHorizontal: 16,
    backgroundColor: CARD,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowText: { flex: 1 },
  rowLabel: { color: '#FFF', fontSize: 15, fontWeight: '500' },
  rowValue: { color: '#666', fontSize: 12, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#2A2A2A', marginHorizontal: 16 },
  disclaimerCard: {
    marginHorizontal: 16,
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    alignItems: 'center',
  },
  disclaimerText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 20,
  },
  version: {
    color: '#333',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 20,
  },
});