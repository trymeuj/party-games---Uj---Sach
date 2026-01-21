import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Game } from '../types';
import { theme } from '../theme';
import Badge from './Badge';

interface GameCardProps {
  game: Game;
  onPress: () => void;
}

export default function GameCard({ game, onPress }: GameCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={game.gradient as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.header}>
          <View style={styles.iconsContainer}>
            {game.icons.map((icon, index) => (
              <Text key={index} style={styles.icon}>
                {icon}
              </Text>
            ))}
          </View>
          {game.badge && <Badge type={game.badge} />}
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{game.name}</Text>
          <Text style={styles.description}>{game.description}</Text>

          <View style={styles.metadata}>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataText}>
                👥 {game.metadata.minPlayers}+ players
              </Text>
            </View>
            {game.metadata.quickRounds && (
              <View style={styles.metadataItem}>
                <Text style={styles.metadataText}>⚡ Quick rounds</Text>
              </View>
            )}
            {game.metadata.difficultyLevels && (
              <View style={styles.metadataItem}>
                <Text style={styles.metadataText}>
                  🎯 {game.metadata.difficultyLevels} difficulty levels
                </Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    minHeight: 180,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: theme.typography.sizes['2xl'],
    fontWeight: theme.typography.weights.bold,
    color: '#FFFFFF',
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.typography.sizes.base,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.spacing.md,
    lineHeight: 22,
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataText: {
    fontSize: theme.typography.sizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: theme.typography.weights.medium,
  },
});

