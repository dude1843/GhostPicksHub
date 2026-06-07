import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Oswald_400Regular, Oswald_700Bold, Oswald_600SemiBold } from '@expo-google-fonts/oswald';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Purchases from 'react-native-purchases';
import FeedScreen from './Screens/FeedScreen';
import CapperScreen from './Screens/CapperScreen';
import VIPScreen from './Screens/VIPScreen';
import StatsScreen from './Screens/StatsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import SettingsScreen from './Screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const GOLD = '#C9A227';
const BLACK = '#0A0A0A';

const TABS = [
  { name: 'Feed', icon: 'home' },
  { name: 'Cappers', icon: 'people' },
  { name: 'VIP', icon: 'ribbon' },
  { name: 'Stats', icon: 'stats-chart' },
  { name: 'Profile', icon: 'person' },
];

function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom || 8 }]}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const tab = TABS[index];
        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.8}
          >
            {isFocused && <View style={styles.activeTopLine} />}
            <Ionicons
              name={tab.icon as any}
              size={22}
              color={isFocused ? GOLD : '#555'}
            />
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function MainTabs({ onLogout }: { onLogout: () => void }) {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: BLACK },
        headerTintColor: GOLD,
        headerTitleStyle: {
          fontFamily: 'Oswald_700Bold',
          fontSize: 18,
          letterSpacing: 1,
        },
      }}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Cappers" component={CapperScreen} />
      <Tab.Screen name="VIP" component={VIPScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });

  useEffect(() => {
    checkLoginStatus();
    Purchases.configure({ apiKey: 'test_aHFTqrtPpcjtpqKWywyOoQROAFo' });
  }, []);

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      if (value === 'true') setIsLoggedIn(true);
    } catch (e) {
      console.log('AsyncStorage error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  if (loading || !fontsLoaded) return <View style={{ flex: 1, backgroundColor: BLACK }} />;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <>
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
              </Stack.Screen>
              <Stack.Screen name="Signup">
                {(props) => <SignupScreen {...props} onSignup={handleLogin} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Main">
                {(props) => <MainTabs {...props} onLogout={handleLogout} />}
              </Stack.Screen>
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#111111',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: 0,
    paddingHorizontal: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingTop: 10,
    gap: 3,
    position: 'relative',
  },
  activeTopLine: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 2,
    backgroundColor: GOLD,
    borderRadius: 2,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  tabLabel: {
    color: '#555',
    fontSize: 10,
    fontFamily: 'Oswald_400Regular',
    letterSpacing: 0.5,
  },
  tabLabelActive: {
    color: GOLD,
    fontFamily: 'Oswald_700Bold',
  },
});