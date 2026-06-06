import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GOLD = '#C9A227';
const BLACK = '#0A0A0A';
const CARD = '#1A1A1A';

const CAPPER_PHOTOS: { [key: string]: any } = {
  'Benny': require('../assets/benny.jpg'),
  'Juice AI': require('../assets/juice.jpg'),
  'Jimmy': require('../assets/jimmy.png'),
};

const cappers = [
  {
    name: 'Benny',
    title: "Your Capper's Favorite Capper",
    sports: 'NBA • NHL • NFL • NCAAB • NCAAF • Soccer • MLB',
    record: '127-54',
    winRate: '70.2%',
    rank: 1,
  },
  {
    name: 'Juice AI',
    title: 'AI-Powered Sports Analysis',
    sports: 'MLB • NBA • College Basketball',
    record: '44-21',
    winRate: '67.7%',
    rank: 2,
  },
  {
    name: 'Jimmy',
    title: 'Founder & CEO',
    sports: 'MLB • NBA • NHL • Soccer • WNBA',
    record: '68-42',
    winRate: '61.8%',
    rank: 3,
  },
];

export default function StatsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Season Banner */}
      <View style={styles.seasonBanner}>
        <Ionicons name="trophy" size={16} color={GOLD} />
        <Text style={styles.seasonText}>2026 SEASON — LIVE RECORDS</Text>
      </View>

      {/* Leaderboard */}
      <View style={styles.sectionRow}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionLabel}>LEADERBOARD</Text>
      </View>

      {cappers.map((capper, i) => (
        <View key={i} style={styles.capperCard}>
          <View style={styles.rankBadge}>
            <Text style={styles.rankText}>#{capper.rank}</Text>
          </View>
          <View style={styles.avatarWrap}>
            <Image source={CAPPER_PHOTOS[capper.name]} style={styles.avatar} />
          </View>
          <View style={styles.capperInfo}>
            <Text style={styles.capperName}>{capper.name}</Text>
            <Text style={styles.capperTitle}>{capper.title}</Text>
            <Text style={styles.capperSports}>{capper.sports}</Text>
          </View>
          <View style={styles.capperStats}>
            <Text style={styles.statValue}>{capper.record}</Text>
            <Text style={styles.statLabel}>Record</Text>
            <Text style={styles.winRate}>{capper.winRate}</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
        </View>
      ))}

      {/* Platform Totals */}
      <View style={styles.sectionRow}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionLabel}>PLATFORM TOTALS</Text>
      </View>

      <View style={styles.statsGrid}>
        {[
          { icon: 'people-outline', label: 'Active Cappers', value: '3' },
          { icon: 'baseball-outline', label: 'Sports Covered', value: '7+' },
          { icon: 'trending-up-outline', label: 'Picks This Season', value: '--' },
          { icon: 'trophy-outline', label: 'Best Win Rate', value: '70.2%' },
        ].map((item, i) => (
          <View key={i} style={styles.statBox}>
            <Ionicons name={item.icon as any} size={26} color={GOLD} />
            <Text style={styles.statBoxValue}>{item.value}</Text>
            <Text style={styles.statBoxLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.disclaimer}>
        Records update automatically as picks are posted and results are tracked.{'\n'}For entertainment and informational purposes only.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLACK },
  content: { paddingBottom: 40, paddingTop: 16 },
  seasonBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: CARD,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: GOLD,
  },
  seasonText: {
    color: GOLD,
    fontSize: 13,
    fontFamily: 'Oswald_700Bold',
    letterSpacing: 1,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  sectionAccent: {
    width: 3,
    height: 16,
    backgroundColor: GOLD,
    borderRadius: 2,
  },
  sectionLabel: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Oswald_700Bold',
    letterSpacing: 1.5,
  },
  capperCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rankText: {
    color: GOLD,
    fontSize: 12,
    fontFamily: 'Oswald_700Bold',
  },
  avatarWrap: {
    borderWidth: 2,
    borderColor: GOLD,
    borderRadius: 26,
    marginRight: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  capperInfo: { flex: 1 },
  capperName: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Oswald_700Bold',
  },
  capperTitle: {
    color: GOLD,
    fontSize: 10,
    fontFamily: 'Oswald_400Regular',
    marginTop: 2,
  },
  capperSports: {
    color: '#666',
    fontSize: 10,
    fontFamily: 'Oswald_400Regular',
    marginTop: 3,
  },
  capperStats: {
    alignItems: 'flex-end',
  },
  statValue: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Oswald_700Bold',
  },
  winRate: {
    color: GOLD,
    fontSize: 14,
    fontFamily: 'Oswald_700Bold',
    marginTop: 4,
  },
  statLabel: {
    color: '#666',
    fontSize: 10,
    fontFamily: 'Oswald_400Regular',
  },
  statsGrid: {
    marginHorizontal: 16,
    marginBottom: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    width: '47%',
    gap: 6,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statBoxValue: {
    color: '#FFF',
    fontSize: 22,
    fontFamily: 'Oswald_700Bold',
  },
  statBoxLabel: {
    color: '#666',
    fontSize: 11,
    fontFamily: 'Oswald_400Regular',
    textAlign: 'center',
  },
  disclaimer: {
    color: '#444',
    fontSize: 11,
    textAlign: 'center',
    marginHorizontal: 24,
    lineHeight: 18,
    fontFamily: 'Oswald_400Regular',
  },
});