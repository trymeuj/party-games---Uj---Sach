import React from 'react';
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

type TabooScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Taboo'
>;

type Props = {
  navigation: TabooScreenNavigationProp;
};

const TABOO_CARDS = [
  { word: 'Coffee', forbidden: ['Drink', 'Caffeine', 'Starbucks', 'Beans', 'Morning'] },
  { word: 'Beach', forbidden: ['Sand', 'Ocean', 'Sun', 'Summer', 'Waves'] },
  { word: 'Superman', forbidden: ['Adventures', 'Hero', 'Fly', 'Kryptonite', 'Clark Kent'] },
  { word: 'iPhone', forbidden: ['Apple', 'Phone', 'Call', 'Siri', 'Steve Jobs'] },
  { word: 'Pizza', forbidden: ['Cheese', 'Pepperoni', 'Italy', 'Dough', 'Slice'] },
  { word: 'Guitar', forbidden: ['Strings', 'Music', 'Instrument', 'Play', 'Rock'] },
  { word: 'Vampire', forbidden: ['Blood', 'Dracula', 'Teeth', 'Bat', 'Twilight'] },
  { word: 'Instagram', forbidden: ['Photo', 'App', 'Like', 'Filter', 'Story'] },
  { word: 'Snowman', forbidden: ['Winter', 'Cold', 'Carrot', 'Frosty', 'White'] },
  { word: 'Library', forbidden: ['Books', 'Read', 'Quiet', 'Study', 'School'] },
];

export default function TabooScreen({ navigation }: Props) {
  const [currentCard, setCurrentCard] = React.useState(() => {
    return TABOO_CARDS[Math.floor(Math.random() * TABOO_CARDS.length)];
  });

  const nextCard = () => {
    let newCard;
    do {
      newCard = TABOO_CARDS[Math.floor(Math.random() * TABOO_CARDS.length)];
    } while (newCard === currentCard && TABOO_CARDS.length > 1);
    setCurrentCard(newCard);
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

        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.topicText}>GUESS THIS:</Text>
              <Text style={styles.targetWord}>{currentCard.word}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.forbiddenContainer}>
              <Text style={styles.forbiddenLabel}>DON'T SAY:</Text>
              {currentCard.forbidden.map((word, index) => (
                <Text key={index} style={styles.forbiddenWord}>
                  {word}
                </Text>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={nextCard}>
            <Text style={styles.nextButtonText}>Next Card ➡️</Text>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius['2xl'],
    padding: theme.spacing['2xl'],
    alignItems: 'center',
    // Shadow for dark theme might need adjustment or be subtle
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: theme.spacing['2xl'],
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  topicText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.mutedForeground,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 2,
    marginBottom: theme.spacing.xs,
  },
  targetWord: {
    fontSize: theme.typography.sizes['4xl'],
    fontWeight: theme.typography.weights.bold, // changed from black
    color: theme.colors.taboo,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: theme.colors.taboo,
    opacity: 0.2,
    marginVertical: theme.spacing.lg,
  },
  forbiddenContainer: {
    width: '100%',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  forbiddenLabel: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.kill,
    fontWeight: theme.typography.weights.bold,
    marginBottom: theme.spacing.xs,
    letterSpacing: 1,
  },
  forbiddenWord: {
    fontSize: theme.typography.sizes.xl,
    color: theme.colors.foreground, // Changed from dark grey to foreground
    fontWeight: theme.typography.weights.medium,
  },
  nextButton: {
    backgroundColor: theme.colors.taboo,
    paddingHorizontal: theme.spacing['2xl'],
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    width: '100%',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
  },
});

