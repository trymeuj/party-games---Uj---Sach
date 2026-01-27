import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { theme } from '../../theme';

type KillMarryHookupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Kill-Marry-Hookup'
>;

type Props = {
  navigation: KillMarryHookupScreenNavigationProp;
};

type Choice = 'kill' | 'marry' | 'hookup' | null;

interface Person {
  name: string;
  choice: Choice;
}

const ALL_PEOPLE = [
  'Harry Styles',
  'Person on Your Left',
  'Your Uber Driver',
  'Your Ex',
  'Your Boss',
  'Your Celebrity Crush',
  'Your Best Friend',
  'Your Childhood Crush',
  'Your Neighbor',
  'The Person Who Texted You Last',
  'Your First Date',
  'Your High School Bully',
  'The Bartender',
  'Your Clone',
  'A Billionaire Octogenarian',
  'Your Favorite Teacher',
  'The Person on Your Right',
  'Kanye West',
  'Your Landlord',
  'The Person Holding Your Drink',
  'A Random Stranger',
  'Your Therapist',
  'Your Gym Trainer',
  'The President',
  'Your Doppelgänger',
  'A Pirate Captain',
  'An Alien Visitor',
  // Famous Personalities
  'Taylor Swift',
  'Dwayne "The Rock" Johnson',
  'Zendaya',
  'Leonardo DiCaprio',
  'Kim Kardashian',
  'Elon Musk',
  'Rihanna',
  'Brad Pitt',
  'Beyoncé',
  'Tom Holland',
  'Jennifer Lawrence',
  'Will Smith',
  'Margot Robbie',
  'Barack Obama',
  'Gordon Ramsay',
  'Justin Bieber',
];

const WITTY_COMMENTS = {
  kill: [
    "Ahem, keeping grudges, are we? 👀",
    "Someone's not making the guest list. 🚫",
    "Ruthless! I like it. 😈",
    "Bye bye! Won't be missed. 👋",
    "That's cold... ice cold. ❄️"
  ],
  marry: [
    "Awww, hear those wedding bells? 🔔",
    "Till death do us part! 💍",
    "Wifey/Hubby material right there! ✨",
    "Putting a ring on it! 💎",
    "Simping hard, are we? 😍"
  ],
  hookup: [
    "Spicy choice! 🌶️",
    "It's getting hot in here! 🔥",
    "Just for one night... or two? 😉",
    "Swipe right! 👉",
    "Wild thoughts only! 🤫"
  ],
};

const getWittyComment = (choice: 'kill' | 'marry' | 'hookup', name: string) => {
  const options = WITTY_COMMENTS[choice];
  // Simple deterministic hash based on name length so the comment stays consistent for the same person
  const index = name.length % options.length;
  return options[index];
};

const generateRound = (): Person[] => {
  const shuffled = [...ALL_PEOPLE].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map((name) => ({ name, choice: null }));
};

