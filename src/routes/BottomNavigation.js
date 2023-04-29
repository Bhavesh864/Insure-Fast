import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomBottomTab from '../components/custom/CustomBottomTab';
import HomeScreen from '../screens/Dashboard/HomeScreen';
import ClaimScreen from '../screens/Dashboard/ClaimScreen';
import PoliciesScreen from '../screens/Dashboard/PoliciesScreen';
import HelpScreen from '../screens/Dashboard/HelpScreen';
import ProfileScreen from '../screens/Dashboard/ProfileScreen';
import { colors } from '../styles/colors';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const BottomNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={{
        // headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          // header: () => <HomeScreenHeader />
        }}
      />
      <Tab.Screen
        name="claim"
        component={ClaimScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="policies"
        component={PoliciesScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="help"
        component={HelpScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};




export const DrawerNavigation = () => (
  <Drawer.Navigator
  // drawerContent={(props) => <DrawerContainer {...props} />}
  // screenOptions={{ drawerStyle: { width: screenWidt } }}
  >
    <Drawer.Screen name='drawer' component={BottomNavigation} options={{ headerShown: false }} />
  </Drawer.Navigator>
)