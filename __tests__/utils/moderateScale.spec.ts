import {Dimensions} from 'react-native';

import {describe, expect, it} from '@jest/globals';
import {scale} from 'utils';

const guidelineBaseWidth = 350;

describe('scale', () => {
  it('should scale the value based on the provided factor', () => {
    // Test case 1: Scaling up
    const size = 10;
    const {width} = Dimensions.get('window');
    const endUpPredict = (width / guidelineBaseWidth) * size;
    expect(scale(10)).toBe(endUpPredict);
  });
});
