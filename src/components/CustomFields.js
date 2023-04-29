import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  NativeModules,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
// import RNFetchBlob from 'react-native-blob-util';
import {
  Center,
  flexDirectionRow,
  flexRow,
  flexSpaceBetween,
  fonts,
  fontSize,
  normalTextStyle,
  SemiMediumTextStyle,
  smallTextSize,
} from '../styles/CommonStyling';
import { colors } from '../styles/colors';
import { goBack, navigate } from '../routes/RootNavigation';
// import { AppText, HeadingText } from '../utility/TextUtility';
import { shadows } from '../styles/shadow';
import { AppConst, englishLanguageKey } from '../constants/AppConst';
import { AppText, HeadingText } from '../Utility/TextUtility';


export const InputField = ({
  placeholder = 'Password',
  value,
  onTextChange,
  onFocus = () => { },
  onBlur = () => { },
  showIcon,
  isDescription = false,
  error,
  password = false,
  style = {},
  activeBorderColor,
  textStyle = {},
  keyboardType = 'default',
  maxLength = 30,
  leftIcon,
  label,
  editable = true,
  ref = null,
  containerStyle = {},
  errorColor = colors.red,
  autoCapitalize = "none",
  onKeyPress = () => { },
  autoCorrect = false

}) => {
  const [activeField, setActiveField] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(password);

  const inputPasswordWidth =
    activeField && !isDescription
      ? {
        border: 0.5,
        borderColor: activeBorderColor ? activeBorderColor : colors.primary,
      }
      : {};
  // console.log("editable--", editable)
  return (
    <View style={{ marginVertical: 5, ...containerStyle, }}>
      {label && (
        <AppText
          text={label}
          style={{
            marginBottom: 10,
            marginHorizontal: 20,
            // fontFamily: fonts.medium,
          }}
          size={15}
        />
      )}
      <View
        style={[
          styles.InputView,
          // inputPasswordWidth,
          // shadows[1],
          isDescription ? { height: 120, maxHeight: 120 } : { alignItems: 'center' },
          // error ? { borderColor: colors.secondary, borderWidth: 0.8 } : null,
          isDescription ? null : flexRow,
          style,
        ]}>
        {showIcon && showIcon}
        <TextInput
          autoCorrect={autoCorrect}
          ref={ref}
          value={value}
          onChangeText={text => onTextChange(text)}
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          maxLength={isDescription ? 1000 : maxLength}
          keyboardType={keyboardType}
          editable={editable}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          multiline={isDescription ? true : false}
          // onKeyPress={onKeyPress}
          onFocus={() => {
            setActiveField(true);
            onFocus();
          }}
          onBlur={() => {
            setActiveField(false);
            onBlur();
          }}
          style={[
            {
              flex: 1,
              ...smallTextSize,
              fontSize: 15,
              paddingLeft: showIcon && showIcon ? 10 : 10,
              textAlignVertical: isDescription ? 'top' : 'center',
              ...textStyle
            },
          ]}
        />
        {leftIcon && leftIcon}
        {password && <Entypo name={secureTextEntry ? 'eye-with-line' : 'eye'} size={20} color={colors.white} style={{ padding: 5, marginLeft: 5 }} onPress={() => setSecureTextEntry(!secureTextEntry)} />}
      </View>
      {error ? (
        <AppText
          text={error}
          style={[{ color: errorColor, paddingHorizontal: 25, top: -10 }]}
        />
        // <Text
        //   style={[
        //     normalTextStyle,
        //     { color: colors.secondary, paddingHorizontal: 25, top: -10 },
        //   ]}>
        //   {error}
        // </Text>
      ) : null}
    </View>
  );
};

export const AppName = ({ size = 28 }) => {
  return (
    <View style={{ ...flexRow, alignSelf: 'center' }}>
      <HeadingText text="my" size={28} />
      <HeadingText text="fans" size={28} color={colors.secondary} />
    </View>
  );
};

export const Loader = ({
  color = colors.white,
  backgroundColor = 'rgba(0,0,0,0.5)',
}) => {
  return (
    <View style={[styles.loader, { backgroundColor: backgroundColor }]}>
      <ActivityIndicator size={'large'} color={color} style={styles.loaderC} />
    </View>
  );
};

export const Button = ({
  title = 'Login',
  onPress = () => { },
  backgroundColor = colors.primary,
  textStyle = {},
  icon,
  style = {},
  textColor = colors.white
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, { backgroundColor: backgroundColor, ...style }]}
      onPress={() => onPress()}>
      {icon && icon}

      <AppText
        text={title}
        color={textColor}
        style={{ ...SemiMediumTextStyle, ...textStyle }}
      />
    </TouchableOpacity>
  );
};

