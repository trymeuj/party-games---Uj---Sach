import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';
import { theme } from './src/theme';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import KillMarryHookupScreen from './src/games/kill-marry-hookup/KillMarryHookupScreen';
import GuessWhoScreen from './src/games/guess-who/GuessWhoScreen';
import TabooScreen from './src/games/taboo/TabooScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Kill-Marry-Hookup" component={KillMarryHookupScreen} />
        <Stack.Screen name="Guess-Who" component={GuessWhoScreen} />
        <Stack.Screen name="Taboo" component={TabooScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
