import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image
} from 'react-native';

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
    content: 'That Line Reeks — Celtics -4.5. Model shows Boston covering in 78% of similar matchups this season. Data does not lie on this one.',
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

  const getConfidenceColor = (confidence: string) => {
    if (confidence === 'HIGH') return '#C9A227';
    if (confidence === 'MEDIUM') return '#888';
    return '#555';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>GHOST PICKS FEED</Text>
      {SAMPLE_POSTS.map(post => (
        <View key={post.id} style={[styles.card, post.type === 'promo' && styles.promoCard]}>
          <View style={styles.cardHeader}>
            <View style={styles.capperInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{post.capper[0]}</Text>
              </View>
              <View>
                <Text style={styles.capperName}>{post.capper}</Text>
                <Text style={styles.handle}>{post.handle}</Text>
              </View>
            </View>
            <View style={styles.rightHeader}>
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
          </View>

          {post.confidence && (
            <View style={styles.confidenceRow}>
              <Text style={[styles.confidence, { color: getConfidenceColor(post.confidence) }]}>
                ● {post.confidence} CONFIDENCE
              </Text>
            </View>
          )}

          <Text style={styles.postContent}>{post.content}</Text>
          <Text style={styles.time}>{post.time}</Text>

          {post.type === 'pick' && (
            <View style={styles.voteRow}>
              <TouchableOpacity
                style={[styles.tailButton, votes[post.id] === 'tail' && styles.tailActive]}
                onPress={() => handleVote(post.id, 'tail')}
              >
                <Text style={[styles.voteText, votes[post.id] === 'tail' && styles.voteTextActive]}>
                  TAIL {post.tails + (votes[post.id] === 'tail' ? 1 : 0)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.fadeButton, votes[post.id] === 'fade' && styles.fadeActive]}
                onPress={() => handleVote(post.id, 'fade')}
              >
                <Text style={[styles.voteText, votes[post.id] === 'fade' && styles.voteTextActive]}>
                  FADE {post.fades + (votes[post.id] === 'fade' ? 1 : 0)}
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
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  promoCard: {
    borderColor: '#C9A227',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  capperInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#C9A227',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#0A0A0A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  capperName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  handle: {
    color: '#555',
    fontSize: 12,
  },
  rightHeader: {
    alignItems: 'flex-end',
  },
  sportBadge: {
    backgroundColor: '#1E1E1E',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#333',
  },
  sportText: {
    color: '#C9A227',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  promoBadge: {
    backgroundColor: '#C9A227',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
  },
  promoText: {
    color: '#0A0A0A',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  confidenceRow: {
    marginBottom: 8,
  },
  confidence: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  postContent: {
    color: '#DDDDDD',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
  },
  time: {
    color: '#444',
    fontSize: 11,
    marginBottom: 12,
  },
  voteRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tailButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#C9A227',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tailActive: {
    backgroundColor: '#C9A227',
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
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1,
  },
  voteTextActive: {
    color: '#0A0A0A',
  },
});