/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {StyleSheet} from 'react-native';

import ErrorBoundary from 'react-native-error-boundary';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';

import {initI18n} from 'i18n/i18n';
import {AppNavigator} from 'navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'redux_';
import {HomeScreen} from 'screens';

initI18n();

function App(): JSX.Element {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary FallbackComponent={HomeScreen}>
        <GestureHandlerRootView style={styles.container}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <AppNavigator />
              <Toast />
            </PersistGate>
          </Provider>
        </GestureHandlerRootView>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
