import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {Controller, useForm} from 'react-hook-form';
import DeviceInfo from 'react-native-device-info';

import {AppButton, AppContainer, AppImage, AppInput} from 'components';
import {navigate, RouteName} from 'navigation';
import {CreateUserPayload, useCreateUserMutation} from 'redux_/api';
import {moderateScale, windowWidth} from 'utils';

export const LoginScreen = () => {
  const {handleSubmit, control} = useForm<CreateUserPayload>({
    defaultValues: {
      email: '',
      fullname: '',
    },
    reValidateMode: 'onChange',
  });
  const [createUser, {isLoading, isSuccess, isError, error}] =
    useCreateUserMutation();
  const [localPayload, setPayload] = useState<any>();
  const onCreateUser = async (data: CreateUserPayload) => {
    try {
      if (isLoading) return;
      const result = await Promise.allSettled([
        DeviceInfo.getDeviceName(),
        DeviceInfo.getUniqueId(),
      ]);

      // const deviceName =
      //   result[0]?.status === 'fulfilled' ? result[0]?.value : '';
      const deviceId =
        result[1]?.status === 'fulfilled' ? result[1]?.value : '';
      const payload = {
        client_id: `${deviceId}`,
        // client_id: `${deviceName}-${deviceId}-4444444`,
        email: data.email,
        fullname: data.fullname,
      };
      setPayload(payload);
      await createUser(payload);
    } catch (err) {}
  };

  useEffect(() => {
    isSuccess && navigate(RouteName.Welcome);
  }, [isSuccess]);

  return (
    <AppContainer
      headerShown={false}
      preset="scroll"
      safeAreaEdges={['top']}
      backgroundColor="white">
      <AppImage
        source={require('@assets/img/banner_login.png')}
        style={{
          width: windowWidth,
          height: moderateScale(245),
        }}
      />
      <View
        style={{
          alignItems: 'center',
          marginTop: moderateScale(40),
        }}>
        <Text
          style={{
            fontSize: moderateScale(24),
            color: '#315735',
            fontWeight: 'bold',
          }}>
          Đăng Nhập
          {JSON.stringify(localPayload)}
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: moderateScale(20),
        }}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              containerStyle={{
                marginVertical: moderateScale(8),
              }}
              inputWrapperStyle={{
                borderColor: '#315735',
                backgroundColor: 'white',
                borderRadius: 120,
              }}
              style={{
                fontSize: moderateScale(14),
              }}
              placeholder="Email"
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              inputWrapperStyle={{
                borderColor: '#315735',
                backgroundColor: 'white',
                borderRadius: 120,
              }}
              style={{
                fontSize: moderateScale(14),
              }}
              containerStyle={{
                marginVertical: moderateScale(8),
              }}
              placeholder="Tên người dùng"
            />
          )}
          name="fullname"
        />
        {!!isError && (
          <Text
            style={{
              fontSize: moderateScale(10),
              color: 'red',
              textAlign: 'center',
              marginVertical: moderateScale(8),
            }}>
            {JSON.stringify(error)}
          </Text>
        )}

        <AppButton
          onPress={handleSubmit(onCreateUser)}
          style={{
            minHeight: moderateScale(36),
            borderRadius: 120,
            backgroundColor: '#10BD24',
          }}
          textStyle={{
            color: 'white',
            fontWeight: 'bold',
          }}
          pressedStyle={{
            backgroundColor: '#315735',
          }}>
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </AppButton>
      </View>
    </AppContainer>
  );
};
