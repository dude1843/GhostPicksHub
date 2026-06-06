import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Oswald_400Regular, Oswald_700Bold, Oswald_600SemiBold } from '@expo-google-fonts/oswald';
import FeedScreen from './Screens/FeedScreen';
import CapperScreen from './Screens/CapperScreen';
import VIPScreen from './Screens/VIPScreen';
import StatsScreen from './Screens/StatsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs({ onLogout }: { onLogout: () => void }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          if (route.name === 'Feed') iconName = 'home';
          else if (route.name === 'Cappers') iconName = 'people';
          else if (route.name === 'VIP') iconName = 'ribbon';
          else if (route.name === 'Stats') iconName = 'stats-chart';
          else iconName = 'person';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#C9A227',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopColor: '#C9A227',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: 'Oswald_400Regular',
          fontSize: 11,
          letterSpacing: 0.5,
        },
        headerStyle: {
          backgroundColor: '#0A0A0A',
        },
        headerTintColor: '#C9A227',
        headerTitleStyle: {
          fontFamily: 'Oswald_700Bold',
          fontSize: 18,
          letterSpacing: 1,
        },
      })}
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

  if (loading || !fontsLoaded) return <View style={{ flex: 1, backgroundColor: '#0A0A0A' }} />;

  return (
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
          <Stack.Screen name="Main">
            {(props) => <MainTabs {...props} onLogout={handleLogout} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}