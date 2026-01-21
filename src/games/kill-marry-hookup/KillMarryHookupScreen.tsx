import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
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

const samplePeople = [
  'Harry Styles',
  'Person on Your Left',
  'Your Uber Driver',
];

export default function KillMarryHookupScreen({ navigation }: Props) {
  const [people, setPeople] = useState<Person[]>(
    samplePeople.map((name) => ({ name, choice: null }))
  );

  const handleChoice = (index: number, choice: 'kill' | 'marry' | 'hookup') => {
    const newPeople = [...people];
    newPeople[index].choice = choice;
    setPeople(newPeople);
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

        <View style={styles.titleSection}>
          <Text style={styles.title}>Kill Marry Hookup</Text>
          <Text style={styles.subtitle}>Make your choice for each person</Text>
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
                    { backgroundColor: theme.colors.kill },
                    person.choice === 'kill' && styles.choiceButtonSelected,
                  ]}
                  onPress={() => handleChoice(index, 'kill')}
                >
                  <Text style={styles.choiceIcon}>💀</Text>
                  <Text style={styles.choiceText}>Kill</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.choiceButton,
                    { backgroundColor: theme.colors.marry },
                    person.choice === 'marry' && styles.choiceButtonSelected,
                  ]}
                  onPress={() => handleChoice(index, 'marry')}
                >
                  <Text style={styles.choiceIcon}>❤️</Text>
                  <Text style={styles.choiceText}>Marry</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.choiceButton,
                    { backgroundColor: theme.colors.hookup },
                    person.choice === 'hookup' && styles.choiceButtonSelected,
                  ]}
                  onPress={() => handleChoice(index, 'hookup')}
                >
                  <Text style={styles.choiceIcon}>🔥</Text>
                  <Text style={styles.choiceText}>Hookup</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <Text style={styles.instruction}>Tap to make your choice</Text>
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
  titleSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.sizes['3xl'],
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
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
    gap: theme.spacing.sm,
  },
  choiceButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceButtonSelected: {
    transform: [{ scale: 1.05 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
  instruction: {
    textAlign: 'center',
    fontSize: theme.typography.sizes.base,
    color: theme.colors.mutedForeground,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
});

