import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GOLD = '#C9A227';
const BLACK = '#0A0A0A';
const DARK = '#141414';
const CARD = '#1A1A1A';
const LOCKED = '#111111';

const USER_IS_VIP = false;
const USER_SUBSCRIPTIONS: string[] = [];

const CAPPERS = [
  {
    id: 'jimmy',
    name: 'Jimmy',
    handle: '@ghostpicksjimmy',
    image: require('../assets/jimmy.png'),
    record: '127-54',
    winRate: '70.2%',
    streak: '🔥 6 Win Streak',
    lastTen: '6-4 Last 10',
    todayStatus: '3 New Picks',
    packages: [
      { label: 'Daily', price: '$24.99', sub: '/day' },
      { label: 'Weekly', price: '$99.99', sub: '/week' },
      { label: 'Monthly', price: '$299.00', sub: '/month' },
    ],
    card: {
      date: 'June 6, 2026',
      plays: [
        {
          id: '1',
          label: 'TOP PLAY',
          sport: 'MLB',
          pick: 'Yankees ML',
          line: '-120',
          confidence: 8.5,
          analysis: 'Strong pitching matchup. Fade the public here.',
          result: null,
        },
        {
          id: '2',
          label: 'PLAY #2',
          sport: 'NBA',
          pick: 'Knicks +5.5',
          line: '-110',
          confidence: 7,
          analysis: 'Home dog with backdoor cover history.',
          result: null,
        },
      ],
    },
  },
  {
    id: 'benny',
    name: 'Benny',
    handle: '@teambenny',
    image: require('../assets/benny.jpg'),
    record: '259-144',
    winRate: '64.3%',
    streak: '🔥 8 Win Streak',
    lastTen: '8-2 Last 10',
    todayStatus: '2 New Picks',
    packages: [
      { label: 'Daily', price: '$19.99', sub: '/day' },
      { label: 'Weekly', price: '$79.99', sub: '/week' },
      { label: 'Monthly', price: '$199.00', sub: '/month' },
    ],
    card: {
      date: 'June 6, 2026',
      plays: [
        {
          id: '1',
          label: 'TOP PLAY',
          sport: 'MLB',
          pick: 'Dodgers ML',
          line: '-130',
          confidence: 9,
          analysis: 'Elite starter on the mound. Line is soft.',
          result: null,
        },
      ],
    },
  },
  {
    id: 'juice',
    name: 'Juice AI',
    handle: '@ghostpicksjuice',
    image: require('../assets/juice.jpg'),
    record: '88-47',
    winRate: '65.2%',
    streak: '🤖 AI Model Hot',
    lastTen: '7-3 Last 10',
    todayStatus: '1 New Pick',
    packages: [
      { label: 'Daily', price: '$14.99', sub: '/day' },
      { label: 'Weekly', price: '$69.99', sub: '/week' },
      { label: 'Monthly', price: '$149.00', sub: '/month' },
    ],
    card: {
      date: 'June 6, 2026',
      plays: [
        {
          id: '1',
          label: 'TOP PLAY',
          sport: 'MLB',
          pick: 'Mariners Under 8.5',
          line: '-105',
          confidence: 7.5,
          analysis: 'Combined ERA flags an under here. That line reeks.',
          result: null,
        },
      ],
    },
  },
];

