import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image, Modal, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GOLD = '#C9A227';
const BLACK = '#0A0A0A';
const CARD = '#1A1A1A';

const CAPPERS = [
  {
    id: '1',
    name: 'Jimmy',
    title: 'Founder & CEO',
    handle: '@ghostpicksjimmy',
    photo: require('../assets/jimmy.png'),
    sports: ['MLB', 'NBA', 'NHL', 'Soccer', 'WNBA'],
    record: '68-42',
    winRate: '61.8%',
    streak: '5W',
    bio: 'Founder and CEO of Ghost Picks ATS. A professional sports consultant providing data and math model breakdowns of daily sports analysis. 8 years in the game with a proven track record across multiple sports.',
  },
  {
    id: '2',
    name: 'Benny',
    title: "Your Capper's Favorite Capper",
    handle: '@teambenny',
    photo: require('../assets/benny.jpg'),
    sports: ['NBA', 'NHL', 'NCAAB', 'NCAAF', 'NFL', 'Soccer', 'MLB'],
    record: '127-54',
    winRate: '70.2%',
    streak: '8W',
    bio: 'Not your normal handicapper. Over 15 years of experience in the sports industry. Honesty. Hard Work. Consistency. RESULTS. He considers handicapping an art form — and he lets his numbers do the talking.',
  },
  {
    id: '3',
    name: 'Juice AI',
    title: 'AI-Powered Sports Analysis',
    handle: '@ghostpicksjuice',
    photo: require('../assets/juice.jpg'),
    sports: ['MLB', 'NBA', 'NCAAB'],
    record: '44-21',
    winRate: '67.7%',
    streak: '4W',
    bio: 'Powered by data, built by the Ghost Picks team. An AI-driven sports analysis model combining years of historical data, advanced pattern recognition, and real-time analytics. No gut feelings. No bad days. Just the numbers.',
  },
];

