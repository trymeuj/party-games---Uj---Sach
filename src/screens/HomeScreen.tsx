import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Game, GameId } from '../types';
import { theme } from '../theme';
import GameCard from '../components/GameCard';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const games: Game[] = [
  {
    id: 'kill-marry-hookup',
    name: 'Kill, Marry, Hookup',
    description:
      'Choose between celebs, your ex, your boss & more wild options',
    color: theme.colors.killMarryHookup,
    gradient: theme.gradients.killMarryHookup,
    icons: ['💀', '❤️', '🔥'],
    badge: 'Popular',
    metadata: {
      minPlayers: 2,
      quickRounds: true,
    },
  },
  {
    id: 'guess-who',
    name: 'Guess Who?',
    description:
      'One player sees a celebrity. Others ask questions to guess who it is',
    color: theme.colors.guessWho,
    gradient: theme.gradients.guessWho,
    icons: ['🧠', '✨'],
    badge: 'New',
    metadata: {
      minPlayers: 3,
      difficultyLevels: 3,
    },
  },
  {
    id: 'taboo',
    name: 'Taboo',
    description: 'Describe words without using forbidden terms',
    color: theme.colors.taboo,
    gradient: theme.gradients.taboo,
    icons: ['🚫', '💬'],
    metadata: {
      minPlayers: 4,
      quickRounds: true,
    },
  },
];

export default function HomeScreen({ navigation }: Props) {
  const handleGamePress = (gameId: GameId) => {
    if (gameId === 'kill-marry-hookup') {
      navigation.navigate('Kill-Marry-Hookup');
    } else if (gameId === 'guess-who') {
      navigation.navigate('Guess-Who');
    } else if (gameId === 'taboo') {
      navigation.navigate('Taboo');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Party Games</Text>
          <Text style={styles.subtitle}>Pick a game and start playing</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onPress={() => handleGamePress(game.id)}
            />
          ))}

          <Text style={styles.footer}>Made for playing with friends</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.sizes['4xl'],
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.mutedForeground,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingTop: 0,
  },
  footer: {
    textAlign: 'center',
    fontSize: theme.typography.sizes.base,
    color: theme.colors.mutedForeground,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
});

