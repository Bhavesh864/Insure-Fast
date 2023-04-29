import React from 'react';
import { StatusBar, SafeAreaView, View, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { colors } from './colors';
import { width } from './CommonStyling';

import { screenStyle } from './CommonStyling';
import { ModalHeader } from '../components/CustomFields';

// const width = screenWidth;

const SafeAreaCustomView = (props) => {
  return (
    //SafeAreaView background color set in whole screen background color
    <SafeAreaView style={[styles.container, props.SafeAreaViewStyle, { backgroundColor: props.backgroundColor ? props.backgroundColor : "white" }]}>
      <View style={[styles.container, props.SafeAreaViewStyle, { backgroundColor: 'transparent', width: '100%' }]}>
        {StatusBarView(props)}
        {props.children}
      </View>
    </SafeAreaView>
  );
};

const SafeAreaScrollView = (props) => {
  return (
    //SafeAreaView background color set in whole screen background color
    <SafeAreaView style={[styles.container, props.SafeAreaViewStyle, { backgroundColor: props.backgroundColor ? props.backgroundColor : "white" }]}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: 'transparent',
          flexGrow: 1,
          width: dimensions.width,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        keyboardShouldPersistTaps='always'
      >
        <View style={[styles.container, props.SafeAreaViewStyle, { backgroundColor: 'transparent', width: '100%' }]}>
          {StatusBarView(props)}
          {props.children}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const StatusBarView = (props) => {
  return (
    <StatusBar
      barStyle={props.barStyle}
      backgroundColor={props.androidStatusBackColor ? props.androidStatusBackColor : '#fff'} //For android
    />
  );
};

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const CustomSafeAreaView = ({ style = {}, barStyle = 'dark-content', children, showHeader = false, title = '' }) => {
  return (
    <SafeAreaView style={{ ...screenStyle, ...style }}>
      <StatusBarView barStyle={barStyle} />
      {showHeader &&
        <ModalHeader />
      }
      {children}
    </SafeAreaView>
  )
}

const styles = {
  container: {
    flexGrow: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    width: width,
  },
  scrollViewStyle: {
    backgroundColor: 'white',
    flexGrow: 1,
    width: width,
    alignItems: 'center',
  }
};

export { SafeAreaCustomView, StatusBarView, SafeAreaScrollView, DismissKeyboard };
