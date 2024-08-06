import React, {ReactElement} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import {IconTypes} from 'assets';
import {AppText, TextProps} from 'components/AppText';
import {ExtendedEdge, useSafeAreaInsetsStyle} from 'hooks';
import {t} from 'i18next';
import {colors, spacing} from 'theme';

import {AppIcon} from './AppIcon';

export interface HeaderProps {
  /**
   * The layout of the title relative to the action components.
   * - `center` will force the title to always be centered relative to the header. If the title or the action buttons are too long, the title will be cut off.
   * - `flex` will attempt to center the title relative to the action buttons. If the action buttons are different widths, the title will be off-center relative to the header.
   */
  titleMode?: 'center' | 'flex';
  /**
   * Optional title style override.
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Optional outer title container style override.
   */
  titleContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional inner header wrapper style override.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Optional outer header container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Title text to display if not using `tx` or nested components.
   */
  title?: TextProps['text'];
  /**
   * Title text which is looked up via i18n.
   */
  titleTx?: TextProps['tx'];
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  titleTxOptions?: TextProps['txOptions'];
  /**
   * Icon that should appear on the left.
   * Can be used with `onLeftPress`.
   */
  leftIcon?: IconTypes;
  /**
   * An optional tint color for the left icon
   */
  leftIconColor?: string;
  /**
   * Left action text to display if not using `leftTx`.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftText?: TextProps['text'];
  /**
   * Left action text text which is looked up via i18n.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftTx?: TextProps['tx'];
  /**
   * Left action custom ReactElement if the built in action props don't suffice.
   * Overrides `leftIcon`, `leftTx` and `leftText`.
   */
  LeftActionComponent?: ReactElement;
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  leftTxOptions?: TextProps['txOptions'];
  /**
   * What happens when you press the left icon or text action.
   */
  onLeftPress?: TouchableOpacityProps['onPress'];
  /**
   * Icon that should appear on the right.
   * Can be used with `onRightPress`.
   */
  rightIcon?: IconTypes;
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string;
  /**
   * Right action text to display if not using `rightTx`.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightText?: TextProps['text'];
  /**
   * Right action text text which is looked up via i18n.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightTx?: TextProps['tx'];
  /**
   * Right action custom ReactElement if the built in action props don't suffice.
   * Overrides `rightIcon`, `rightTx` and `rightText`.
   */
  RightActionComponent?: ReactElement;
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  rightTxOptions?: TextProps['txOptions'];
  /**
   * What happens when you press the right icon or text action.
   */
  onRightPress?: TouchableOpacityProps['onPress'];
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[];
}

interface HeaderActionProps {
  backgroundColor?: string;
  icon?: IconTypes;
  iconColor?: string;
  text?: TextProps['text'];
  tx?: TextProps['tx'];
  txOptions?: TextProps['txOptions'];
  onPress?: TouchableOpacityProps['onPress'];
  ActionComponent?: ReactElement;
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 * The Header is meant to be used with the `screenOptions.header` option on navigators, routes, or screen components via `navigation.setOptions({ header })`.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/Header/}
 * @param {HeaderProps} props - The props for the `Header` component.
 * @returns {JSX.Element} The rendered `Header` component.
 */
export function AppHeader(props: HeaderProps) {
  const {
    backgroundColor = colors.background,
    LeftActionComponent,
    leftIcon,
    leftIconColor,
    leftText,
    leftTx,
    leftTxOptions,
    onLeftPress,
    onRightPress,
    RightActionComponent,
    rightIcon,
    rightIconColor,
    rightText,
    rightTx,
    rightTxOptions,
    safeAreaEdges = ['top'],
    title,
    titleMode = 'center',
    titleTx,
    titleTxOptions,
    titleContainerStyle: titleContainerStyleOverride,
    style: styleOverride,
    titleStyle: titleStyleOverride,
    containerStyle: containerStyleOverride,
  } = props;

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  const titleContent = titleTx ? (t(titleTx, titleTxOptions) as string) : title;

  return (
    <View
      style={[
        styles.container,
        $containerInsets,
        {backgroundColor},
        containerStyleOverride,
      ]}>
      <View style={[styles.wrapper, styleOverride]}>
        <HeaderAction
          tx={leftTx}
          text={leftText}
          icon={leftIcon}
          iconColor={leftIconColor}
          onPress={onLeftPress}
          txOptions={leftTxOptions}
          backgroundColor={backgroundColor}
          ActionComponent={LeftActionComponent}
        />
        {!!titleContent && (
          <View
            style={[
              titleMode === 'center' && styles.wrapper,
              titleMode === 'flex' && styles.titleWrapperFlex,
              titleContainerStyleOverride,
            ]}
            pointerEvents="none">
            <AppText
              weight="medium"
              size="md"
              text={titleContent}
              style={[styles.title, titleStyleOverride]}
            />
          </View>
        )}
        <HeaderAction
          tx={rightTx}
          text={rightText}
          icon={rightIcon}
          iconColor={rightIconColor}
          onPress={onRightPress}
          txOptions={rightTxOptions}
          backgroundColor={backgroundColor}
          ActionComponent={RightActionComponent}
        />
      </View>
    </View>
  );
}

/**
 * @param {HeaderActionProps} props - The props for the `HeaderAction` component.
 * @returns {JSX.Element} The rendered `HeaderAction` component.
 */
function HeaderAction(props: HeaderActionProps) {
  const {
    backgroundColor,
    icon,
    text,
    tx,
    txOptions,
    onPress,
    ActionComponent,
    iconColor,
  } = props;

  const content = tx ? (t(tx, txOptions) as string) : text;

  if (ActionComponent) {
    return ActionComponent;
  }

  if (content) {
    return (
      <TouchableOpacity
        style={[styles.actionTextContainer, {backgroundColor}]}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}>
        <AppText
          weight="medium"
          size="md"
          text={content}
          style={styles.actionText}
        />
      </TouchableOpacity>
    );
  }

  if (icon) {
    return (
      <AppIcon
        size={24}
        icon={icon}
        color={iconColor}
        onPress={onPress}
        containerStyle={[styles.actionTextContainer, {backgroundColor}]}
      />
    );
  }

  return <View style={[styles.actionFillerContainer, {backgroundColor}]} />;
}

const styles = StyleSheet.create({
  wrapper: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  container: {
    width: '100%',
  },

  title: {
    textAlign: 'center',
  },

  actionTextContainer: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: spacing.md,
    zIndex: 2,
  },

  actionText: {
    color: colors.tint,
  },

  actionIconContainer: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: spacing.md,
    zIndex: 2,
  },

  actionFillerContainer: {
    width: 16,
  },

  titleWrapperCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    paddingHorizontal: spacing.xxl,
    zIndex: 1,
  },

  titleWrapperFlex: {
    justifyContent: 'center',
    flexGrow: 1,
  },
});
