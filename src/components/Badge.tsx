import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

type BadgeType = 'Popular' | 'New';

interface BadgeProps {
  type: BadgeType;
}

export default function Badge({ type }: BadgeProps) {
  const badgeStyle = type === 'Popular' ? styles.popular : styles.new;
  const textStyle = type === 'Popular' ? styles.popularText : styles.newText;

  return (
    <View style={[styles.badge, badgeStyle]}>
      <Text style={[styles.text, textStyle]}>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.lg,
    alignSelf: 'flex-start',
  },
  popular: {
    backgroundColor: theme.colors.popularBadge,
  },
  new: {
    backgroundColor: theme.colors.newBadge,
  },
  text: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
  },
  popularText: {
    color: theme.colors.popularBadgeText,
  },
  newText: {
    color: theme.colors.newBadgeText,
  },
});

