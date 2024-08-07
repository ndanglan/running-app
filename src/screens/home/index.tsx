import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import RNLocation, {Location} from 'react-native-location';

import {AppImage} from 'components';
import {AppContainer} from 'components/AppContainer';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {useAppSelector} from 'redux_';
import {
  useStartActivityMutation,
  useStopActivityMutation,
  useUpdateActivityMutation,
} from 'redux_/api';
import {moderateScale} from 'utils';

dayjs.extend(utc);
dayjs.extend(timezone);

const INTERVAL_TO_UPDATE = 30000; // 2phut

export const HomeScreen = () => {
  const locationSubscription = useRef<any>();
  const [location, setLocation] = useState<Location | null>();
  const [times, setTimes] = useState<number>(0);
  const [time, setTime] = useState('00:00:00');
  const [granted, setGranted] = useState<boolean>(false);
  const [activityId, setActivityId] = useState<number>();

  const interval = useRef<any>();
  const startTimeRef = useRef<any>();
  const intervalUpdateAvt = useRef<any>();
  const locationRef = useRef<any>();

  const user = useAppSelector(state => state.auth.user);

  const [startActivity] = useStartActivityMutation();
  const [stopActivity] = useStopActivityMutation();
  const [updateActivity] = useUpdateActivityMutation();

  const _startUpdatingLocation = useCallback(async () => {
    if (interval?.current) {
      return;
    }
    try {
      const res = await startActivity({
        client_id: user?.client_id ?? '',
      }).unwrap();
      if (res?.id) {
        setActivityId(res?.id);
        startTimeRef.current = dayjs();
        interval.current = setInterval(() => {
          const elapsedTime = dayjs().diff(startTimeRef.current, 'second');
          const formattedTime = dayjs
            .utc(elapsedTime * 1000)
            .format('HH:mm:ss');
          setTime(formattedTime);
        }, 1000);

        RNLocation.configure({
          distanceFilter: 100, // Meters
          desiredAccuracy: {
            ios: 'best',
            android: 'balancedPowerAccuracy',
          },
          // Android only
          androidProvider: 'auto',
          interval: 120000, // Milliseconds
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

        locationSubscription.current = RNLocation.subscribeToLocationUpdates(
          locations => {
            setTimes(prev => prev + 1);
            setLocation(locations[0]);
            locationRef.current = locations[0];
          },
        );
      }
    } catch (error) {}
  }, [startActivity, user?.client_id]);

  const _stopUpdatingLocation = useCallback(async () => {
    if (!interval.current) {
      return;
    }
    try {
      const res = await stopActivity({
        client_id: user?.client_id ?? '',
      }).unwrap();
      if (res?.id) {
        setActivityId(undefined);
      }
    } catch (error) {}
    clearInterval(interval.current);
    clearInterval(intervalUpdateAvt.current);
    interval.current = null;
    startTimeRef.current = null;
    intervalUpdateAvt.current = null;
    locationSubscription.current && locationSubscription.current?.();
    setLocation(null);
    locationRef.current = null;
    setTime('00:00:00');
  }, [user?.client_id, stopActivity]);

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
    }).then(grante => {
      setGranted(!!grante);
    });
    return () => {
      _stopUpdatingLocation();
    };
  }, [_stopUpdatingLocation]);

  useEffect(() => {
    if (activityId !== undefined) {
      intervalUpdateAvt.current = setInterval(() => {
        if (activityId !== undefined) {
          updateActivity({
            activity_id: activityId,
            lat: locationRef?.current?.latitude ?? 0,
            lon: locationRef?.current?.longitude ?? 0,
          });
        }
      }, INTERVAL_TO_UPDATE);
    }
  }, [activityId, updateActivity]);

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
          source={require('@assets/img/fake-avatar.png')}
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
          {user?.fullname}
        </Text>
        <Text
          style={[
            {
              marginTop: moderateScale(8),
              fontSize: moderateScale(14),
              color: '#708572',
            },
          ]}>
          {user?.email}
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
          {time}
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
      {granted ? (
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
      ) : (
        <View>
          <Text>
            Hãy cấp quyền truy cập vị trí cho chúng tôi, hoặc liên hệ nhà phát
            triển để giúp đỡ.
          </Text>
        </View>
      )}
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
