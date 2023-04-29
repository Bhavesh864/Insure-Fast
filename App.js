import React, {useEffect} from 'react';
import {
  Dimensions,
  NativeModules,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
// import dynamicLinks from '@react-native-firebase/dynamic-links';
// import { Loader } from './src/components/Custom/CustomFields'
// import { AppConst } from './src/constants/AppConst'
import {colors} from './src/styles/colors';
// import { AppToastMessage, SnakeBar } from './src/constants/SnakeBar'
import {navigate} from './src/route/RootNavigation';
// import firebase from '@react-native-firebase/app';
// import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
// import { callNotification, createNotificationChannel, getFcmToken, NotificationListener } from './src/constants/Notification';
// import { Settings } from 'react-native-fbsdk-next';
import Navigator from './src/routes/index';
import {Loader} from './src/components/CustomFields';
import {AppConst} from './src/constants/AppConst';
import {SnackBar} from './src/components/custom/SnackBar';

const App = ({loading}) => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  AppConst.showConsoleLog('loader: ', loading);

  return (
    <View style={styles.container}>
      <Navigator />
      {loading && <Loader />}
      <SnackBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

const mapStateToProps = state => {
  return {
    loading: state.app.loading,
  };
};

export default connect(mapStateToProps, {})(App);
