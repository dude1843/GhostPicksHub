import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FeedScreen from './Screens/FeedScreen';
import CapperScreen from './Screens/CapperScreen';
import VIPScreen from './Screens/VIPScreen';
import TrailFadeScreen from './Screens/TrailFadeScreen';
import ProfileScreen from './Screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string;
            if (route.name === 'Feed') iconName = 'home';
            else if (route.name === 'Cappers') iconName = 'people';
           else if (route.name === 'VIP') iconName = 'ribbon';
            else if (route.name === 'Trail/Fade') iconName = 'stats-chart';
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
          headerStyle: {
            backgroundColor: '#0A0A0A',
          },
          headerTintColor: '#C9A227',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Cappers" component={CapperScreen} />
        <Tab.Screen name="VIP" component={VIPScreen} />
        <Tab.Screen name="Trail/Fade" component={TrailFadeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}