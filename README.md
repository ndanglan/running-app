````markdown
# Project dsc_sport

## Description

## Installation

### Prerequisites:

- Node.js and yarn installed on your system. You can download them from the official website: [https://nodejs.org/en/about/previous-releases](https://nodejs.org/en/about/previous-releases)

### Steps

1. **Clone the repository:**

   ```bash
   ```
````

2. **Navigate to the project directory:**

   ```bash
   ```

3. **Install dependencies:**

   ```bash
   yarn install  # or yarn install
   nvm use node 20
   ```

## Running the Project

### Create env files

.env.development
.env.production
.env.staging
the format is :

1. **For Android:**

   ```bash
   yarn android:dev  #for run development mode
   yarn android:stag # for run stage release mode
   yarn android:prod # for run production release mode
   yarn android:prod:debug # for run production dev release mode
   ```

2. **For iOS (requires a Mac with Xcode):**

   ```bash
   yarn start:ios # select your schema by xcode or command line
   ```

The development server will provide instructions on how to access the app in your emulator or physical device.

## Author

- **Name:** Victor Nam Hac
- **Email:** nam-hn@pionero.io

## Help

- Feel free to open issues on this repository if you encounter any problems.
- You can also join the React Native community forum for general discussion and support: [https://github.com/react-native-community](https://github.com/react-native-community)

## Libraries Used

I'd be glad to create a comprehensive response that incorporates the best aspects of previous responses and addresses potential shortcomings, while adhering to the prompt's restriction on including URLs:

**Libraries Used**

| Library                          | Description                                                             | Version  |
| -------------------------------- | ----------------------------------------------------------------------- | -------- |
| `@reduxjs/toolkit`               | Simplifies Redux store setup and action creation                        | ^2.2.6   |
| `@shopify/flash-list`            | High-performance list rendering for React Native                        | ^1.6.4   |
| `axios`                          | Promises-based HTTP client for making API requests                      | ^1.7.2   |
| `dayjs`                          | Lightweight, modern alternative to Moment.js for date/time manipulation | ^1.11.11 |
| `i18next`                        | Internationalization (i18n) library for React and React Native          | ^23.11.5 |
| `react`                          | Core library for building user interfaces with React                    | 18.2.0   |
| `react-hook-form`                | Performant form validation and management with hooks                    | ^7.52.1  |
| `react-i18next`                  | Integrates i18next with React applications                              | ^14.1.2  |
| `react-native`                   | Framework for building native apps with JavaScript                      | 0.73.8   |
| `react-native-config`            | Loads environment variables from a `.env` file                          | ^1.5.2   |
| `react-native-error-boundary`    | Catches errors in React Native components and displays custom UIs       | ^1.2.4   |
| `react-native-fast-image`        | Optimized image loading for React Native                                | ^8.6.3   |
| `react-native-gesture-handler`   | Enables touch gestures for React Native components                      | ^2.17.1  |
| `react-native-mmkv`              | Secure key-value storage with MMKV for React Native                     | ^2.12.2  |
| `react-native-reanimated`        | Enables smooth animations and transitions in React Native               | 3.9.0    |
| `react-native-safe-area-context` | Provides safe area insets for React Native apps                         | ^4.10.7  |
| `react-native-screens`           | Enables advanced screen management features (Android and iOS)           | ^3.32.0  |
| `react-native-toast-message`     | Display customizable toast messages in React Native                     | ^2.2.0   |
| `react-native-unistyles`         | Utility for creating, composing, and managing React Native styles       | ^2.8.1   |
| `react-redux`                    | Binds React components to Redux state and dispatch                      | ^9.1.2   |
| `redux-persist`                  | Persists Redux state to storage (e.g., local storage)                   | ^6.0.0   |
| `zod`                            | TypeScript-first schema validation library                              | ^3.23.8  |

**Library Functions**

Here's a brief overview of some key functions provided by these libraries:

- **Redux Toolkit:** Streamlines store setup, action creation with reducers, slices, and async thunks.
- **Shopify Flash List:** Improves performance for rendering long lists of items efficiently.
- **Axios:** Makes HTTP requests to APIs with interceptors and error handling mechanisms.
- **Day.js:** Offers various date/time manipulation functions, formatting, and parsing.
- **i18next:** Enables localization of your app's UI content for multiple languages.
- **React Hook Form:** Provides easy form validation and management using React hooks.
- **React Native Config:** Loads environment variables securely from a `.env` file.
- **React Native Error Boundary:** Catches errors in child components and displays a fallback UI.
- **React Native Fast Image:** Optimizes image loading for smooth performance and reduced memory usage.
- **React Native Gesture Handler:** Enables touch gestures for interacting with UI elements.
- **React Native MMKV:** Provides a secure, efficient key-value storage solution.
- **React Native Reanimated:** Creates smooth, high-performance animations in React Native.
- **React Native Safe Area Context:** Provides safe area insets to avoid UI elements overlapping status bars and notches.
- **React Native Screens:** Enables advanced screen management features like custom transitions and background colors.
- **React Native Toast Message:** Displays customizable toast messages for notifications

## Convention Commit Messages

This project follows the Angular convention for commit messages. Here's the format:

```
<type>(<scope>): <short description>

<body>

<footer>
```

- **Type:**
  - `feat`: A new feature or functionality.
  - `fix`: A bug fix.
  - `docs`: Documentation changes.
  - `style`: Code style changes (e.g., whitespace, formatting).
  - `refactor`: Code refactoring without functional changes.
  - `perf`: A code change that improves performance.
  - `test`: Adding missing tests or refactoring existing tests.
  - `build`: Changes that affect the build process or tools.
  - `ci`: Changes to the CI configuration.
  - `revert`: Reverts a previous commit.
- **Scope:** Optional, specifies the area of the codebase affected (e.g., `auth`, `components`).
- **Short description:** A concise summary of the change in 50 or fewer characters.
- **Body:** A more detailed explanation of the change, if necessary.
- **Footer:** Optional information, like references to issues or pull requests.

## Folder Structure

```
├── android/            # (Android-specific files)
│   └── ...
├── ios/                 # (iOS-specific files)
│   └── ...
├── .husky/              # Husky precommit
│   └── ...
├── src/
   ├── App.tsx                # Main entry point of the application
   ├── assets/              # Static assets (images, fonts, etc.)
   ├── components/          # Reusable UI components
   │   ├── Button.js       # Example component
   │   └── ...
   ├── navigation/          # Navigation configuration (e.g., React Navigation)
   │   └── ...
   ├── screens/             # Individual screens or views of the app
   │   ├── HomeScreen.js   # Example screen
   │   └── ...
   ├── utils/               # Utility functions and helper code
   │   └── ...
    ├── services/           # Services configuration (e.g., api, notifications, etc)
   │   └── ...
   ├── i18n/               # I18n configuration for setting up localization
   │   └── ...
   ├── constant/           # Constants configuration
   │   └── ...
├── package.json         # Project dependencies and scripts
├── README.md           # This file (project documentation)
└── ...
```
