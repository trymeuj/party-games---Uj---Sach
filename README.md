# 🎮 Party Games

A fun, vibrant mobile app for playing party games with friends! Built with React Native and Expo.

## 🎯 Features

- **Kill, Marry, Hookup**: Make wild choices between celebs, your ex, your boss, and more
- **Guess Who?**: One player sees a celebrity, others ask questions to guess
- **Taboo**: Describe words without using forbidden terms (Coming Soon)

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Quick development and testing
- **TypeScript** - Type-safe code
- **React Navigation** - Smooth navigation between screens
- **React Native Linear Gradient** - Beautiful gradient effects

## 📁 Project Structure

```
party-games/
├── src/
│   ├── screens/          # Main screens
│   │   └── HomeScreen.tsx
│   ├── games/            # Game-specific screens
│   │   ├── taboo/
│   │   ├── kill-marry-hookup/
│   │   └── guess-who/
│   ├── components/       # Reusable components
│   │   ├── GameCard.tsx
│   │   └── Badge.tsx
│   ├── theme/           # Design system
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   └── types/           # TypeScript definitions
│       └── index.ts
├── App.tsx              # Root component with navigation
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

1. Navigate to the project directory:
```bash
cd party-games
```

2. Install dependencies (already done):
```bash
npm install
```

### Running the App

1. Start the Expo development server:
```bash
npm start
```

2. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

3. The app will load on your phone!

### Other Commands

```bash
npm run android    # Open on Android emulator
npm run ios        # Open on iOS simulator (macOS only)
npm run web        # Open in web browser
```

## 🎨 Design System

The app uses a modern, vibrant design with:
- **Dark theme** with oklch colors
- **Custom fonts**: Fredoka (headings) and Space Grotesk (body)
- **Gradient cards** for each game
- **Rounded corners** and smooth animations
- **Color-coded actions** (Kill: Red, Marry: Pink, Hookup: Orange)

## 🎮 Games

### Kill, Marry, Hookup 💀❤️🔥
Make choices for different people or celebrities. Tap on Kill, Marry, or Hookup for each person.

### Guess Who? 🧠✨
One player sees a celebrity name, others ask yes/no questions to guess who it is. Features three difficulty levels.

### Taboo 🚫💬
Coming soon! Describe words without using forbidden terms.

## 📱 Offline First

This app works completely offline - no internet connection required! Perfect for playing anywhere with friends.

## 🔄 Future Enhancements

- [ ] Add more games (Truth or Dare, Never Have I Ever, etc.)
- [ ] Custom celebrity/person lists
- [ ] Score tracking and statistics
- [ ] Sound effects and animations
- [ ] Share results with friends
- [ ] Multiplayer mode with Bluetooth

## 📝 Notes

- Designed for groups of 2-5+ people
- Target audience: Young adults (20s)
- Focus on fun, social interaction, and laughter!

## 🤝 Contributing

Feel free to add new games, improve the UI, or suggest features!

---

Made with ❤️ for playing with friends

