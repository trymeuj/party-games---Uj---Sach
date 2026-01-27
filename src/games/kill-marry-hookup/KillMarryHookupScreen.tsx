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
];

const generateRound = (): Person[] => {
  const shuffled = [...ALL_PEOPLE].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map((name) => ({ name, choice: null }));
};

export default function KillMarryHookupScreen({ navigation }: Props) {
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

  const getChoiceColor = (choice: 'kill' | 'marry' | 'hookup') => {
    switch (choice) {
      case 'kill':
        return theme.colors.kill;
      case 'marry':
        return theme.colors.marry;
      case 'hookup':
        return theme.colors.hookup;
    }
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
                  disabled={false}
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
                  disabled={false}
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
                  disabled={false}
                >
                  <Text style={styles.choiceIcon} pointerEvents="none">🔥</Text>
                  <Text style={styles.choiceText} pointerEvents="none">Hookup</Text>
                </TouchableOpacity>
              </View>

              {person.choice && (
                <Text style={styles.selectedChoiceText}>
                  You chose: {getChoiceIcon(person.choice)} {person.choice.toUpperCase()}
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
              {isRoundComplete ? 'Next Round ➡️' : 'Make choices for all first'}
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
  homeButtonText: {
    color: theme.colors.foreground,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.medium,
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
    color: theme.colors.foreground,
    fontWeight: theme.typography.weights.medium,
    textAlign: 'center',
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

