import {moderateScale} from 'utils';

export const spacing = {
  xxxs: moderateScale(2),
  xxs: moderateScale(4),
  xs: moderateScale(8),
  sm: moderateScale(12),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(48),
  xxxl: moderateScale(64),
} as const;

export type Spacing = keyof typeof spacing;
