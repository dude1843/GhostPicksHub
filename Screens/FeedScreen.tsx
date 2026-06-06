import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image, ActivityIndicator, RefreshControl
} from 'react-native';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const GOLD = '#C9A227';
const BLACK = '#0A0A0A';
const CARD = '#141414';

const CAPPER_PHOTOS: { [key: string]: any } = {
  'Jimmy': require('../assets/jimmy.png'),
  'Benny': require('../assets/benny.jpg'),
  'Juice AI': require('../assets/juice.jpg'),
};

export default function FeedScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [votes, setVotes] = useState<{ [key: string]: 'tail' | 'fade' | null }>({});

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
      setLoading(false);
      setRefreshing(false);
    }, (error) => {
      console.log('Feed error:', error);
      setLoading(false);
      setRefreshing(false);
    });

    return () => unsub();
  }, []);

  const handleVote = (id: string, vote: 'tail' | 'fade') => {
    setVotes(prev => ({
      ...prev,
      [id]: prev[id] === vote ? null : vote,
    }));
  };

  const onRefresh = () => {
    setRefreshing(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={GOLD} />
        <Text style={styles.loadingText}>Loading Feed...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={GOLD} />
      }
    >
      <View style={styles.headerRow}>
        <View style={styles.headerAccent} />
        <Text style={styles.header}>GHOST PICKS FEED</Text>
        <View style={styles.headerAccent} />
      </View>

      {posts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No picks posted yet.</Text>
          <Text style={styles.emptySubText}>Check back soon.</Text>
        </View>
      ) : (
        posts.map(post => (
          <View key={post.id} style={[styles.card, post.type === 'promo' && styles.promoCard]}>
            <View style={styles.cardHeader}>
              <View style={styles.capperInfo}>
                <View style={styles.avatarWrap}>
                  {CAPPER_PHOTOS[post.capper] ? (
                    <Image source={CAPPER_PHOTOS[post.capper]} style={styles.avatar} />
                  ) : (
                    <View style={[styles.avatar, styles.avatarFallback]}>
                      <Text style={styles.avatarText}>{post.capper?.[0]}</Text>
                    </View>
                  )}
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

            {post.confidence && (
              <Text style={[
                styles.confidence,
                { color: post.confidence === 'HIGH' ? GOLD : '#888' }
              ]}>
                ⭐ {post.confidence} CONFIDENCE
              </Text>
            )}

            <Text style={styles.postContent}>{post.content}</Text>
            <Text style={styles.time}>
              {post.createdAt?.toDate
                ? post.createdAt.toDate().toLocaleString('en-US', {
                    month: 'short', day: 'numeric',
                    hour: 'numeric', minute: '2-digit'
                  })
                : 'Just now'}
            </Text>

            {post.type === 'pick' && (
              <View style={styles.voteRow}>
                <TouchableOpacity
                  style={[styles.tailButton, votes[post.id] === 'tail' && styles.tailActive]}
                  onPress={() => handleVote(post.id, 'tail')}
                >
                  <Text style={[styles.voteText, votes[post.id] === 'tail' && styles.voteTextDark]}>
                    TAIL {(post.tails || 0) + (votes[post.id] === 'tail' ? 1 : 0)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.fadeButton, votes[post.id] === 'fade' && styles.fadeActive]}
                  onPress={() => handleVote(post.id, 'fade')}
                >
                  <Text style={[styles.voteText, votes[post.id] === 'fade' && styles.voteTextDark]}>
                    FADE {(post.fades || 0) + (votes[post.id] === 'fade' ? 1 : 0)}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLACK },
  content: { padding: 16, paddingBottom: 40 },
  loadingContainer: { flex: 1, backgroundColor: BLACK, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: GOLD, fontSize: 14, fontFamily: 'Oswald_400Regular' },
  emptyContainer: { alignItems: 'center', marginTop: 60, gap: 8 },
  emptyText: { color: '#FFF', fontSize: 16, fontFamily: 'Oswald_700Bold' },
  emptySubText: { color: '#555', fontSize: 13, fontFamily: 'Oswald_400Regular' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20, gap: 10 },
  headerAccent: { flex: 1, height: 1, backgroundColor: '#2A2A2A' },
  header: { color: GOLD, fontSize: 13, letterSpacing: 3, fontFamily: 'Oswald_600SemiBold' },
  card: { backgroundColor: CARD, borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: '#222' },
  promoCard: { borderColor: GOLD, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  capperInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatarWrap: { borderWidth: 2, borderColor: GOLD, borderRadius: 24, marginRight: 10 },
  avatar: { width: 44, height: 44, borderRadius: 22, resizeMode: 'cover' },
  avatarFallback: { backgroundColor: GOLD, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: BLACK, fontWeight: 'bold', fontSize: 16 },
  capperName: { color: '#FFF', fontSize: 15, fontFamily: 'Oswald_700Bold', letterSpacing: 0.5 },
  handle: { color: '#555', fontSize: 12, fontFamily: 'Oswald_400Regular' },
  sportBadge: { backgroundColor: '#1E1E1E', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: '#333' },
  sportText: { color: GOLD, fontSize: 11, fontFamily: 'Oswald_700Bold', letterSpacing: 1 },
  promoBadge: { backgroundColor: GOLD, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 },
  promoText: { color: BLACK, fontSize: 10, fontFamily: 'Oswald_700Bold', letterSpacing: 1 },
  confidence: { fontSize: 11, fontFamily: 'Oswald_600SemiBold', letterSpacing: 1, marginBottom: 8 },
  postContent: { color: '#DDD', fontSize: 14, lineHeight: 22, marginBottom: 8, fontFamily: 'Oswald_400Regular' },
  time: { color: '#444', fontSize: 11, marginBottom: 14, fontFamily: 'Oswald_400Regular' },
  voteRow: { flexDirection: 'row', gap: 10 },
  tailButton: { flex: 1, borderWidth: 1, borderColor: GOLD, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  tailActive: { backgroundColor: GOLD },
  fadeButton: { flex: 1, borderWidth: 1, borderColor: '#444', borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  fadeActive: { backgroundColor: '#444' },
  voteText: { color: '#888', fontFamily: 'Oswald_700Bold', fontSize: 13, letterSpacing: 1 },
  voteTextDark: { color: BLACK },
});