export const TouchableTextView = ({
  placeholder,
  value,
  onPress = () => { },
  Icon,
  leftIcon,
  style = {},
  touchable = true,
  backgroundColor = colors.white,
  marginBottom = 15,
  label,
  error,
  valueColor = colors.black,
  marginHorizontal = 20
}) => {
  return (
    <View style={{ marginVertical: 2 }}>
      <SpacerHorizontal marginHorizontal={marginHorizontal}>
        {label &&
          <AppText
            text={label}
            style={{
              marginBottom: 5,
              // fontFamily: fonts.medium
            }}
            size={15}
          />
        }
        <TouchableOpacity
          activeOpacity={touchable ? 0.7 : 1}
          style={[
            styles.InputView,
            // shadows[0],
            {
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: backgroundColor,
              marginBottom,
              justifyContent: 'space-between',
              width: '100%',
            },
            style,
          ]}
          onPress={touchable ? onPress : null}>
          {Icon && Icon}
          <Text
            numberOfLines={1}
            style={[
              normalTextStyle,
              { color: value ? valueColor : colors.grey, paddingLeft: 10, flex: 1 },
            ]}>
            {value ? value : placeholder}
          </Text>
          {leftIcon && leftIcon}
        </TouchableOpacity>
      </SpacerHorizontal>
      {error ? (
        <AppText
          text={error}
          style={[{ color: colors.red, paddingHorizontal: 25, top: -10 }]}
        />
      ) : null}
    </View>
  );
};

export const Checkbox = ({
  value = false,
  size = 20,
  backgroundColor = colors.primary,
  onPress = () => { },
  checkText = false,
}) => {
  return (
    <View style={{ ...flexRow }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          styles.checkbox,
          {
            backgroundColor: colors.white,
            height: size,
            width: size,
            borderColor: value ? colors.primary : colors.grey,
          },
        ]}>
        {value && <Entypo name="check" size={18} color={colors.primary} />}
      </TouchableOpacity>
      {value && checkText && (
        <HeadingText
          text="   Checked"
          size={fontSize.normal}
          color={colors.green}
        />
      )}
    </View>
  );
};

export const Selectbox = ({
  value = false,
  size = 22,
  backgroundColor = colors.primary,
  onPress = () => { },
  checkText = false,
}) => {
  return (
    <View style={{ ...flexRow }}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.checkbox,
          {
            // backgroundColor: colors.white,
            height: size,
            width: size,
            borderColor: value ? colors.primary : colors.grey,
            borderRadius: 20,
            padding: 2
          },
        ]}>
        {value && <View style={[{ backgroundColor, borderRadius: 20, height: size - 7, width: size - 7 }]} />}
      </TouchableOpacity>
      {value && checkText && (
        <HeadingText
          text="   Checked"
          size={fontSize.normal}
          color={colors.green}
        />
      )}
    </View>
  );
};

export const YesNoButton = ({ value = true, onPress = () => { }, noValueType = false }) => {
  const backgroundColor = value ? colors.primary : colors.white;
  return (
    <View style={[flexRow, { marginVertical: 20, marginBottom: 0 }]}>
      <TouchableOpacity
        onPress={() => onPress(true)}
        style={[styles.yesNoBtn, { backgroundColor: value ? colors.primary : colors.white }]}
      >
        {/* <Selectbox value={true} /> */}
        <AppText
          text={"Yes"}
          color={value ? colors.white : colors.grey}
          style={{ marginLeft: 0 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress(false)}
        style={[styles.yesNoBtn, { marginLeft: 20, backgroundColor: (value != noValueType) ? colors.white : colors.primary }]}
      >
        {/* <Selectbox value={false} /> */}
        <AppText
          text={"No"}
          color={(value != noValueType) ? colors.grey : colors.white}
          style={{ marginLeft: 0 }}
        />
      </TouchableOpacity>
    </View>
  )
}

export const CustomBackButton = ({ style = {}, iconName = 'chevron-back', onPress = () => goBack() }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.headerIcon, style]}>
      <Ionicons name={iconName} color={colors.white} size={25} style={{}} />
    </TouchableOpacity>
  );
};

export const ModalHeader = ({ title = '', onPress = () => { } }) => {
  return (
    <View
      style={styles.modalHeader}>
      <CustomBackButton onPress={onPress} />
      <AppText
        size={17}
        style={{ marginHorizontal: 20 }}
        text={title}
      />
    </View>
  );
};


