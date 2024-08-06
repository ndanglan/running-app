import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import RNLocation, {Location} from 'react-native-location';

import {AppImage} from 'components';
import {AppContainer} from 'components/AppContainer';
import dayjs from 'dayjs';
import {moderateScale} from 'utils';

export const HomeScreen = () => {
  const locationSubscription = useRef<any>();
  const [location, setLocation] = useState<Location | null>();
  const [times, setTimes] = useState<number>(0);
  const _startUpdatingLocation = () => {
    locationSubscription.current = RNLocation.subscribeToLocationUpdates(
      locations => {
        setTimes(prev => prev + 1);
        setLocation(locations[0]);
      },
    );
  };

  const _stopUpdatingLocation = () => {
    locationSubscription.current && locationSubscription.current?.();
    setLocation(null);
  };

  useEffect(() => {
    RNLocation.configure({
      distanceFilter: 100, // Meters
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      interval: 5000, // Milliseconds
      fastestInterval: 10000, // Milliseconds
      maxWaitTime: 5000, // Milliseconds
      // iOS Only
      activityType: 'other',
      allowsBackgroundLocationUpdates: false,
      headingFilter: 1, // Degrees
      headingOrientation: 'portrait',
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: false,
    });

    RNLocation.requestPermission({
      ios: 'always',
      android: {
        detail: 'fine',
        rationale: {
          title: 'Location permission',
          message: 'We use your location to demo the library',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    }).then(granted => {
      if (granted) {
        _startUpdatingLocation();
      }
    });
    return () => {
      _stopUpdatingLocation();
    };
  }, []);

  return (
    <AppContainer
      preset="fixed"
      headerShown={true}
      backgroundColor="#fff"
      headerProps={{
        backgroundColor: '#fff',
        style: {
          marginHorizontal: moderateScale(16),
          backgroundColor: '#fff',
        },
        LeftActionComponent: (
          <TouchableWithoutFeedback
            style={{
              paddingLeft: moderateScale(16),
            }}>
            <Text
              style={{
                fontSize: moderateScale(14),
                color: '#315735',
              }}>
              Quay lại
            </Text>
          </TouchableWithoutFeedback>
        ),
      }}>
      <View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: moderateScale(48),
            display: 'flex',
            flexDirection: 'column',
          },
        ]}>
        {/* <Text style={styles.largeDetail}>{times}</Text> */}
        <AppImage
          source={require('assets/img/fake-avatar.png')}
          style={{width: moderateScale(80), height: moderateScale(80)}}
        />
        <Text
          style={[
            {
              marginTop: moderateScale(8),
              fontSize: moderateScale(14),
              color: '#708572',
            },
          ]}>
          Nguyễn Đăng Lân
        </Text>
        <Text
          style={{
            marginTop: moderateScale(8),
            fontSize: moderateScale(14),
            color: '#708572',
          }}>
          Số lần đã cập nhật vị trí: {times}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: moderateScale(24),
        }}>
        <Text
          style={{
            fontSize: moderateScale(40),
            lineHeight: moderateScale(60),
            fontWeight: 'bold',
            color: '#315735',
          }}>
          {dayjs().format('HH:mm:ss')}
        </Text>
      </View>
      {location && (
        <>
          <View style={styles.row}>
            <View style={[styles.detailBox, styles.third]}>
              <Text style={[styles.detail, styles.largeDetail]}>
                {location.speed}
              </Text>
              <Text style={styles.valueTitle}>Tốc độ</Text>
            </View>
            <View style={[styles.detailBox, styles.third]}>
              <Text style={styles.detail}>{location.latitude}</Text>
              <Text style={styles.valueTitle}>Kinh độ</Text>
            </View>
            <View style={[styles.detailBox, styles.third]}>
              <Text style={styles.detail}>{location.longitude}</Text>
              <Text style={styles.valueTitle}>Vĩ độ</Text>
            </View>
          </View>
        </>
      )}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <TouchableHighlight
          onPress={_startUpdatingLocation}
          style={[styles.button, {backgroundColor: '#10BD24'}]}>
          <Text style={styles.buttonText}>Bắt đầu</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={_stopUpdatingLocation}
          style={[styles.button, {backgroundColor: '#F05D80'}]}>
          <Text style={styles.buttonText}>Kết thúc</Text>
        </TouchableHighlight>
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCCC',
  },
  innerContainer: {
    marginVertical: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  repoLink: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0000CC',
    textDecorationLine: 'underline',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: moderateScale(5),
    marginBottom: moderateScale(5),
  },
  detailBox: {
    padding: moderateScale(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(15),
    borderRadius: moderateScale(120),
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(12),
  },
  buttonText: {
    fontSize: moderateScale(14),
    color: '#FFFFFF',
  },
  valueTitle: {
    fontFamily: 'Futura',
    fontSize: moderateScale(14),
    color: '#708572',
  },
  detail: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    lineHeight: moderateScale(26),
    color: '#315735',
  },
  largeDetail: {
    fontSize: moderateScale(20),
  },
  json: {
    fontSize: moderateScale(12),
    fontFamily: 'Courier',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  full: {
    width: '100%',
  },
  half: {
    width: '50%',
  },
  third: {
    width: '33%',
  },
});
