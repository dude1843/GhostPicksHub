import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image, Modal
} from 'react-native';

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
    packages: [
      { name: 'Full Day All Sports', price: '$24.99', label: 'Top Seller' },
      { name: 'Full Week Special', price: '$99.99', label: 'All Plays Included' },
      { name: 'Month of June', price: '$299.00', label: 'Huge Month' },
      { name: 'One Day MLB Package', price: '$19.99', label: "Let's Eat" },
      { name: 'Full Week Premium MLB', price: '$79.99', label: 'BOGO Promo' },
      { name: 'NBA 7 Day Package', price: '$99.99', label: 'Slam Dunk' },
    ],
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
    bio: 'Not your normal handicapper. Over 15 years of experience in the sports industry. Honesty. Hard Work. Consistency. RESULTS. Benny grew up in the restaurant business where he learned the importance of hospitality and customer engagement. He considers handicapping an art form — and he lets his numbers do the talking.',
    packages: [
      { name: 'Benny Month', price: '$169.99', label: 'Sweep Special' },
      { name: 'Benny Top Tier Month', price: '$199.99', label: 'All Sports' },
      { name: 'Bonanza Full Month MLB', price: '$199.99', label: '30 Days' },
      { name: "Benny's NBA Full Season", price: '$99.99', label: 'Playoffs' },
      { name: 'Benny Trifecta', price: '$499.99', label: 'Huge Value' },
      { name: 'Benny Soccer Day', price: '$9.99', label: 'Quick Hit' },
    ],
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
    bio: 'Powered by data, built by the Ghost Picks team. An AI-driven sports analysis model combining years of historical data, advanced pattern recognition, and real-time analytics to deliver calculated, emotion-free picks every single day. No gut feelings. No bad days. No excuses. Just the numbers. When the model locks in, it locks in for a reason — and the numbers never lie.',
    packages: [
      { name: 'Juice AI Day Pass', price: '$19.99', label: 'Data Drop' },
      { name: 'Juice AI Week', price: '$59.99', label: 'Full Model' },
      { name: 'Juice AI Month', price: '$149.99', label: 'Best Value' },
    ],
  },
];

export default function CapperScreen() {
  const [selected, setSelected] = useState<typeof CAPPERS[0] | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>OUR CAPPERS</Text>
        {CAPPERS.map(capper => (
          <TouchableOpacity
            key={capper.id}
            style={styles.card}
            onPress={() => setSelected(capper)}
          >
            <Image source={capper.photo} style={styles.photo} />
            <View style={styles.cardInfo}>
              <Text style={styles.name}>{capper.name}</Text>
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
                {capper.sports.slice(0, 4).map(sport => (
                  <View key={sport} style={styles.sportTag}>
                    <Text style={styles.sportTagText}>{sport}</Text>
                  </View>
                ))}
                {capper.sports.length > 4 && (
                  <View style={styles.sportTag}>
                    <Text style={styles.sportTagText}>+{capper.sports.length - 4}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={!!selected} animationType="slide" onRequestClose={() => setSelected(null)}>
        {selected && (
          <ScrollView style={styles.modal}>
            <Image source={selected.photo} style={styles.modalPhoto} />
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.backButton} onPress={() => setSelected(null)}>
                <Text style={styles.backText}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.modalName}>{selected.name}</Text>
              <Text style={styles.modalTitle}>{selected.title}</Text>
              <Text style={styles.modalHandle}>{selected.handle}</Text>

              <View style={styles.modalStatsRow}>
                <View style={styles.modalStat}>
                  <Text style={styles.modalStatValue}>{selected.winRate}</Text>
                  <Text style={styles.modalStatLabel}>Win Rate</Text>
                </View>
                <View style={styles.modalStat}>
                  <Text style={styles.modalStatValue}>{selected.record}</Text>
                  <Text style={styles.modalStatLabel}>Record</Text>
                </View>
                <View style={styles.modalStat}>
                  <Text style={[styles.modalStatValue, { color: '#4CAF50' }]}>{selected.streak}</Text>
                  <Text style={styles.modalStatLabel}>Streak</Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>ABOUT</Text>
              <Text style={styles.bioText}>{selected.bio}</Text>

              <Text style={styles.sectionTitle}>SPORTS</Text>
              <View style={styles.sportsRow}>
                {selected.sports.map(sport => (
                  <View key={sport} style={styles.sportTag}>
                    <Text style={styles.sportTagText}>{sport}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.sectionTitle}>PACKAGES</Text>
              {selected.packages.map((pkg, i) => (
                <View key={i} style={styles.packageCard}>
                  <View>
                    <Text style={styles.packageName}>{pkg.name}</Text>
                    {pkg.label && <Text style={styles.packageLabel}>{pkg.label}</Text>}
                  </View>
                  <TouchableOpacity style={styles.packageButton}>
                    <Text style={styles.packagePrice}>{pkg.price}</Text>
                    <Text style={styles.packageBuy}>GET</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <Text style={styles.disclaimer}>
                For entertainment and informational purposes only.
              </Text>
            </View>
          </ScrollView>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    color: '#C9A227',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#141414',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  photo: {
    width: 110,
    height: 140,
    resizeMode: 'cover',
  },
  cardInfo: {
    flex: 1,
    padding: 12,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: '#C9A227',
    fontSize: 11,
    marginBottom: 2,
  },
  handle: {
    color: '#555',
    fontSize: 11,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 12,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: '#C9A227',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statLabel: {
    color: '#555',
    fontSize: 10,
  },
  sportsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  sportTag: {
    backgroundColor: '#1E1E1E',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#333',
  },
  sportTagText: {
    color: '#C9A227',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modal: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  modalPhoto: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  modalContent: {
    padding: 20,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    color: '#C9A227',
    fontSize: 16,
  },
  modalName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  modalTitle: {
    color: '#C9A227',
    fontSize: 13,
    marginBottom: 4,
  },
  modalHandle: {
    color: '#555',
    fontSize: 13,
    marginBottom: 20,
  },
  modalStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#141414',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#222',
  },
  modalStat: {
    alignItems: 'center',
  },
  modalStatValue: {
    color: '#C9A227',
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalStatLabel: {
    color: '#555',
    fontSize: 11,
    marginTop: 2,
  },
  sectionTitle: {
    color: '#C9A227',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 10,
    marginTop: 4,
  },
  bioText: {
    color: '#AAAAAA',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  packageCard: {
    backgroundColor: '#141414',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packageName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  packageLabel: {
    color: '#555',
    fontSize: 11,
    marginTop: 2,
  },
  packageButton: {
    alignItems: 'center',
    backgroundColor: '#C9A227',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  packagePrice: {
    color: '#0A0A0A',
    fontWeight: 'bold',
    fontSize: 13,
  },
  packageBuy: {
    color: '#0A0A0A',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  disclaimer: {
    color: '#333',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
});