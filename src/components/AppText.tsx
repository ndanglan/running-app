import React from 'react';
import {
  TextProps as RNTextProps,
  StyleProp,
  Text,
  TextStyle,
} from 'react-native';

import {TxKeyPath} from 'i18n/i18n';
import {t} from 'i18next';
import {colors, typography} from 'theme';
import {moderateScale} from 'utils';

type Sizes = keyof typeof $sizeStyles;
type Weights = keyof typeof typography.primary;
type Presets = keyof typeof $presets;

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath;
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: any;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  /**
   * One of the different types of text presets.
   */
  preset?: Presets;
  /**
   * Text weight modifier.
   */
  weight?: Weights;
  /**
   * Text size modifier.
   */
  size?: Sizes;
  /**
   * Children components.
   */
  children?: React.ReactNode;
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
export function AppText(props: TextProps) {
  const {
    weight,
    size,
    tx,
    txOptions,
    text,
    children,
    style: $styleOverride,
    ...rest
  } = props;

  const i18nText = tx && (t(tx, txOptions) as string);
  const content = i18nText || text || children;

  const preset: Presets = props.preset ?? 'default';
  const $styles: StyleProp<TextStyle> = [
    $presets[preset],
    weight && $fontWeightStyles[weight],
    size && $sizeStyles[size],
    $styleOverride,
  ];

  return (
    <Text {...rest} style={$styles}>
      {content}
    </Text>
  );
}

const $sizeStyles = {
  xxl: {
    fontSize: moderateScale(36),
    lineHeight: moderateScale(44),
  },
  xl: {
    fontSize: moderateScale(24),
    lineHeight: moderateScale(34),
  },
  lg: {
    fontSize: moderateScale(20),
    lineHeight: moderateScale(32),
  },
  md: {
    fontSize: moderateScale(18),
    lineHeight: moderateScale(26),
  },
  sm: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
  },
  xs: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(21),
  },
  xxs: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
  },
};

const $fontWeightStyles = Object.entries(typography.primary).reduce(
  (acc, [weight, fontFamily]) => {
    return {...acc, [weight]: {fontFamily}};
  },
  {},
) as Record<Weights, TextStyle>;

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.normal,
  {color: colors.text},
];

const $presets = {
  default: $baseStyle,

  bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,
  heading: [
    $baseStyle,
    $sizeStyles.xxl,
    $fontWeightStyles.bold,
  ] as StyleProp<TextStyle>,

  subheading: [
    $baseStyle,
    $sizeStyles.lg,
    $fontWeightStyles.medium,
  ] as StyleProp<TextStyle>,

  formLabel: [$baseStyle, $fontWeightStyles.medium] as StyleProp<TextStyle>,
  formHelper: [
    $baseStyle,
    $sizeStyles.sm,
    $fontWeightStyles.normal,
  ] as StyleProp<TextStyle>,
};
