import React from 'react';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';

import * as Screens from '../screens';
import {AppStackParamList, AppStackScreenProps} from './AppNavigator';
import {RouteName} from './route-name';

export type BottomTabParamList = {
  Home: undefined;
};

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;

const Tab = createBottomTabNavigator<BottomTabParamList>();

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DemoNavigator`.
 */
export function BottomNavigator() {
  const {bottom} = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // tabBarStyle: [$tabBar, {height: bottom + 70}],
        tabBarStyle: [{height: bottom + 70}],

        // tabBarActiveTintColor: colors.text,
        // tabBarInactiveTintColor: colors.text,
        // tabBarLabelStyle: $tabBarLabel,
        // tabBarItemStyle: $tabBarItem,
      }}>
      <Tab.Screen
        name={RouteName.Home}
        component={Screens.HomeScreen}
        options={{
          tabBarLabel: 'Home',
          //   tabBarIcon: ({focused}) => (
          //     <Icon
          //       icon="components"
          //       color={focused ? colors.tint : undefined}
          //       size={30}
          //     />
          //   ),
        }}
      />
    </Tab.Navigator>
  );
}

// const $tabBar: ViewStyle = {
//   backgroundColor: colors.background,
//   borderTopColor: colors.transparent,
// };

// const $tabBarItem: ViewStyle = {
//   paddingTop: spacing.md,
// };

// const $tabBarLabel: TextStyle = {
//   fontSize: 12,
//   fontFamily: typography.primary.medium,
//   lineHeight: 16,
// };
