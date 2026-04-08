import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

import { FavoritesProvider, useFavorites } from './src/context/FavoritesContext';

import HomeScreen from './src/screens/HomeScreen';
import PetListScreen from './src/screens/PetListScreen';
import PetDetailScreen from './src/screens/PetDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack para a aba "Explorar"
function ExploreStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1A1A2E' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '800' },
        headerBackTitle: 'Voltar',
      }}
    >
      <Stack.Screen
        name="PetList"
        component={PetListScreen}
        options={{
          title: '🐾 Pets Disponíveis',
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="PetDetail"
        component={PetDetailScreen}
        options={({ route }) => ({
          title: route.params?.pet?.name || 'Detalhes',
          headerTransparent: true,
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'transparent' },
        })}
      />
    </Stack.Navigator>
  );
}

// Stack para a aba "Home"
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1A1A2E' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '800' },
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: '🐾 PetLovers', headerLargeTitle: false }}
      />
      <Stack.Screen
        name="PetDetail"
        component={PetDetailScreen}
        options={({ route }) => ({
          title: route.params?.pet?.name || 'Detalhes',
          headerTransparent: true,
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'transparent' },
        })}
      />
    </Stack.Navigator>
  );
}

function FavBadge() {
  const { favorites } = useFavorites();
  if (favorites.length === 0) return null;
  return (
    <View
      style={{
        position: 'absolute',
        top: -4,
        right: -8,
        backgroundColor: '#FF6B6B',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 3,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>
        {favorites.length}
      </Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A1A2E',
          borderTopColor: 'rgba(255,255,255,0.08)',
          paddingBottom: 8,
          paddingTop: 6,
          height: 64,
        },
        tabBarActiveTintColor: '#FF8C42',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Início: focused ? 'home' : 'home-outline',
            Explorar: focused ? 'paw' : 'paw-outline',
            Favoritos: focused ? 'heart' : 'heart-outline',
            Perfil: focused ? 'person' : 'person-outline',
          };
          return (
            <View>
              <Ionicons name={icons[route.name]} size={size} color={color} />
              {route.name === 'Favoritos' && <FavBadge />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeStack} />
      <Tab.Screen name="Explorar" component={ExploreStack} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} options={{ headerShown: true, headerTitle: '❤️ Meus Favoritos', headerStyle: { backgroundColor: '#1A1A2E' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: '800' } }} />
      <Tab.Screen name="Perfil" component={ProfileScreen} options={{ headerShown: true, headerTitle: '👤 Perfil & Configurações', headerStyle: { backgroundColor: '#1A1A2E' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: '800' } }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
