import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, onSnapshot, collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const GOLD = '#C9A227';
const BLACK = '#0A0A0A';
const CARD = '#1A1A1A';

const CAPPER_PHOTOS: { [key: string]: any } = {
  'Benny': require('../assets/benny.jpg'),
  'Juice AI': require('../assets/juice.jpg'),
  'Jimmy': require('../assets/jimmy.png'),
};

const DEFAULT_CAPPERS = [
  {
    name: 'Benny',
    title: "Your Capper's Favorite Capper",
    sports: 'NBA • NHL • NFL • NCAAB • NCAAF • Soccer • MLB',
    wins: 0,
    losses: 0,
    rank: 1,
  },
  {
    name: 'Juice AI',
    title: 'AI-Powered Sports Analysis',
    sports: 'MLB • NBA • College Basketball',
    wins: 0,
    losses: 0,
    rank: 2,
  },
  {
    name: 'Jimmy',
    title: 'Founder & CEO',
    sports: 'MLB • NBA • NHL • Soccer • WNBA',
    wins: 0,
    losses: 0,
    rank: 3,
  },
];

export default function StatsScreen() {
  const [records, setRecords] = useState<{ [key: string]: { wins: number, losses: number } }>({});
  const [loading, setLoading] = useState(true);
  const [totalPicks, setTotalPicks] = useState(0);

  useEffect(() => {
    const unsubs: (() => void)[] = [];
    let loadedCount = 0;

    DEFAULT_CAPPERS.forEach(capper => {
      const unsub = onSnapshot(doc(db, 'records', capper.name), (snap) => {
        if (snap.exists()) {
          setRecords(prev => ({
            ...prev,
            [capper.name]: {
              wins: snap.data().wins || 0,
              losses: snap.data().losses || 0,
            }
          }));
        }
        loadedCount++;
        if (loadedCount >= DEFAULT_CAPPERS.length) setLoading(false);
      }, () => {
        loadedCount++;
        if (loadedCount >= DEFAULT_CAPPERS.length) setLoading(false);
      });
      unsubs.push(unsub);
    });

    getCountFromServer(collection(db, 'posts')).then(snap => {
      setTotalPicks(snap.data().count);
    }).catch(() => {});

    return () => unsubs.forEach(u => u());
  }, []);

  const getRecord = (name: string, defaultWins: number, defaultLosses: number) => {
    const r = records[name];
    const wins = r ? r.wins : defaultWins;
    const losses = r ? r.losses : defaultLosses;
    const total = wins + losses;
    const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) + '%' : '0.0%';
    return { record: `${wins}-${losses}`, winRate };
  };

  const sortedCappers = [...DEFAULT_CAPPERS].sort((a, b) => {
    const aR = getRecord(a.name, a.wins, a.losses);
    const bR = getRecord(b.name, b.wins, b.losses);
    return parseFloat(bR.winRate) - parseFloat(aR.winRate);
  }).map((c, i) => ({ ...c, rank: i + 1 }));

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: BLACK, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={GOLD} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <View style={styles.seasonBanner}>
        <Ionicons name="trophy" size={16} color={GOLD} />
        <Text style={styles.seasonText}>2026 SEASON — LIVE RECORDS</Text>
      </View>

      <View style={styles.sectionRow}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionLabel}>LEADERBOARD</Text>
      </View>

      {sortedCappers.map((capper, i) => {
        const { record, winRate } = getRecord(capper.name, capper.wins, capper.losses);
        return (
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
              <Text style={styles.statValue}>{record}</Text>
              <Text style={styles.statLabel}>Record</Text>
              <Text style={styles.winRate}>{winRate}</Text>
              <Text style={styles.statLabel}>Win Rate</Text>
            </View>
          </View>
        );
      })}

      <View style={styles.sectionRow}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionLabel}>PLATFORM TOTALS</Text>
      </View>

      <View style={styles.statsGrid}>
        {[
          { icon: 'people-outline', label: 'Active Cappers', value: '3' },
          { icon: 'baseball-outline', label: 'Sports Covered', value: '7+' },
          { icon: 'trending-up-outline', label: 'Picks This Season', value: String(totalPicks) },
          { icon: 'trophy-outline', label: 'Best Win Rate', value: sortedCappers[0] ? getRecord(sortedCappers[0].name, sortedCappers[0].wins, sortedCappers[0].losses).winRate : '--' },
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
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: 16, marginBottom: 20, backgroundColor: CARD,
    borderRadius: 10, padding: 14, borderWidth: 1, borderColor: GOLD,
  },
  seasonText: { color: GOLD, fontSize: 13, fontFamily: 'Oswald_700Bold', letterSpacing: 1 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 12, gap: 8 },
  sectionAccent: { width: 3, height: 16, backgroundColor: GOLD, borderRadius: 2 },
  sectionLabel: { color: '#FFF', fontSize: 12, fontFamily: 'Oswald_700Bold', letterSpacing: 1.5 },
  capperCard: {
    marginHorizontal: 16, marginBottom: 12, backgroundColor: CARD,
    borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#2A2A2A',
  },
  rankBadge: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#2A2A2A',
    borderWidth: 1, borderColor: GOLD, alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  rankText: { color: GOLD, fontSize: 12, fontFamily: 'Oswald_700Bold' },
  avatarWrap: { borderWidth: 2, borderColor: GOLD, borderRadius: 26, marginRight: 10 },
  avatar: { width: 48, height: 48, borderRadius: 24, resizeMode: 'cover' },
  capperInfo: { flex: 1 },
  capperName: { color: '#FFF', fontSize: 15, fontFamily: 'Oswald_700Bold' },
  capperTitle: { color: GOLD, fontSize: 10, fontFamily: 'Oswald_400Regular', marginTop: 2 },
  capperSports: { color: '#666', fontSize: 10, fontFamily: 'Oswald_400Regular', marginTop: 3 },
  capperStats: { alignItems: 'flex-end' },
  statValue: { color: '#FFF', fontSize: 14, fontFamily: 'Oswald_700Bold' },
  winRate: { color: GOLD, fontSize: 14, fontFamily: 'Oswald_700Bold', marginTop: 4 },
  statLabel: { color: '#666', fontSize: 10, fontFamily: 'Oswald_400Regular' },
  statsGrid: { marginHorizontal: 16, marginBottom: 24, flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statBox: {
    backgroundColor: CARD, borderRadius: 14, padding: 16, alignItems: 'center',
    width: '47%', gap: 6, borderWidth: 1, borderColor: '#2A2A2A',
  },
  statBoxValue: { color: '#FFF', fontSize: 22, fontFamily: 'Oswald_700Bold' },
  statBoxLabel: { color: '#666', fontSize: 11, fontFamily: 'Oswald_400Regular', textAlign: 'center' },
  disclaimer: {
    color: '#444', fontSize: 11, textAlign: 'center',
    marginHorizontal: 24, lineHeight: 18, fontFamily: 'Oswald_400Regular',
  },
});