export const ModalTitleHeader = ({ title = '', onPress = () => { }, style = {}, color = colors.black }) => {
  return (
    <View
      style={[styles.modalTitleHeader, style]}>
      <AppText
        size={17}
        style={{ marginHorizontal: 20 }}
        text={title}
        color={color}
      />
      <AntDesign name='close' size={25} color={color} style={styles.closeIcon} onPress={() => onPress()} />
    </View>
  );
};


export const SpacerVertical = ({ children, marginVertical = 15 }) => {
  return <View style={{ marginVertical: marginVertical }}>{children}</View>;
};

export const SpacerHorizontal = ({ children, marginHorizontal = 20 }) => {
  return <View style={{ marginHorizontal: marginHorizontal }}>{children}</View>;
};


export const OverLayView = ({ borderRadius = 0, opacity = 0.5, style = {} }) => {
  return <View style={[styles.overlayView, { borderRadius, opacity }, style]} />
}

export const Spacer = ({
  children,
  marginHorizontal = 20,
  marginVertical = 15,
}) => {
  return (
    <View
      style={{
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical,
      }}>
      {children}
    </View>
  );
};


export const SingleTab = ({
  text = 'Account',
  onPress = () => { },
  Icon,
  showBorder = true,
  badgeValue = null
}) => {
  const appLanguage = useSelector(state => state.app.appLanguage);

  AppConst.showConsoleLog("cart - ", badgeValue)
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress()}
      style={[{ ...styles.tabView, borderBottomWidth: showBorder ? 0.3 : 0 }, flexSpaceBetween]}>
      <View style={flexRow}>
        {Icon && <View style={styles.tabIconView}>{Icon}</View>}
        <AppText text={text} size={16} onPress={onPress} />
      </View>
      <View style={{ marginRight: 20, ...flexRow }}>
        {badgeValue ?
          <View style={styles.badge}>
            <AppText text={badgeValue} />
          </View>
          : null
        }
        <Ionicons
          name={appLanguage == "AR" ? "chevron-back-outline" : "chevron-forward-outline"}
          size={22}
          color={colors.fadeGrey}
        />
      </View>
    </TouchableOpacity>
  );
};


export const HeaderWithCloseIcon = ({ onPress = () => goBack() }) => (
  <View style={styles.backBtnView}>
    <CustomBackButton
      iconName="close-outline"
      onPress={() => onPress()}
      style={{ backgroundColor: colors.darkGrey }}
    />
  </View>
)



export const ScreenCenterText = ({ text = "No Data Found", textStyle = {}, textColor, textSize = 16 }) => {
  return (
    <HeadingText
      text={text}
      style={{ position: "absolute", top: "47%", alignSelf: "center", ...textStyle }}
      color={textColor}
      size={textSize}
    />
  )
}


const styles = StyleSheet.create({
  InputView: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey,
    marginBottom: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    // width: "100%",
    marginHorizontal: 20,
    alignSelf: 'center',
    height: 50,
    backgroundColor: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 50,
    alignSelf: 'center',
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    maxHeight: 50,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: fonts.medium,
    fontSize: 16
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    height: 30,
    width: 30,
    backgroundColor: colors.primary,
    borderRadius: 15,
    ...Center,
    alignSelf: 'flex-start',
  },
  closeIcon: {
    position: "absolute",
    right: 0,
    padding: 10
  },
  loaderC: {
    padding: 10,
    // backgroundColor: colors.primary,
    borderRadius: 10,
  },
  modalHeader: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabView: {
    borderBottomColor: colors.off_white,
    paddingHorizontal: 10,
    // marginVertical: 10,
    paddingVertical: 20,
    // backgroundColor: "red"
  },
  tabIconView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primaryLight,
    ...Center,
    marginHorizontal: 20,
  },
  overlayView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.black,
    opacity: 0.5,
  },
  modalTitleHeader: {
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: colors.grey
  },
  videoView: {
    height: 100,
    width: 100,
    borderRadius: 10,
    backgroundColor: colors.darkGrey,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  backBtnView: {
    margin: 15,
    alignSelf: "flex-end"
  },
  badge: {
    height: 24,
    width: 24,
    ...Center,
    borderRadius: 30,
    backgroundColor: colors.secondary
  },
  yesNoBtn: {
    height: 40,
    width: 90,
    ...Center,
    backgroundColor: colors.white,
    borderRadius: 10,
    ...flexRow,
    borderWidth: 0.6,
    borderColor: colors.grey
  }
});
