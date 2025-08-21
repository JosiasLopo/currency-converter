# Currency Converter

## Overview

This is a mobile currency converter application built with React Native and Expo. It allows users to convert between EUR and BRL (Euro and Brazilian Real) currencies, view historical exchange rates, and use a built-in calculator for quick conversions.

Try it out: https://josiasconverter.vercel.app/

## Features

*   **Real-time Exchange Rates:** Fetches the latest EUR to BRL exchange rate from an API.
*   **Historical Data:** Displays a chart of historical exchange rates.
*   **Currency Conversion:** Converts amounts between EUR and BRL.
*   **Calculator:** Includes a calculator for easy calculations.
*   **Refreshing:** Allows users to refresh the exchange rate and historical data.
*   **Clean UI:** Provides a user-friendly and intuitive interface.

## Technologies Used

*   React Native
*   Expo
*   react-native-vector-icons
*   react-native-linear-gradient
*   react-native-safe-area-context
*   expo-router

## Installation

1.  Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2.  Navigate to the project directory:
   ```bash
   cd currency-converter
   ```

3.  Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1.  Start the Expo development server:
   ```bash
   npx expo start
   ```

2.  Scan the QR code with the Expo Go app (available on Android and iOS).

## Project Structure

```
currency-converter/
├── App.js                # Main application entry point
├── app/
│   └── (tabs)/           # Expo Router tab layout
│       ├── _layout.tsx    # Tab layout configuration
│       └── index.tsx     # Home screen
├── src/
│   ├── components/       # Reusable components
│   │   ├── Calculator.js # Calculator component
│   │   ├── CurrencyCard.js # Currency card component
│   │   ├── ExchangeChart.js # Exchange rate chart component
│   │   └── ...
│   ├── screens/          # Application screens
│   │   ├── HomeScreen.js   # Main home screen
│   │   └── ...
│   ├── services/         # API services
│   │   └── api.js        # API calls
│   └── utils/            # Utility functions
│       └── colors.js     # Color definitions
├── assets/               # Application assets
├── metro.config.js       # Metro bundler configuration
└── ...
```

## Contributing

Feel free to contribute to the project by submitting pull requests, reporting issues, or suggesting new features.

## License

[MIT](LICENSE)
