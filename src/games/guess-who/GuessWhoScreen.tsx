import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { theme } from '../../theme';

type GuessWhoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Guess-Who'
>;

type Props = {
  navigation: GuessWhoScreenNavigationProp;
};

type Difficulty = 'easy' | 'medium' | 'hard';

const CELEBRITIES = [
  'Taylor Swift', 'Dwayne Johnson', 'Leonardo DiCaprio', 'Beyoncé', 'Brad Pitt',
  'Rihanna', 'Will Smith', 'Kim Kardashian', 'Johnny Depp', 'Lady Gaga',
  'Tom Cruise', 'Ariana Grande', 'Robert Downey Jr.', 'Justin Bieber', 'Jennifer Lawrence',
  'Chris Hemsworth', 'Selena Gomez', 'Kanye West', 'Scarlett Johansson', 'Drake',
  'Angelina Jolie', 'Kevin Hart', 'Oprah Winfrey', 'Elon Musk', 'Mark Zuckerberg',
  'Barack Obama', 'Donald Trump', 'Michael Jordan', 'Serena Williams', 'Lionel Messi',
  'Cristiano Ronaldo', 'Harry Styles', 'Gordon Ramsay'
];

export default function GuessWhoScreen({ navigation }: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [isRevealed, setIsRevealed] = useState(false);
  const [currentCelebrity, setCurrentCelebrity] = useState(() => {
    return CELEBRITIES[Math.floor(Math.random() * CELEBRITIES.length)];
  });

  const nextCelebrity = () => {
    let newCeleb;
    do {
      newCeleb = CELEBRITIES[Math.floor(Math.random() * CELEBRITIES.length)];
    } while (newCeleb === currentCelebrity);

    setCurrentCelebrity(newCeleb);
    setIsRevealed(false); // Hide the new one initially
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy':
        return '#10B981';
      case 'medium':
        return '#F59E0B';
      case 'hard':
        return '#EF4444';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.homeButtonText}>🏠 Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.levelButton,
              { backgroundColor: getDifficultyColor() },
            ]}
          >
            <Text style={styles.levelButtonText}>
              🎚️ {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🧠</Text>
          </View>

          <Text style={styles.title}>Guess Who?</Text>
          <Text style={styles.subtitle}>One sees, others ask questions</Text>

          <View style={styles.revealCard}>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor() },
              ]}
            >
              <Text style={styles.difficultyText}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.revealButton}
              onPress={() => setIsRevealed(!isRevealed)}
            >
              <Text style={styles.revealIcon}>{isRevealed ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>

            <Text style={styles.readyText}>
              {isRevealed ? "It's..." : "Ready to See?"}
            </Text>

            {isRevealed ? (
              <Text style={styles.celebrityName}>{currentCelebrity}</Text>
            ) : (
              <Text style={styles.instructionText}>
                Only one player should see the name{'\n'}Everyone else look away!
              </Text>
            )}

            {!isRevealed && (
              <TouchableOpacity
                style={styles.revealNameButton}
                onPress={() => setIsRevealed(true)}
              >
                <Text style={styles.revealNameIcon}>👁️</Text>
                <Text style={styles.revealNameText}>Reveal Name</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={nextCelebrity}>
            <Text style={styles.nextButtonText}>Next Person ➡️</Text>
          </TouchableOpacity>

        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  homeButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
  homeButtonText: {
    color: theme.colors.foreground,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.medium,
  },
  levelButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
  levelButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing['2xl'],
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.guessWho,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  icon: {
    fontSize: 30,
  },
  title: {
    fontSize: theme.typography.sizes['3xl'],
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.mutedForeground,
    marginBottom: theme.spacing.lg,
  },
  revealCard: {
    width: '100%',
    backgroundColor: theme.colors.guessWho,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.guessWho,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  difficultyBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
  },
  revealButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  revealIcon: {
    fontSize: 40,
  },
  readyText: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: '#FFFFFF',
    marginBottom: theme.spacing.sm,
  },
  instructionText: {
    fontSize: theme.typography.sizes.base,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  celebrityName: {
    fontSize: theme.typography.sizes['3xl'],
    fontWeight: theme.typography.weights.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  revealNameButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    minWidth: 200,
    justifyContent: 'center',
  },
  revealNameIcon: {
    fontSize: 20,
  },
  revealNameText: {
    color: theme.colors.guessWho,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
  },
  nextButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.muted,
  },
  nextButtonText: {
    color: theme.colors.foreground,
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
  },
});

