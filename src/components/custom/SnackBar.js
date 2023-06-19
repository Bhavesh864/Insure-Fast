import React from 'react';
import { Text, StyleSheet, Animated, View } from 'react-native';
import { colors } from '../../styles/colors';
import { normalTextStyle, width } from '../../styles/CommonStyling';
import { shadows } from '../../styles/shadow';
// import { normalTextStyle } from '../styles/CommonStyling';
// import { colors } from '../styles/colors';
// import { width } from '../styles/CommonStyling';

let Ref = undefined;
const BarHeight = 50;
const timeInterval = 3000;
const animationSpeed = 800;

export const SnackBar = () => {
  return <ShowMessage ref={ref => (Ref = ref)} />;
};

export const AppToastMessage = (msg, color = colors.secondary) => {
  Ref && Ref?.showMessage(msg, color);
};

class ShowMessage extends React.Component {
  animHeight = new Animated.Value(BarHeight);
  state = {
    msg: '',
  };

  componentDidMount() { }

  showMessage = (message, color) => {
    this.setState(
      {
        msg: message,
        color: color,
      },
      () => {
        this.timeId && clearTimeout(this.timeId);
        setTimeout(() => {
          this.startAnimation(1);
        }, 100);
      },
    );
  };

  startAnimation = (value = 1) => {
    Animated.timing(this.animHeight, {
      toValue: value,
      duration: animationSpeed,
      useNativeDriver: true,
    }).start(() => {
      this.timeId = setTimeout(() => {
        if (value == 1) {
          this.stopAnimation(0);
        }
      }, timeInterval);
    });
  };

  stopAnimation = (value = 0) => {
    Animated.timing(this.animHeight, {
      toValue: value,
      duration: animationSpeed,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ msg: '' });
    });
  };

  render() {
    const translateY = this.animHeight.interpolate({
      inputRange: [0, 1, 1.4],
      outputRange: [BarHeight, 0, 0],
      extrapolate: 'clamp',
    });

    if (this.state.msg == '') {
      return null;
    }
    return (
      <Animated.View
        style={{
          ...styles.errView,
          transform: [{ translateX: translateY }],
          opacity: this.animHeight,
        }}>
        <View style={[styles.sideLine, { backgroundColor: this.state.color, }]} />
        <Text style={{ ...styles.msg }}>{this.state.msg}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  msg: {
    ...normalTextStyle,
    paddingHorizontal: 15,
    paddingVertical: 10,
    lineHeight: 22,
  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden',
  },
  errView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 2,
    backgroundColor: colors.white,
    borderRadius: 8,
    maxHeight: 120,
    position: 'absolute',
    bottom: 100,
    right: 10,
    width: width / 1.1,
    borderWidth: 0.5,
    borderColor: colors.grey,
    ...shadows[0]
  },
  sideLine: {
    width: 5, height: '100%', borderRadius: 3
  }
});
