import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Alert, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const GOLD = '#C9A227';
const BLACK = '#0A0A0A';
const CARD = '#1A1A1A';

export default function ProfileScreen({ onLogout, navigation }: { onLogout?: () => void, navigation?: any }) {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const email = user?.email || '';
  const createdAt = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Unknown';

  useEffect(() => {
    const fetchName = async () => {
      if (user && !user.displayName) {
        try {
          const snap = await getDoc(doc(db, 'users', user.uid));
          if (snap.exists()) setDisplayName(snap.data().name || 'Ghost Picks Member');
        } catch {
          setDisplayName('Ghost Picks Member');
        }
      } else if (user?.displayName) {
        setDisplayName(user.displayName);
      }
    };
    fetchName();
  }, []);

  const handleLogout = async () => {
    Alert.alert('Log Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out', style: 'destructive',
        onPress: async () => {
          try {
            await signOut(auth);
            await AsyncStorage.removeItem('isLoggedIn');
            if (onLogout) onLogout();
          } catch {
            Alert.alert('Error', 'Could not log out. Try again.');
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PROFILE</Text>
        <TouchableOpacity
          style={styles.bellButton}
          onPress={() => Alert.alert('Notifications', 'No new notifications.')}
        >
          <Ionicons name="notifications-outline" size={24} color={GOLD} />
          <View style={styles.bellDot} />
        </TouchableOpacity>
      </View>

      {/* User Card */}
      <View style={styles.userCard}>
        <View style={styles.avatarRow}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={36} color={GOLD} />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={12} color={BLACK} />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{displayName || 'Ghost Picks Member'}</Text>
            <Text style={styles.memberSince}>Member Since {createdAt}</Text>
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Ionicons name="star" size={11} color={GOLD} />
                <Text style={styles.badgeText}>Free</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={13} color={GOLD} />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Go Premium Banner */}
      <View style={styles.premiumBanner}>
        <View style={styles.premiumLeft}>
          <View style={styles.crownCircle}>
            <Ionicons name="shield" size={22} color={GOLD} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.premiumTitle}>Go Premium</Text>
            <Text style={styles.premiumSub}>Access all cappers and exclusive picks</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.premiumButton}
          onPress={() => navigation?.getParent()?.navigate('Cappers')}
        >
          <Text style={styles.premiumButtonText}>View Packages</Text>
        </TouchableOpacity>
      </View>

      {/* Account Section */}
      <View style={styles.sectionRow}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionLabel}>ACCOUNT</Text>
      </View>
      <View style={styles.section}>
        {[
          { icon: 'mail-outline', label: 'Email Address', value: email },
          { icon: 'shield-checkmark-outline', label: 'Subscription Status', value: 'Free', upgrade: true },
          { icon: 'headset-outline', label: 'Support', value: 'ghostpicksats.com/contact' },
          { icon: 'card-outline', label: 'Payment Methods', value: 'Manage your payment methods' },
          { icon: 'settings-outline', label: 'Settings', value: 'Notifications, disclaimers, preferences' },
        ].map((item, i, arr) => (
          <View key={item.label}>
            <View style={styles.row}>
              <Ionicons name={item.icon as any} size={20} color={GOLD} style={styles.rowIcon} />
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowValue}>{item.value}</Text>
              </View>
              {item.upgrade ? (
                <TouchableOpacity
                  style={styles.upgradeButton}
                  onPress={() => navigation?.getParent()?.navigate('Cappers')}
                >
                  <Text style={styles.upgradeText}>Upgrade</Text>
                </TouchableOpacity>
              ) : (
                <Ionicons name="chevron-forward" size={18} color="#444" />
              )}
            </View>
            {i < arr.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>

      {/* Activity Section */}
      <View style={styles.sectionRow}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionLabel}>ACTIVITY</Text>
      </View>
      <View style={styles.activityRow}>
        {[
          { icon: 'receipt-outline', label: 'Purchases', count: '0' },
          { icon: 'trending-up-outline', label: 'Picks Tailed', count: '0' },
          { icon: 'people-outline', label: 'Cappers', count: '0' },
          { icon: 'trophy-outline', label: 'Win Rate', count: '--' },
        ].map((item, i) => (
          <View key={i} style={styles.activityItem}>
            <Ionicons name={item.icon as any} size={22} color={GOLD} />
            <Text style={styles.activityCount}>{item.count}</Text>
            <Text style={styles.activityLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Log Out */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#FF4444" />
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLACK },
  content: { paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontFamily: 'Oswald_700Bold',
    letterSpacing: 1,
  },
  bellButton: { position: 'relative' },
  bellDot: {
    position: 'absolute', top: 0, right: 0,
    width: 8, height: 8, borderRadius: 4, backgroundColor: GOLD,
  },
  userCard: {
    marginHorizontal: 16,
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  avatarRow: { flexDirection: 'row', alignItems: 'center' },
  avatarWrapper: { position: 'relative', marginRight: 14 },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#2A2A2A', borderWidth: 2, borderColor: GOLD,
    alignItems: 'center', justifyContent: 'center',
  },
  editAvatarButton: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: GOLD, borderRadius: 10,
    width: 20, height: 20, alignItems: 'center', justifyContent: 'center',
  },
  userInfo: { flex: 1 },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Oswald_700Bold',
    marginBottom: 2,
  },
  memberSince: {
    color: GOLD,
    fontSize: 12,
    fontFamily: 'Oswald_400Regular',
    marginBottom: 8,
  },
  badgeRow: { flexDirection: 'row' },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#2A2A2A', borderRadius: 12,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  badgeText: {
    color: GOLD,
    fontSize: 12,
    fontFamily: 'Oswald_600SemiBold',
  },
  editButton: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: GOLD, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6,
  },
  editButtonText: {
    color: GOLD,
    fontSize: 12,
    fontFamily: 'Oswald_400Regular',
  },
  premiumBanner: {
    marginHorizontal: 16,
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: GOLD,
  },
  premiumLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  crownCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center',
  },
  premiumTitle: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Oswald_700Bold',
  },
  premiumSub: {
    color: '#888',
    fontSize: 11,
    fontFamily: 'Oswald_400Regular',
    marginTop: 2,
  },
  premiumButton: {
    backgroundColor: GOLD,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  premiumButtonText: {
    color: BLACK,
    fontSize: 12,
    fontFamily: 'Oswald_700Bold',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
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
  section: {
    marginHorizontal: 16,
    backgroundColor: CARD,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowIcon: { marginRight: 14 },
  rowText: { flex: 1 },
  rowLabel: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Oswald_400Regular',
  },
  rowValue: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'Oswald_400Regular',
    marginTop: 2,
  },
  divider: { height: 1, backgroundColor: '#2A2A2A', marginHorizontal: 16 },
  upgradeButton: {
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  upgradeText: {
    color: GOLD,
    fontSize: 12,
    fontFamily: 'Oswald_600SemiBold',
  },
  activityRow: {
    marginHorizontal: 16,
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  activityItem: { alignItems: 'center', gap: 6 },
  activityCount: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Oswald_700Bold',
  },
  activityLabel: {
    color: '#888',
    fontSize: 11,
    fontFamily: 'Oswald_400Regular',
  },
  logoutButton: {
    marginHorizontal: 16,
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  logoutText: {
    color: '#FF4444',
    fontSize: 16,
    fontFamily: 'Oswald_700Bold',
    letterSpacing: 1,
  },
});