export default function CapperScreen({ navigation }: any) {
  const [selected, setSelected] = useState<typeof CAPPERS[0] | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.headerAccent} />
          <Text style={styles.header}>OUR CAPPERS</Text>
          <View style={styles.headerAccent} />
        </View>

        {CAPPERS.map(capper => (
          <TouchableOpacity
            key={capper.id}
            style={styles.card}
            onPress={() => setSelected(capper)}
            activeOpacity={0.85}
          >
            <Image source={capper.photo} style={styles.photo} />
            <View style={styles.cardInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{capper.name}</Text>
                <Ionicons name="checkmark-circle" size={16} color={GOLD} />
              </View>
              <Text style={styles.title}>{capper.title}</Text>
              <Text style={styles.handle}>{capper.handle}</Text>
              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{capper.winRate}</Text>
                  <Text style={styles.statLabel}>Win Rate</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{capper.record}</Text>
                  <Text style={styles.statLabel}>Record</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={[styles.statValue, { color: '#4CAF50' }]}>{capper.streak}</Text>
                  <Text style={styles.statLabel}>Streak</Text>
                </View>
              </View>
              <View style={styles.sportsRow}>
                {capper.sports.slice(0, 3).map(sport => (
                  <View key={sport} style={styles.sportTag}>
                    <Text style={styles.sportTagText}>{sport}</Text>
                  </View>
                ))}
                {capper.sports.length > 3 && (
                  <View style={styles.sportTag}>
                    <Text style={styles.sportTagText}>+{capper.sports.length - 3}</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.chevronWrap}>
              <Ionicons name="chevron-forward" size={20} color={GOLD} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={!!selected} animationType="slide" onRequestClose={() => setSelected(null)}>
        {selected && (
          <SafeAreaView style={styles.modal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.backBtn} onPress={() => setSelected(null)}>
                <Ionicons name="arrow-back" size={22} color={GOLD} />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle}>{selected.name.toUpperCase()}</Text>
              <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
              <View style={styles.modalPhotoWrap}>
                <Image source={selected.photo} style={styles.modalPhoto} />
                <View style={styles.modalOverlay} />
                <View style={styles.modalPhotoInfo}>
                  <Text style={styles.modalName}>{selected.name}</Text>
                  <Text style={styles.modalTitle}>{selected.title}</Text>
                  <Text style={styles.modalHandle}>{selected.handle}</Text>
                </View>
              </View>

              <View style={styles.modalStatsRow}>
                {[
                  { value: selected.winRate, label: 'Win Rate' },
                  { value: selected.record, label: 'Record' },
                  { value: selected.streak, label: 'Streak' },
                ].map((s, i) => (
                  <View key={i} style={styles.modalStat}>
                    <Text style={styles.modalStatValue}>{s.value}</Text>
                    <Text style={styles.modalStatLabel}>{s.label}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>ABOUT</Text>
                <Text style={styles.bioText}>{selected.bio}</Text>

                <Text style={styles.sectionTitle}>SPORTS COVERED</Text>
                <View style={styles.sportsRow}>
                  {selected.sports.map(sport => (
                    <View key={sport} style={styles.sportTag}>
                      <Text style={styles.sportTagText}>{sport}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.vipBanner}
                  onPress={() => {
                    setSelected(null);
                    navigation.navigate('VIP');
                  }}
                >
                  <Ionicons name="ribbon" size={20} color={BLACK} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.vipBannerTitle}>Ready to follow {selected.name}?</Text>
                    <Text style={styles.vipBannerSub}>Subscribe in the VIP tab to unlock picks.</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={BLACK} />
                </TouchableOpacity>

                <Text style={styles.disclaimer}>
                  For entertainment and informational purposes only. 21+
                </Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLACK },
  content: { padding: 16, paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', marginBottom: 20, gap: 10,
  },
  headerAccent: { flex: 1, height: 1, backgroundColor: '#2A2A2A' },
  header: { color: GOLD, fontSize: 13, letterSpacing: 3, fontFamily: 'Oswald_600SemiBold' },
  card: {
    backgroundColor: CARD, borderRadius: 16, marginBottom: 16,
    borderWidth: 1, borderColor: '#2A2A2A', flexDirection: 'row', overflow: 'hidden',
  },
  photo: { width: 110, height: 150, resizeMode: 'cover' },
  cardInfo: { flex: 1, padding: 14 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  name: { color: '#FFF', fontSize: 18, fontFamily: 'Oswald_700Bold' },
  title: { color: GOLD, fontSize: 11, fontFamily: 'Oswald_400Regular', marginBottom: 2 },
  handle: { color: '#555', fontSize: 11, fontFamily: 'Oswald_400Regular', marginBottom: 10 },
  statsRow: { flexDirection: 'row', marginBottom: 10, gap: 14 },
  stat: { alignItems: 'center' },
  statValue: { color: GOLD, fontFamily: 'Oswald_700Bold', fontSize: 14 },
  statLabel: { color: '#555', fontSize: 10, fontFamily: 'Oswald_400Regular' },
  sportsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  sportTag: {
    backgroundColor: '#1E1E1E', borderRadius: 4,
    paddingHorizontal: 7, paddingVertical: 3,
    borderWidth: 1, borderColor: '#333',
  },
  sportTagText: { color: GOLD, fontSize: 10, fontFamily: 'Oswald_700Bold' },
  chevronWrap: { justifyContent: 'center', paddingRight: 12 },
  modal: { flex: 1, backgroundColor: BLACK },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 16,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1A1A1A',
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: GOLD, fontSize: 15, fontFamily: 'Oswald_400Regular' },
  modalHeaderTitle: { color: '#FFF', fontSize: 16, fontFamily: 'Oswald_700Bold', letterSpacing: 1 },
  modalPhotoWrap: { position: 'relative', height: 260 },
  modalPhoto: { width: '100%', height: 260, resizeMode: 'cover' },
  modalOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalPhotoInfo: { position: 'absolute', bottom: 16, left: 16 },
  modalName: { color: '#FFF', fontSize: 26, fontFamily: 'Oswald_700Bold' },
  modalTitle: { color: GOLD, fontSize: 13, fontFamily: 'Oswald_400Regular', marginTop: 2 },
  modalHandle: { color: '#888', fontSize: 12, fontFamily: 'Oswald_400Regular', marginTop: 2 },
  modalStatsRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    backgroundColor: CARD, padding: 16,
    borderBottomWidth: 1, borderBottomColor: '#2A2A2A',
  },
  modalStat: { alignItems: 'center' },
  modalStatValue: { color: GOLD, fontFamily: 'Oswald_700Bold', fontSize: 20 },
  modalStatLabel: { color: '#666', fontSize: 11, fontFamily: 'Oswald_400Regular', marginTop: 2 },
  section: { padding: 20 },
  sectionTitle: {
    color: GOLD, fontSize: 11, fontFamily: 'Oswald_700Bold',
    letterSpacing: 2, marginBottom: 10, marginTop: 4,
  },
  bioText: {
    color: '#AAA', fontSize: 14, lineHeight: 22,
    marginBottom: 20, fontFamily: 'Oswald_400Regular',
  },
  vipBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: GOLD, borderRadius: 12,
    padding: 16, marginTop: 24, marginBottom: 20,
  },
  vipBannerTitle: { color: BLACK, fontSize: 14, fontFamily: 'Oswald_700Bold' },
  vipBannerSub: { color: BLACK, fontSize: 11, fontFamily: 'Oswald_400Regular', marginTop: 2, opacity: 0.8 },
  disclaimer: {
    color: '#333', fontSize: 11, textAlign: 'center',
    marginTop: 10, fontFamily: 'Oswald_400Regular',
  },
});