export default function KillMarryHookupScreen({ navigation }: Props) {
  const [hasStarted, setHasStarted] = useState(false);
  const [people, setPeople] = useState<Person[]>(() => generateRound());

  const handleChoice = (index: number, choice: 'kill' | 'marry' | 'hookup') => {
    setPeople((prev) => {
      const isSameChoice = prev[index].choice === choice;

      return prev.map((person, i) => {
        // Toggle off if tapping the same choice again
        if (i === index) {
          return {
            ...person,
            choice: isSameChoice ? null : choice,
          };
        }

        // If we're assigning this choice to a new person,
        // clear it from any other person who had it before
        if (!isSameChoice && person.choice === choice) {
          return {
            ...person,
            choice: null,
          };
        }

        return person;
      });
    });
  };

  const getChoiceIcon = (choice: 'kill' | 'marry' | 'hookup') => {
    switch (choice) {
      case 'kill':
        return '💀';
      case 'marry':
        return '❤️';
      case 'hookup':
        return '🔥';
    }
  };

  const isRoundComplete = people.every((person) => person.choice !== null);

  const handleNextRound = () => {
    setPeople(generateRound());
  };

  if (!hasStarted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.homeButtonHeader}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.homeButtonText}>🏠</Text>
          </TouchableOpacity>

          <View style={styles.introContent}>
            <View style={styles.introIconContainer}>
              <Text style={styles.introIcon}>😈</Text>
            </View>
            <Text style={styles.introTitle}>Choices Await</Text>
            <Text style={styles.introText}>
              Three names. Three fates.{'\n'}
              Who stays, who goes, and who is the one?
            </Text>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() => setHasStarted(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.startButtonText}>Dive In & Discover</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

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
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.gameHeader}>
            <Text style={styles.gameTitle}>Make Your Choice 🎭</Text>
            <Text style={styles.gameSubtitle}>Drag your feelings or tap to decide.</Text>
          </View>

          {people.map((person, index) => (
            <View key={index} style={styles.personCard}>
              <Text style={styles.personName}>{person.name}</Text>
              <View style={styles.choicesContainer}>
                <TouchableOpacity
                  style={[
                    styles.choiceButton,
                    styles.choiceButtonFirst,
                    { backgroundColor: theme.colors.kill },
                    person.choice === 'kill' && styles.choiceButtonSelected,
                  ]}
                  onPress={() => handleChoice(index, 'kill')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.choiceIcon} pointerEvents="none">💀</Text>
                  <Text style={styles.choiceText} pointerEvents="none">Kill</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.choiceButton,
                    { backgroundColor: theme.colors.marry },
                    person.choice === 'marry' && styles.choiceButtonSelected,
                  ]}
                  onPress={() => handleChoice(index, 'marry')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.choiceIcon} pointerEvents="none">❤️</Text>
                  <Text style={styles.choiceText} pointerEvents="none">Marry</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.choiceButton,
                    styles.choiceButtonLast,
                    { backgroundColor: theme.colors.hookup },
                    person.choice === 'hookup' && styles.choiceButtonSelected,
                  ]}
                  onPress={() => handleChoice(index, 'hookup')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.choiceIcon} pointerEvents="none">🔥</Text>
                  <Text style={styles.choiceText} pointerEvents="none">Hookup</Text>
                </TouchableOpacity>
              </View>

              {person.choice && (
                <Text style={styles.selectedChoiceText}>
                  {getWittyComment(person.choice, person.name)}
                </Text>
              )}
            </View>
          ))}

          <TouchableOpacity
            style={[
              styles.nextRoundButton,
              !isRoundComplete && styles.nextRoundButtonDisabled,
            ]}
            onPress={handleNextRound}
            disabled={!isRoundComplete}
            activeOpacity={0.7}
          >
            <Text style={styles.nextRoundButtonText}>
              {isRoundComplete ? 'Next Trio ➡️' : 'Decide their fate...'}
            </Text>
          </TouchableOpacity>
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
    paddingVertical: theme.spacing.md,
  },
  homeButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    alignSelf: 'flex-start',
  },
  homeButtonHeader: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.lg,
    zIndex: 10,
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
  homeButtonText: {
    color: theme.colors.foreground,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.medium,
  },
  introContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing['2xl'],
  },
  introIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  introIcon: {
    fontSize: 50,
  },
  introTitle: {
    fontSize: theme.typography.sizes['4xl'],
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  introText: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.mutedForeground,
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
    lineHeight: 28,
  },
  startButton: {
    backgroundColor: theme.colors.killMarryHookup,
    paddingHorizontal: theme.spacing['2xl'],
    paddingVertical: theme.spacing.lg,
    borderRadius: 1000,
    width: '100%',
    alignItems: 'center',
    shadowColor: theme.colors.killMarryHookup,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
  },
  gameHeader: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: theme.typography.sizes['2xl'],
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  gameSubtitle: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.mutedForeground,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingTop: 0,
  },
  personCard: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  personName: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.md,
  },
  choicesContainer: {
    flexDirection: 'row',
  },
  choiceButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: theme.spacing.xs,
    minHeight: 60,
    zIndex: 1,
  },
  choiceButtonFirst: {
    marginLeft: 0,
  },
  choiceButtonLast: {
    marginRight: 0,
  },
  choiceButtonSelected: {
    transform: [{ scale: 1.05 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  choiceIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  choiceText: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
  },
  selectedChoiceText: {
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.mutedForeground,
    fontWeight: theme.typography.weights.medium,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  nextRoundButton: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.killMarryHookup,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  nextRoundButtonDisabled: {
    opacity: 0.5,
  },
  nextRoundButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
  },
});

