import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number): number => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

export {moderateScale, scale, verticalScale};
