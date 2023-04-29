import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import SplashScreen from '../screens/OnBoarding/SplashScreen';
import { navigationRef } from './RootNavigation';
import { AuthNavigation, cardStyle, hideHeader, StackNavigation } from './StackNavigation';
import AdvertisementScreen from '../screens/OnBoarding/AdvertisementScreen';

const Stack = createStackNavigator();


const AppNavigation = ({ appStatus }) => {

  console.log("appStatus--", appStatus);
  switch (appStatus) {
    case 0:
      return (
        <Stack.Navigator screenOptions={hideHeader}>
          <Stack.Screen name="splash" component={SplashScreen} />
        </Stack.Navigator>
      );
    case 1:
      return (
        <Stack.Navigator screenOptions={{ ...hideHeader, ...cardStyle }}>
          <Stack.Screen
            name="marketingAdvertisement"
            component={AdvertisementScreen}
          />
        </Stack.Navigator>
      );
    case 2:
      return <AuthNavigation />;
    case 3:
      return <StackNavigation />;
    default:
      return <AuthNavigation />;
  }
};

const Navigator = ({ status }) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigation appStatus={status} />
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    status: state?.app?.appStatus,
  };
};

export default connect(mapStateToProps, {})(Navigator);
