import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image
} from 'react-native';

const GOLD = '#C9A227';
const BLACK = '#0A0A0A';
const CARD = '#141414';

const CAPPER_PHOTOS: { [key: string]: any } = {
  'Jimmy': require('../assets/jimmy.png'),
  'Benny': require('../assets/benny.jpg'),
  'Juice AI': require('../assets/juice.jpg'),
};

const SAMPLE_POSTS = [
  {
    id: '1',
    type: 'pick',
    capper: 'Jimmy',
    handle: '@ghostpicksjimmy',
    sport: 'MLB',
    time: 'Today 10:00 AM',
    content: 'Cardinals vs Cubs — Take the Over. Pitching matchup sets up perfectly for a high scoring game. Both bullpens have been shaky all week. Strong play today.',
    confidence: 'HIGH',
    tails: 42,
    fades: 8,
  },
  {
    id: '2',
    type: 'promo',
    capper: 'Jimmy',
    handle: '@ghostpicksjimmy',
    sport: null,
    time: 'Today 9:00 AM',
    content: '🔥 JUNE SPECIAL — Full Month of MLB for $299. Every play, every alert, all month long. DM or visit ghostpicksats.com to lock in.',
    confidence: null,
    tails: null,
    fades: null,
  },
  {
    id: '3',
    type: 'pick',
    capper: 'Juice AI',
    handle: '@ghostpicksjuice',
    sport: 'NBA',
    time: 'Today 8:30 AM',
    content: 'Celtics -4.5. Model shows Boston covering in 78% of similar matchups this season. Data does not lie on this one.',
    confidence: 'MEDIUM',
    tails: 31,
    fades: 12,
  },
  {
    id: '4',
    type: 'pick',
    capper: 'Benny',
    handle: '@teambenny',
    sport: 'Soccer',
    time: 'Yesterday',
    content: 'Champions League — Real Madrid ML. They have not lost a home match in 14 straight. Back the chalk here, no overthinking it.',
    confidence: 'HIGH',
    tails: 67,
    fades: 5,
  },
  {
    id: '5',
    type: 'promo',
    capper: 'Benny',
    handle: '@teambenny',
    sport: null,
    time: 'Yesterday',
    content: '⚡ Benny Month is LIVE — All Sports, All Plays for $169.99 (normally $299.99). This is the sweep special. Get in now at ghostpicksats.com/team-benny',
    confidence: null,
    tails: null,
    fades: null,
  },
];

export default function FeedScreen() {
  const [votes, setVotes] = useState<{ [key: string]: 'tail' | 'fade' | null }>({});

  const handleVote = (id: string, vote: 'tail' | 'fade') => {
    setVotes(prev => ({
      ...prev,
      [id]: prev[id] === vote ? null : vote,
    }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerAccent} />
        <Text style={styles.header}>GHOST PICKS FEED</Text>
        <View style={styles.headerAccent} />
      </View>

      {SAMPLE_POSTS.map(post => (
        <View key={post.id} style={[styles.card, post.type === 'promo' && styles.promoCard]}>

          {/* Card Header */}
          <View style={styles.cardHeader}>
            <View style={styles.capperInfo}>
              <View style={styles.avatarWrap}>
                <Image source={CAPPER_PHOTOS[post.capper]} style={styles.avatar} />
              </View>
              <View>
                <Text style={styles.capperName}>{post.capper}</Text>
                <Text style={styles.handle}>{post.handle}</Text>
              </View>
            </View>
            {post.sport && (
              <View style={styles.sportBadge}>
                <Text style={styles.sportText}>{post.sport}</Text>
              </View>
            )}
            {post.type === 'promo' && (
              <View style={styles.promoBadge}>
                <Text style={styles.promoText}>PROMO</Text>
              </View>
            )}
          </View>

          {/* Confidence */}
          {post.confidence && (
            <Text style={[
              styles.confidence,
              { color: post.confidence === 'HIGH' ? GOLD : '#888' }
            ]}>
              ⭐ {post.confidence} CONFIDENCE
            </Text>
          )}

          {/* Content */}
          <Text style={styles.postContent}>{post.content}</Text>
          <Text style={styles.time}>{post.time}</Text>

          {/* Tail / Fade */}
          {post.type === 'pick' && (
            <View style={styles.voteRow}>
              <TouchableOpacity
                style={[styles.tailButton, votes[post.id] === 'tail' && styles.tailActive]}
                onPress={() => handleVote(post.id, 'tail')}
              >
                <Text style={[styles.voteText, votes[post.id] === 'tail' && styles.voteTextDark]}>
                  TAIL {post.tails! + (votes[post.id] === 'tail' ? 1 : 0)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.fadeButton, votes[post.id] === 'fade' && styles.fadeActive]}
                onPress={() => handleVote(post.id, 'fade')}
              >
                <Text style={[styles.voteText, votes[post.id] === 'fade' && styles.voteTextDark]}>
                  FADE {post.fades! + (votes[post.id] === 'fade' ? 1 : 0)}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  headerAccent: {
    flex: 1,
    height: 1,
    backgroundColor: '#2A2A2A',
  },
  header: {
    color: GOLD,
    fontSize: 13,
    letterSpacing: 3,
    fontFamily: 'Oswald_600SemiBold',
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#222',
  },
  promoCard: {
    borderColor: GOLD,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  capperInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrap: {
    borderWidth: 2,
    borderColor: GOLD,
    borderRadius: 24,
    marginRight: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    resizeMode: 'cover',
  },
  capperName: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Oswald_700Bold',
    letterSpacing: 0.5,
  },
  handle: {
    color: '#555',
    fontSize: 12,
    fontFamily: 'Oswald_400Regular',
  },
  sportBadge: {
    backgroundColor: '#1E1E1E',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  sportText: {
    color: GOLD,
    fontSize: 11,
    fontFamily: 'Oswald_700Bold',
    letterSpacing: 1,
  },
  promoBadge: {
    backgroundColor: GOLD,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  promoText: {
    color: BLACK,
    fontSize: 10,
    fontFamily: 'Oswald_700Bold',
    letterSpacing: 1,
  },
  confidence: {
    fontSize: 11,
    fontFamily: 'Oswald_600SemiBold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  postContent: {
    color: '#DDD',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
    fontFamily: 'Oswald_400Regular',
  },
  time: {
    color: '#444',
    fontSize: 11,
    marginBottom: 14,
    fontFamily: 'Oswald_400Regular',
  },
  voteRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tailButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tailActive: {
    backgroundColor: GOLD,
  },
  fadeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  fadeActive: {
    backgroundColor: '#444',
  },
  voteText: {
    color: '#888',
    fontFamily: 'Oswald_700Bold',
    fontSize: 13,
    letterSpacing: 1,
  },
  voteTextDark: {
    color: BLACK,
  },
});