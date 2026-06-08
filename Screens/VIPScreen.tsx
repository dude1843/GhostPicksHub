import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image, Modal, SafeAreaView, Dimensions, Alert, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Purchases from 'react-native-purchases';

const GOLD = '#C9A227';
const BLACK = '#0A0A0A';
const CARD = '#1A1A1A';
const LOCKED = '#111111';
const SCREEN_WIDTH = Dimensions.get('window').width;

const CAPPERS = [
  {
    id: 'jimmy',
    name: 'Jimmy',
    handle: '@ghostpicksjimmy',
    image: require('../assets/jimmy.png'),
    record: '127-54',
    winRate: '70.2%',
    lastTen: '6-4 Last 10',
    packages: [
      { label: 'Daily', price: '$24.99', sub: '/day', productId: 'juice.ai.day' },
      { label: 'Weekly', price: '$99.99', sub: '/week', productId: 'juice.ai.day' },
      { label: 'Monthly', price: '$299.00', sub: '/month', productId: 'juice.ai.day' },
    ],
    card: {
      date: 'June 6, 2026',
      plays: [
        { id: '1', label: 'TOP PLAY', sport: 'MLB', pick: 'Yankees ML', line: '-120', confidence: 8.5, analysis: 'Strong pitching matchup. Fade the public here.', result: null },
        { id: '2', label: 'PLAY #2', sport: 'NBA', pick: 'Knicks +5.5', line: '-110', confidence: 7, analysis: 'Home dog with backdoor cover history.', result: null },
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
    lastTen: '8-2 Last 10',
    packages: [
      { label: 'Daily', price: '$19.99', sub: '/day', productId: 'juice.ai.day' },
      { label: 'Weekly', price: '$79.99', sub: '/week', productId: 'juice.ai.day' },
      { label: 'Monthly', price: '$199.00', sub: '/month', productId: 'juice.ai.day' },
    ],
    card: {
      date: 'June 6, 2026',
      plays: [
        { id: '1', label: 'TOP PLAY', sport: 'MLB', pick: 'Dodgers ML', line: '-130', confidence: 9, analysis: 'Elite starter on the mound. Line is soft.', result: null },
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
    lastTen: '7-3 Last 10',
    packages: [
      { label: 'Daily', price: '$14.99', sub: '/day', productId: 'juice.ai.day' },
      { label: 'Weekly', price: '$69.99', sub: '/week', productId: 'juice.ai.day' },
      { label: 'Monthly', price: '$149.00', sub: '/month', productId: 'juice.ai.day' },
    ],
    card: {
      date: 'June 6, 2026',
      plays: [
        { id: '1', label: 'TOP PLAY', sport: 'MLB', pick: 'Mariners Under 8.5', line: '-105', confidence: 7.5, analysis: 'Combined ERA flags an under here.', result: null },
      ],
    },
  },
];

export default function VIPScreen() {
  const [selectedCapper, setSelectedCapper] = useState<(typeof CAPPERS)[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [checkingVip, setCheckingVip] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        const active = customerInfo.entitlements.active;
        setIsVip(!!active['vip_access']);
      } catch (e) {
        setIsVip(false);
      } finally {
        setCheckingVip(false);
      }
    };
    checkSubscription();
  }, []);

  const handleCapperPress = (capper: (typeof CAPPERS)[0]) => {
    setSelectedCapper(capper);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCapper(null);
  };

  const handlePurchase = async (productId: string, label: string) => {
    try {
      setPurchasing(productId + label);
      const products = await Purchases.getProducts([productId]);
      if (!products || products.length === 0) {
        Alert.alert('Almost Ready', 'Purchase flow is set up and ready. A real store connection is needed to process payments.');
        return;
      }
      await Purchases.purchaseStoreProduct(products[0]);
      const customerInfo = await Purchases.getCustomerInfo();
      setIsVip(!!customerInfo.entitlements.active['vip_access']);
      closeModal();
      Alert.alert('Welcome to VIP!', 'You now have full access to all picks.');
    } catch (e: any) {
      if (!e.userCancelled) {
        Alert.alert('Purchase Failed', e.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setPurchasing(null);
    }
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
                <Text style={styles.cardRecord}>{selectedCapper.record} • {selectedCapper.winRate}</Text>
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
                <View style={styles.analysisToggle}>
                  <Text style={styles.analysisLabel}>Analysis</Text>
                  <Ionicons name="chevron-down" size={16} color={GOLD} />
                </View>
                <Text style={styles.analysisText}>{play.analysis}</Text>
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
              <Text style={styles.unlockRecord}>{selectedCapper.record} • {selectedCapper.winRate} • {selectedCapper.lastTen}</Text>
              {['Pick #1', 'Pick #2', 'Top Play'].map((p) => (
                <View key={p} style={styles.lockedPickRow}>
                  <Ionicons name="lock-closed" size={16} color="#555" />
                  <Text style={styles.lockedPickText}>{p}</Text>
                </View>
              ))}
              <Text style={styles.unlockCta}>Unlock {selectedCapper.name}'s Premium Package</Text>
              <Text style={styles.unlockSubCta}>Get instant access to all picks, analysis, and alerts.</Text>
              {selectedCapper.packages.map((pkg) => (
                <TouchableOpacity
                  key={pkg.label}
                  style={[styles.pkgBtn, purchasing === pkg.productId + pkg.label && { opacity: 0.6 }]}
                  onPress={() => handlePurchase(pkg.productId, pkg.label)}
                  disabled={!!purchasing}
                >
                  <View style={styles.pkgBtnInner}>
                    <Text style={styles.pkgLabel}>{pkg.label.toUpperCase()}</Text>
                    <Text style={styles.pkgPrice}>
                      {purchasing === pkg.productId + pkg.label ? 'Processing...' : pkg.price}
                      <Text style={styles.pkgSub}>{pkg.sub}</Text>
                    </Text>
                  </View>
                  <Ionicons name="lock-open-outline" size={18} color={BLACK} />
                </TouchableOpacity>
              ))}
              <Text style={styles.disclaimer}>For entertainment purposes only. 21+</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  if (checkingVip) {
    return (
      <View style={{ flex: 1, backgroundColor: BLACK, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={GOLD} />
      </View>
    );
  }

  if (!isVip) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.lockedPage}>
          <Image
            source={require('../assets/vip-locked.png')}
            style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH, resizeMode: 'contain', marginBottom: 8 }}
          />
          <Text style={styles.lockTitle}>VIP ACCESS</Text>
          <Text style={styles.lockTagline}>Premium Picks.{'\n'}Verified Records.{'\n'}Real-Time Alerts.</Text>
          <View style={styles.benefitsGrid}>
            {[
              { icon: 'calendar-outline', title: 'Daily Premium Plays', sub: 'Expert-curated picks\nupdated daily' },
              { icon: 'people-outline', title: 'All Cappers', sub: 'Access all top-performing\nverified cappers' },
              { icon: 'hardware-chip-outline', title: 'Juice AI Access', sub: 'AI-powered insights\nand predictions' },
              { icon: 'trending-up-outline', title: 'Live Win Tracking', sub: 'Real-time results\nas they happen' },
              { icon: 'notifications-outline', title: 'SMS Alerts', sub: 'Get texts when\npicks drop' },
              { icon: 'time-outline', title: 'Early Release Picks', sub: 'Get picks before\nthe public' },
            ].map((b) => (
              <View key={b.title} style={styles.benefitCard}>
                <View style={styles.benefitIconWrap}>
                  <Ionicons name={b.icon as any} size={22} color={GOLD} />
                </View>
                <Text style={styles.benefitTitle}>{b.title}</Text>
                <Text style={styles.benefitSub}>{b.sub}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.sectionLabel}>SELECT A CAPPER TO UNLOCK</Text>
          {CAPPERS.map((capper) => (
            <TouchableOpacity key={capper.id} style={styles.lockedCapperCard} onPress={() => handleCapperPress(capper)}>
              <Image source={capper.image} style={styles.lockedCapperAvatar} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.lockedCapperName}>{capper.name}</Text>
                <Text style={styles.lockedCapperStat}>{capper.lastTen} • {capper.winRate}</Text>
                <Text style={styles.lockedCapperPkg}>From {capper.packages[0].price}{capper.packages[0].sub}</Text>
              </View>
              <View style={styles.unlockTag}>
                <Text style={styles.unlockTagText}>UNLOCK</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.trustBar}>
            <Ionicons name="shield-checkmark-outline" size={18} color={GOLD} />
            <Text style={styles.trustText}>Secure. Verified. Trusted.</Text>
          </View>
          <Text style={styles.disclaimer}>For entertainment purposes only. 21+</Text>
        </ScrollView>
        {selectedCapper && renderUnlockCard()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Image
          source={require('../assets/vip-crown.png')}
          style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.7, resizeMode: 'contain', marginBottom: -20 }}
        />
        <View style={styles.memberHero}>
          <View style={styles.trophyBox}>
            <Ionicons name="trophy" size={28} color={GOLD} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.memberTitle}><Text style={{ color: GOLD }}>VIP</Text> MEMBERS AREA</Text>
            <Text style={styles.memberSubtitle}>Today's Premium Content</Text>
            <View style={styles.releaseBadge}>
              <Ionicons name="flash" size={12} color={BLACK} />
              <Text style={styles.releaseText}>{CAPPERS.length} New Releases Today</Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionRow}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionLabelWhite}>TODAY'S TOP VIP PICKS</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all picks →</Text>
          </TouchableOpacity>
        </View>
        {CAPPERS.map((capper) => (
          <TouchableOpacity key={capper.id} style={styles.capperRow} onPress={() => handleCapperPress(capper)}>
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
        <View style={styles.trustBarMember}>
          <View style={styles.trustBarIcon}>
            <Ionicons name="shield-checkmark-outline" size={20} color={GOLD} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.trustBarTitle}>Verified. Trusted. Proven.</Text>
            <Text style={styles.trustBarSub}>All VIP members are verified and performance is tracked in real-time.</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#555" />
        </View>
      </ScrollView>
      {selectedCapper && renderPickCard()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLACK },
  lockedPage: { alignItems: 'center', paddingBottom: 40, paddingTop: 0, paddingHorizontal: 16 },
  lockTitle: { color: GOLD, fontSize: 28, fontFamily: 'Inter_700Bold', letterSpacing: 2, marginBottom: 8, marginTop: 8 },
  lockTagline: { color: '#AAA', fontSize: 14, textAlign: 'center', marginBottom: 24, lineHeight: 22, fontFamily: 'Inter_400Regular' },
  benefitsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28, width: '100%' },
  benefitCard: { backgroundColor: CARD, borderRadius: 12, padding: 14, width: '47%', borderWidth: 1, borderColor: '#2A2A2A' },
  benefitIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(201,162,39,0.12)', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  benefitTitle: { color: '#FFF', fontSize: 13, fontFamily: 'Inter_700Bold', marginBottom: 4 },
  benefitSub: { color: '#666', fontSize: 11, fontFamily: 'Inter_400Regular', lineHeight: 16 },
  sectionLabel: { color: '#666', fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1, marginBottom: 12, alignSelf: 'flex-start' },
  lockedCapperCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: CARD, borderRadius: 12, padding: 14, marginBottom: 12, width: '100%', borderWidth: 1, borderColor: '#2A2A2A' },
  lockedCapperAvatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: GOLD },
  lockedCapperName: { color: '#FFF', fontSize: 15, fontFamily: 'Inter_700Bold' },
  lockedCapperStat: { color: '#888', fontSize: 12, marginTop: 2, fontFamily: 'Inter_400Regular' },
  lockedCapperPkg: { color: GOLD, fontSize: 12, marginTop: 3, fontFamily: 'Inter_600SemiBold' },
  unlockTag: { backgroundColor: GOLD, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  unlockTagText: { color: BLACK, fontSize: 11, fontFamily: 'Inter_700Bold' },
  trustBar: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: CARD, borderRadius: 10, padding: 14, width: '100%', marginTop: 8, marginBottom: 16, borderWidth: 1, borderColor: '#2A2A2A' },
  trustText: { color: '#AAA', fontSize: 13, fontFamily: 'Inter_400Regular' },
  disclaimer: { color: '#444', fontSize: 11, textAlign: 'center', fontFamily: 'Inter_400Regular' },
  memberHero: { flexDirection: 'row', alignItems: 'center', backgroundColor: CARD, borderRadius: 16, margin: 16, padding: 16, borderWidth: 1, borderColor: '#2A2A2A' },
  trophyBox: { width: 52, height: 52, borderRadius: 12, backgroundColor: 'rgba(201,162,39,0.12)', alignItems: 'center', justifyContent: 'center' },
  memberTitle: { color: '#FFF', fontSize: 18, fontFamily: 'Inter_700Bold' },
  memberSubtitle: { color: '#888', fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  releaseBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: GOLD, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, marginTop: 8, alignSelf: 'flex-start' },
  releaseText: { color: BLACK, fontSize: 11, fontFamily: 'Inter_700Bold' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 12, gap: 8 },
  sectionAccent: { width: 3, height: 16, backgroundColor: GOLD, borderRadius: 2 },
  sectionLabelWhite: { color: '#FFF', fontSize: 12, fontFamily: 'Inter_700Bold', letterSpacing: 1, flex: 1 },
  seeAll: { color: GOLD, fontSize: 12, fontFamily: 'Inter_400Regular' },
  capperRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: CARD, borderRadius: 12, marginHorizontal: 16, marginBottom: 12, padding: 14, borderWidth: 1, borderColor: '#2A2A2A' },
  rowAvatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: GOLD },
  rowName: { color: '#FFF', fontSize: 14, fontFamily: 'Inter_700Bold' },
  rowStat: { color: GOLD, fontSize: 12, marginTop: 2, fontFamily: 'Inter_400Regular' },
  viewBtn: { borderWidth: 1, borderColor: GOLD, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  viewBtnText: { color: GOLD, fontSize: 12, fontFamily: 'Inter_700Bold' },
  trustBarMember: { flexDirection: 'row', alignItems: 'center', backgroundColor: CARD, borderRadius: 12, marginHorizontal: 16, padding: 14, gap: 12, borderWidth: 1, borderColor: '#2A2A2A' },
  trustBarIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(201,162,39,0.12)', alignItems: 'center', justifyContent: 'center' },
  trustBarTitle: { color: '#FFF', fontSize: 14, fontFamily: 'Inter_700Bold' },
  trustBarSub: { color: '#666', fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 2 },
  modalContainer: { flex: 1, backgroundColor: BLACK },
  backBtn: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 8 },
  backText: { color: GOLD, fontSize: 15, fontFamily: 'Inter_400Regular' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 12, paddingTop: 4 },
  cardAvatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: GOLD },
  cardName: { color: '#FFF', fontSize: 18, fontFamily: 'Inter_700Bold' },
  cardHandle: { color: '#888', fontSize: 12, marginTop: 2, fontFamily: 'Inter_400Regular' },
  cardRecord: { color: GOLD, fontSize: 13, marginTop: 4, fontFamily: 'Inter_400Regular' },
  cardDate: { color: '#666', fontSize: 12, paddingHorizontal: 20, marginBottom: 12, fontFamily: 'Inter_400Regular' },
  playCard: { backgroundColor: CARD, borderRadius: 12, marginHorizontal: 16, marginBottom: 14, padding: 16 },
  topPlayCard: { borderWidth: 1, borderColor: GOLD },
  playLabelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  starIcon: { fontSize: 14 },
  playLabel: { color: GOLD, fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1, flex: 1 },
  playSport: { color: '#888', fontSize: 11, fontFamily: 'Inter_400Regular' },
  playPickRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 10 },
  playPick: { color: '#FFF', fontSize: 20, fontFamily: 'Inter_700Bold', flex: 1 },
  playLine: { color: GOLD, fontSize: 16, fontFamily: 'Inter_700Bold' },
  confRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  confLabel: { color: '#888', fontSize: 11, width: 80, fontFamily: 'Inter_400Regular' },
  confBarBg: { flex: 1, height: 6, backgroundColor: '#2A2A2A', borderRadius: 3, marginHorizontal: 8 },
  confBarFill: { height: 6, backgroundColor: GOLD, borderRadius: 3 },
  confValue: { color: GOLD, fontSize: 11, width: 36, textAlign: 'right', fontFamily: 'Inter_400Regular' },
  analysisToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#222', borderRadius: 8, padding: 10, marginBottom: 8 },
  analysisLabel: { color: '#CCC', fontSize: 13, fontFamily: 'Inter_400Regular' },
  analysisText: { color: '#AAA', fontSize: 13, lineHeight: 20, fontFamily: 'Inter_400Regular' },
  unlockContainer: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 20 },
  unlockAvatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: GOLD, marginBottom: 14 },
  unlockTitle: { color: GOLD, fontSize: 22, fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  unlockSub: { color: '#AAA', fontSize: 14, marginTop: 6, fontFamily: 'Inter_400Regular' },
  unlockRecord: { color: '#666', fontSize: 12, marginTop: 4, marginBottom: 24, fontFamily: 'Inter_400Regular' },
  lockedPickRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: LOCKED, width: '100%', borderRadius: 10, padding: 16, marginBottom: 10, gap: 10 },
  lockedPickText: { color: '#555', fontSize: 14, fontFamily: 'Inter_400Regular' },
  unlockCta: { color: '#FFF', fontSize: 17, fontFamily: 'Inter_700Bold', textAlign: 'center', marginTop: 24 },
  unlockSubCta: { color: '#888', fontSize: 13, textAlign: 'center', marginTop: 6, marginBottom: 20, fontFamily: 'Inter_400Regular' },
  pkgBtn: { backgroundColor: GOLD, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 10, marginBottom: 12 },
  pkgBtnInner: { flexDirection: 'column' },
  pkgLabel: { color: BLACK, fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  pkgPrice: { color: BLACK, fontSize: 20, fontFamily: 'Inter_700Bold', marginTop: 2 },
  pkgSub: { fontSize: 12, fontFamily: 'Inter_400Regular' },
});