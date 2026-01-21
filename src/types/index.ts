export type GameId = 'kill-marry-hookup' | 'guess-who' | 'taboo';

export interface Game {
  id: GameId;
  name: string;
  description: string;
  color: string;
  gradient: string[];
  icons: string[];
  badge?: 'Popular' | 'New';
  metadata: {
    minPlayers: number;
    quickRounds?: boolean;
    difficultyLevels?: number;
  };
}

export type RootStackParamList = {
  Home: undefined;
  'Kill-Marry-Hookup': undefined;
  'Guess-Who': undefined;
  Taboo: undefined;
};