export default function VIPScreen() {
  const [selectedCapper, setSelectedCapper] = useState<(typeof CAPPERS)[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const isVip = USER_IS_VIP;
  const isSubscribed = (id: string) => USER_SUBSCRIPTIONS.includes(id);

  const handleCapperPress = (capper: (typeof CAPPERS)[0]) => {
    setSelectedCapper(capper);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCapper(null);
  };

  const renderConfidenceBar = (confidence: number) => {
    const pct = (confidence / 10) * 100;
    return (
      <View style={styles.confRow}>
        <Text style={styles.confLabel}>Confidence</Text>
        <View style={styles.confBarBg}>
          <View style={[styles.confBarFill, { width: `${pct}%` }]} />
        </View>
        <Text style={styles.confValue}>{confidence}/10</Text>
      </View>
    );
  };

  const renderPickCard = () => {
    if (!selectedCapper) return null;
    return (
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.modalContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={closeModal}>
            <Ionicons name="arrow-back" size={24} color={GOLD} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
            <View style={styles.cardHeader}>
              <Image source={selectedCapper.image} style={styles.cardAvatar} />
              <View style={{ marginLeft: 14 }}>
                <Text style={styles.cardName}>{selectedCapper.name.toUpperCase()}</Text>
                <Text style={styles.cardHandle}>{selectedCapper.handle}</Text>
                <Text style={styles.cardRecord}>
                  {selectedCapper.record} • {selectedCapper.winRate}
                </Text>
              </View>
            </View>
            <Text style={styles.cardDate}>📅 {selectedCapper.card.date}</Text>
            {selectedCapper.card.plays.map((play, i) => (
              <View key={play.id} style={[styles.playCard, i === 0 && styles.topPlayCard]}>
                <View style={styles.playLabelRow}>
                  {i === 0 && <Text style={styles.starIcon}>⭐ </Text>}
                  <Text style={styles.playLabel}>{play.label}</Text>
                  <Text style={styles.playSport}>{play.sport}</Text>
                </View>
                <View style={styles.playPickRow}>
                  <Text style={styles.playPick}>{play.pick}</Text>
                  <Text style={styles.playLine}>{play.line}</Text>
                </View>
                {renderConfidenceBar(play.confidence)}
                <TouchableOpacity style={styles.analysisToggle}>
                  <Text style={styles.analysisLabel}>Analysis</Text>
                  <Ionicons name="chevron-down" size={16} color={GOLD} />
                </TouchableOpacity>
                <Text style={styles.analysisText}>{play.analysis}</Text>
                {play.result && (
                  <View style={[styles.resultBadge, play.result === 'WIN' ? styles.winBadge : styles.lossBadge]}>
                    <Text style={styles.resultText}>{play.result}</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  const renderUnlockCard = () => {
    if (!selectedCapper) return null;
    return (
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.modalContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={closeModal}>
            <Ionicons name="arrow-back" size={24} color={GOLD} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
            <View style={styles.unlockContainer}>
              <Image source={selectedCapper.image} style={styles.unlockAvatar} />
              <Text style={styles.unlockTitle}>{selectedCapper.name.toUpperCase()} PREMIUM</Text>
              <Text style={styles.unlockSub}>Today's Picks Ready</Text>
              <Text style={styles.unlockRecord}>
                {selectedCapper.record} • {selectedCapper.winRate} • {selectedCapper.lastTen}
              </Text>

              {['Pick #1', 'Pick #2', 'Top Play'].map((p) => (
                <View key={p} style={styles.lockedPickRow}>
                  <Ionicons name="lock-closed" size={16} color="#555" />
                  <Text style={styles.lockedPickText}>{p}</Text>
                </View>
              ))}

              <Text style={styles.unlockCta}>
                Unlock {selectedCapper.name}'s Premium Package
              </Text>
              <Text style={styles.unlockSubCta}>
                Get instant access to all picks, analysis, and alerts.
              </Text>

              {selectedCapper.packages.map((pkg) => (
                <TouchableOpacity key={pkg.label} style={styles.pkgBtn}>
                  <View style={styles.pkgBtnInner}>
                    <Text style={styles.pkgLabel}>{pkg.label.toUpperCase()}</Text>
                    <Text style={styles.pkgPrice}>{pkg.price}<Text style={styles.pkgSub}>{pkg.sub}</Text></Text>
                  </View>
                  <Ionicons name="lock-open-outline" size={18} color={BLACK} />
                </TouchableOpacity>
              ))}

              <Text style={styles.disclaimer}>
                For entertainment purposes only. 21+
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  // NON-VIP LOCKED PAGE
  if (!isVip) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.lockedPage}>
          <View style={styles.lockHero}>
            <View style={styles.lockIconWrap}>
              <Ionicons name="lock-closed" size={40} color={GOLD} />
            </View>
            <Text style={styles.lockTitle}>VIP ACCESS</Text>
            <Text style={styles.lockTagline}>
              Premium Picks.{'\n'}Verified Records.{'\n'}Real-Time Alerts.
            </Text>
          </View>

          {[
            'Daily Premium Plays',
            'All Cappers',
            'Juice AI Access',
            'Live Win Tracking',
            'Members Chat',
            'Early Release Picks',
          ].map((f) => (
            <View key={f} style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={18} color={GOLD} />
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}

          <Text style={styles.sectionLabel}>SELECT A CAPPER TO UNLOCK</Text>

          {CAPPERS.map((capper) => (
            <TouchableOpacity
              key={capper.id}
              style={styles.lockedCapperCard}
              onPress={() => handleCapperPress(capper)}
            >
              <Image source={capper.image} style={styles.lockedCapperAvatar} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.lockedCapperName}>{capper.name}</Text>
                <Text style={styles.lockedCapperStat}>{capper.lastTen} • {capper.winRate}</Text>
                <Text style={styles.lockedCapperPkg}>
                  From {capper.packages[0].price}{capper.packages[0].sub}
                </Text>
              </View>
              <View style={styles.unlockTag}>
                <Text style={styles.unlockTagText}>UNLOCK</Text>
              </View>
            </TouchableOpacity>
          ))}

          <Text style={styles.disclaimer}>For entertainment purposes only. 21+</Text>
        </ScrollView>

        {selectedCapper && renderUnlockCard()}
      </SafeAreaView>
    );
  }

  // VIP MEMBER VIEW
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.memberHeader}>
          <Ionicons name="trophy" size={22} color={GOLD} />
          <Text style={styles.memberTitle}>VIP MEMBERS AREA</Text>
        </View>
        <Text style={styles.todayContent}>Today's Premium Content</Text>
        <Text style={styles.newRelease}>⚡ {CAPPERS.length} New Releases Today</Text>

        {CAPPERS.map((capper) => (
          <TouchableOpacity
            key={capper.id}
            style={styles.capperRow}
            onPress={() => handleCapperPress(capper)}
          >
            <Image source={capper.image} style={styles.rowAvatar} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.rowName}>{capper.name.toUpperCase()}</Text>
              <Text style={styles.rowStat}>{capper.lastTen}</Text>
            </View>
            <TouchableOpacity style={styles.viewBtn} onPress={() => handleCapperPress(capper)}>
              <Text style={styles.viewBtnText}>View Picks →</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedCapper &&
        (isSubscribed(selectedCapper.id) ? renderPickCard() : renderUnlockCard())}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLACK },
  lockedPage: { alignItems: 'center', paddingBottom: 40, paddingTop: 20, paddingHorizontal: 20 },
  lockHero: { alignItems: 'center', marginBottom: 24 },
  lockIconWrap: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#1A1A1A', borderWidth: 2, borderColor: GOLD,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  lockTitle: { color: GOLD, fontSize: 26, fontWeight: '800', letterSpacing: 2 },
  lockTagline: { color: '#AAA', fontSize: 14, textAlign: 'center', marginTop: 8, lineHeight: 22 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, alignSelf: 'flex-start' },
  featureText: { color: '#CCC', fontSize: 14, marginLeft: 8 },
  sectionLabel: {
    color: '#666', fontSize: 11, fontWeight: '700', letterSpacing: 1,
    marginTop: 28, marginBottom: 12, alignSelf: 'flex-start',
  },
  lockedCapperCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: CARD,
    borderRadius: 12, padding: 14, marginBottom: 12, width: '100%',
    borderWidth: 1, borderColor: '#2A2A2A',
  },
  lockedCapperAvatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: GOLD },
  lockedCapperName: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  lockedCapperStat: { color: '#888', fontSize: 12, marginTop: 2 },
  lockedCapperPkg: { color: GOLD, fontSize: 12, marginTop: 3, fontWeight: '600' },
  unlockTag: {
    backgroundColor: GOLD, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
  },
  unlockTagText: { color: BLACK, fontSize: 11, fontWeight: '800' },
  disclaimer: { color: '#444', fontSize: 11, textAlign: 'center', marginTop: 20 },
  memberHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 20, gap: 8 },
  memberTitle: { color: GOLD, fontSize: 18, fontWeight: '800', letterSpacing: 1 },
  todayContent: { color: '#CCC', fontSize: 15, textAlign: 'center', marginTop: 6 },
  newRelease: { color: GOLD, fontSize: 13, textAlign: 'center', marginBottom: 20, marginTop: 4 },
  capperRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: CARD,
    borderRadius: 12, marginHorizontal: 16, marginBottom: 12, padding: 14,
  },
  rowAvatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: GOLD },
  rowName: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  rowStat: { color: GOLD, fontSize: 12, marginTop: 2 },
  viewBtn: { backgroundColor: GOLD, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  viewBtnText: { color: BLACK, fontSize: 12, fontWeight: '700' },
  modalContainer: { flex: 1, backgroundColor: BLACK },
  backBtn: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 8 },
  backText: { color: GOLD, fontSize: 15, fontWeight: '600' },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingBottom: 12, paddingTop: 4,
  },
  cardAvatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: GOLD },
  cardName: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  cardHandle: { color: '#888', fontSize: 12, marginTop: 2 },
  cardRecord: { color: GOLD, fontSize: 13, marginTop: 4 },
  cardDate: { color: '#666', fontSize: 12, paddingHorizontal: 20, marginBottom: 12 },
  playCard: {
    backgroundColor: CARD, borderRadius: 12, marginHorizontal: 16, marginBottom: 14, padding: 16,
  },
  topPlayCard: { borderWidth: 1, borderColor: GOLD },
  playLabelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  starIcon: { fontSize: 14 },
  playLabel: { color: GOLD, fontSize: 11, fontWeight: '700', letterSpacing: 1, flex: 1 },
  playSport: { color: '#888', fontSize: 11 },
  playPickRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 10 },
  playPick: { color: '#FFF', fontSize: 20, fontWeight: '800', flex: 1 },
  playLine: { color: GOLD, fontSize: 16, fontWeight: '700' },
  confRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  confLabel: { color: '#888', fontSize: 11, width: 80 },
  confBarBg: { flex: 1, height: 6, backgroundColor: '#2A2A2A', borderRadius: 3, marginHorizontal: 8 },
  confBarFill: { height: 6, backgroundColor: GOLD, borderRadius: 3 },
  confValue: { color: GOLD, fontSize: 11, width: 36, textAlign: 'right' },
  analysisToggle: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#222', borderRadius: 8, padding: 10, marginBottom: 8,
  },
  analysisLabel: { color: '#CCC', fontSize: 13 },
  analysisText: { color: '#AAA', fontSize: 13, lineHeight: 20 },
  resultBadge: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 4, marginTop: 10 },
  winBadge: { backgroundColor: '#1A4A1A' },
  lossBadge: { backgroundColor: '#4A1A1A' },
  resultText: { color: '#FFF', fontWeight: '700', fontSize: 12 },
  unlockContainer: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 20 },
  unlockAvatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: GOLD, marginBottom: 14 },
  unlockTitle: { color: GOLD, fontSize: 22, fontWeight: '800', letterSpacing: 1 },
  unlockSub: { color: '#AAA', fontSize: 14, marginTop: 6 },
  unlockRecord: { color: '#666', fontSize: 12, marginTop: 4, marginBottom: 24 },
  lockedPickRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: LOCKED,
    width: '100%', borderRadius: 10, padding: 16, marginBottom: 10, gap: 10,
  },
  lockedPickText: { color: '#555', fontSize: 14 },
  unlockCta: { color: '#FFF', fontSize: 17, fontWeight: '700', textAlign: 'center', marginTop: 24 },
  unlockSubCta: { color: '#888', fontSize: 13, textAlign: 'center', marginTop: 6, marginBottom: 20 },
  pkgBtn: {
    backgroundColor: GOLD, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', width: '100%',
    paddingVertical: 16, paddingHorizontal: 20, borderRadius: 10, marginBottom: 12,
  },
  pkgBtnInner: { flexDirection: 'column' },
  pkgLabel: { color: BLACK, fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  pkgPrice: { color: BLACK, fontSize: 20, fontWeight: '800', marginTop: 2 },
  pkgSub: { fontSize: 12, fontWeight: '400' },
});