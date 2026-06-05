import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const cappers = [
  {
    name: 'Benny',
    title: "Your Capper's Favorite Capper",
    sports: 'NBA • NHL • NFL • NCAAB • NCAAF • Soccer • MLB',
    record: { wins: 127, losses: 54 },
    winRate: '70.2%',
    streak: '8W',
    rank: 1,
  },
  {
    name: 'Juice AI',
    title: 'AI-Powered Sports Analysis',
    sports: 'MLB • NBA • College Basketball',
    record: { wins: 44, losses: 21 },
    winRate: '67.7%',
    streak: '4W',
    rank: 2,
  },
  {
    name: 'Jimmy',
    title: 'Founder & CEO',
    sports: 'MLB • NBA • NHL • Soccer • WNBA',
    record: { wins: 68, losses: 42 },
    winRate: '61.8%',
    streak: '5W',
    rank: 3,
  },
];

export default function StatsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stats</Text>
        <Text style={styles.headerSub}>Live capper leaderboard</Text>
      </View>

      {/* Season Banner */}
      <View style={styles.seasonBanner}>
        <Ionicons name="trophy" size={18} color="#C9A227" />
        <Text style={styles.seasonText}>2026 Season — Live Records</Text>
      </View>

      {/* Leaderboard */}
      <Text style={styles.sectionLabel}>LEADERBOARD</Text>
      {cappers.map((capper, i) => (
        <View key={i} style={styles.capperCard}>
          <View style={styles.rankBadge}>
            <Text style={styles.rankText}>#{capper.rank}</Text>
          </View>
          <View style={styles.capperInfo}>
            <Text style={styles.capperName}>{capper.name}</Text>
            <Text style={styles.capperTitle}>{capper.title}</Text>
            <Text style={styles.capperSports}>{capper.sports}</Text>
          </View>
          <View style={styles.capperStats}>
            <Text style={styles.statValue}>{capper.record.wins}-{capper.record.losses}</Text>
            <Text style={styles.statLabel}>Record</Text>
            <Text style={[styles.statValue, { fontSize: 13, marginTop: 4 }]}>{capper.winRate}</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
        </View>
      ))}

      {/* Stats Grid */}
      <Text style={styles.sectionLabel}>PLATFORM TOTALS</Text>
      <View style={styles.statsGrid}>
        {[
          { icon: 'people-outline', label: 'Active Cappers', value: '3' },
          { icon: 'baseball-outline', label: 'Sports Covered', value: '7+' },
          { icon: 'trending-up-outline', label: 'Picks This Season', value: '--' },
          { icon: 'trophy-outline', label: 'Best Win Rate', value: '70.2%' },
        ].map((item, i) => (
          <View key={i} style={styles.statBox}>
            <Ionicons name={item.icon as any} size={24} color="#C9A227" />
            <Text style={styles.statBoxValue}>{item.value}</Text>
            <Text style={styles.statBoxLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.disclaimer}>
        Records update automatically as picks are posted and results are tracked. For entertainment and informational purposes only.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  content: { paddingBottom: 40 },
  header: {
    paddingHorizontal: 20, paddingTop: 60, paddingBottom: 8,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  headerSub: { color: '#666', fontSize: 13, marginTop: 2 },
  seasonBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: 16, marginVertical: 16,
    backgroundColor: '#1A1A1A', borderRadius: 12,
    padding: 12, borderLeftWidth: 3, borderLeftColor: '#C9A227',
  },
  seasonText: { color: '#C9A227', fontSize: 13, fontWeight: '600' },
  sectionLabel: {
    color: '#666', fontSize: 11, letterSpacing: 1.5,
    marginHorizontal: 20, marginBottom: 10, fontWeight: '600',
  },
  capperCard: {
    marginHorizontal: 16, marginBottom: 12,
    backgroundColor: '#1A1A1A', borderRadius: 16,
    padding: 16, flexDirection: 'row', alignItems: 'center',
  },
  rankBadge: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#2A2A2A', borderWidth: 1, borderColor: '#C9A227',
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  rankText: { color: '#C9A227', fontSize: 13, fontWeight: 'bold' },
  capperInfo: { flex: 1 },
  capperName: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  capperTitle: { color: '#C9A227', fontSize: 11, marginTop: 2 },
  capperSports: { color: '#666', fontSize: 11, marginTop: 4 },
  capperStats: { alignItems: 'center' },
  statValue: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  statLabel: { color: '#666', fontSize: 11, marginTop: 2 },
  statsGrid: {
    marginHorizontal: 16, marginBottom: 24,
    flexDirection: 'row', flexWrap: 'wrap', gap: 12,
  },
  statBox: {
    backgroundColor: '#1A1A1A', borderRadius: 16,
    padding: 16, alignItems: 'center',
    width: '47%', gap: 8,
  },
  statBoxValue: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  statBoxLabel: { color: '#666', fontSize: 11, textAlign: 'center' },
  disclaimer: {
    color: '#444', fontSize: 11, textAlign: 'center',
    marginHorizontal: 24, lineHeight: 16,
  },
});