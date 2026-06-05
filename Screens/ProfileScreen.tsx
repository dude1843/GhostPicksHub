import {
  View, Text, StyleSheet, TouchableOpacity,
  Alert, ScrollView, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function ProfileScreen({ onLogout }: { onLogout?: () => void }) {
  const user = auth.currentUser;
  const displayName = user?.displayName || 'Ghost Picks Member';
  const email = user?.email || '';
  const createdAt = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Unknown';

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
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.bellButton}>
          <Ionicons name="notifications-outline" size={24} color="#C9A227" />
          <View style={styles.bellDot} />
        </TouchableOpacity>
      </View>

      {/* User Card */}
      <View style={styles.userCard}>
        <View style={styles.avatarRow}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={36} color="#C9A227" />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={14} color="#0A0A0A" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.memberSince}>Member Since {createdAt}</Text>
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Ionicons name="star" size={12} color="#C9A227" />
                <Text style={styles.badgeText}>Free</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={14} color="#C9A227" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Go Premium Banner */}
      <View style={styles.premiumBanner}>
        <View style={styles.premiumLeft}>
          <View style={styles.crownCircle}>
            <Ionicons name="shield" size={22} color="#C9A227" />
          </View>
          <View>
            <Text style={styles.premiumTitle}>Go Premium</Text>
            <Text style={styles.premiumSub}>Access all cappers and exclusive picks</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.premiumButton}>
          <Text style={styles.premiumButtonText}>View Packages</Text>
        </TouchableOpacity>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionLabel}>ACCOUNT</Text>
      <View style={styles.section}>
        <View style={styles.row}>
          <Ionicons name="mail-outline" size={20} color="#C9A227" style={styles.rowIcon} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>Email Address</Text>
            <Text style={styles.rowValue}>{email}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#444" />
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#C9A227" style={styles.rowIcon} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>Subscription Status</Text>
            <Text style={styles.rowValue}>Free</Text>
          </View>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeText}>Upgrade</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Ionicons name="headset-outline" size={20} color="#C9A227" style={styles.rowIcon} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>Support</Text>
            <Text style={styles.rowValue}>ghostpicksats.com/contact</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#444" />
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Ionicons name="card-outline" size={20} color="#C9A227" style={styles.rowIcon} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>Payment Methods</Text>
            <Text style={styles.rowValue}>Manage your payment methods</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#444" />
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Ionicons name="settings-outline" size={20} color="#C9A227" style={styles.rowIcon} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>Settings</Text>
            <Text style={styles.rowValue}>Notifications, app preferences</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#444" />
        </View>
      </View>

      {/* Activity Section */}
      <Text style={styles.sectionLabel}>ACTIVITY</Text>
      <View style={styles.activityRow}>
        {[
          { icon: 'receipt-outline', label: 'Purchases', count: 0 },
          { icon: 'star-outline', label: 'Favorites', count: 0 },
          { icon: 'download-outline', label: 'Downloads', count: 0 },
          { icon: 'time-outline', label: 'Viewed', count: 0 },
        ].map((item, i) => (
          <View key={i} style={styles.activityItem}>
            <Ionicons name={item.icon as any} size={22} color="#C9A227" />
            <Text style={styles.activityCount}>{item.count}</Text>
            <Text style={styles.activityLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Log Out */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#FF4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  content: { paddingBottom: 40 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  bellButton: { position: 'relative' },
  bellDot: {
    position: 'absolute', top: 0, right: 0,
    width: 8, height: 8, borderRadius: 4, backgroundColor: '#C9A227',
  },
  userCard: {
    marginHorizontal: 16, backgroundColor: '#1A1A1A',
    borderRadius: 16, padding: 16, marginBottom: 16,
  },
  avatarRow: { flexDirection: 'row', alignItems: 'center' },
  avatarWrapper: { position: 'relative', marginRight: 14 },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#2A2A2A', borderWidth: 2, borderColor: '#C9A227',
    alignItems: 'center', justifyContent: 'center',
  },
  editAvatarButton: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: '#C9A227', borderRadius: 10,
    width: 20, height: 20, alignItems: 'center', justifyContent: 'center',
  },
  userInfo: { flex: 1 },
  userName: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 2 },
  memberSince: { color: '#C9A227', fontSize: 12, marginBottom: 8 },
  badgeRow: { flexDirection: 'row' },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#2A2A2A', borderRadius: 12,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  badgeText: { color: '#C9A227', fontSize: 12, fontWeight: '600' },
  editButton: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: '#C9A227', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6,
  },
  editButtonText: { color: '#C9A227', fontSize: 12 },
  premiumBanner: {
    marginHorizontal: 16, backgroundColor: '#1A1A1A',
    borderRadius: 16, padding: 16, marginBottom: 24,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: '#C9A227',
  },
  premiumLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  crownCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center',
  },
  premiumTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  premiumSub: { color: '#888', fontSize: 11, marginTop: 2, flexShrink: 1 },
  premiumButton: {
    backgroundColor: '#C9A227', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8,
  },
  premiumButtonText: { color: '#0A0A0A', fontSize: 12, fontWeight: 'bold' },
  sectionLabel: {
    color: '#666', fontSize: 11, letterSpacing: 1.5,
    marginHorizontal: 20, marginBottom: 8, fontWeight: '600',
  },
  section: {
    marginHorizontal: 16, backgroundColor: '#1A1A1A',
    borderRadius: 16, marginBottom: 24, overflow: 'hidden',
  },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  rowIcon: { marginRight: 14 },
  rowText: { flex: 1 },
  rowLabel: { color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
  rowValue: { color: '#888', fontSize: 12, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#2A2A2A', marginHorizontal: 16 },
  upgradeButton: {
    borderWidth: 1, borderColor: '#C9A227', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  upgradeText: { color: '#C9A227', fontSize: 12, fontWeight: '600' },
  activityRow: {
    marginHorizontal: 16, backgroundColor: '#1A1A1A',
    borderRadius: 16, padding: 20, flexDirection: 'row',
    justifyContent: 'space-around', marginBottom: 24,
  },
  activityItem: { alignItems: 'center', gap: 6 },
  activityCount: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  activityLabel: { color: '#888', fontSize: 11 },
  logoutButton: {
    marginHorizontal: 16, backgroundColor: '#1A1A1A',
    borderRadius: 16, padding: 18, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center',
    gap: 10, borderWidth: 1, borderColor: '#FF4444',
  },
  logoutText: { color: '#FF4444', fontSize: 16, fontWeight: 'bold' },
});