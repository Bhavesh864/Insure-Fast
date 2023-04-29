import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    Platform,
} from 'react-native';
import { colors } from '../../styles/colors';
import AntDesign from "react-native-vector-icons/AntDesign";
import { Center, flexSpaceAround, fonts } from '../../styles/CommonStyling';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ClaimSvgIcon, HelpSvgIcon, HomeSvgIcon, PolicySvgIcon, ProfileSvgIcon } from '../../assets/svg/basicSvgs';
import { AppText } from '../../Utility/TextUtility';


const TabIcons = [
    {
        icon: color => (
            <View
                style={{
                    ...styles.iconView,
                }}>
                <HomeSvgIcon color={color} />
            </View>
        ),
        name: "Home"
    },
    {
        icon: color => (
            <View
                style={{
                    ...styles.iconView,
                }}>
                <AntDesign name={"search1"} size={24} color={color} />
            </View>
        ),
        name: "Claim"
    },
    {
        icon: color => (
            <View
                style={{
                    ...styles.iconView,
                    backgroundColor: colors.navyBlue
                }}>
                <AntDesign name={"plus"} size={27} color={colors.white} />
            </View>
        ),
        name: "newPolicy"
    },
    {
        icon: color => (
            <View
                style={{
                    ...styles.iconView,
                }}>
                <HelpSvgIcon color={color} />
            </View>
        ),
        name: "Help"
    },
    {
        icon: color => (
            <View
                style={{
                    ...styles.iconView,
                }}>
                <ProfileSvgIcon color={color} />
            </View>
        ),
        name: "Account"
    },
];

const getTabIcon = (index, isActive) => {
    return TabIcons[index].icon(isActive);
};

const TabItems = ({ onPress, isActive, index }) => {
    let activeColor = isActive ? colors.primary : colors.darkGrey;
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                overflow: 'hidden',
            }}>
            {TabIcons[index].icon(activeColor)}
            {TabIcons[index].name !== "newPolicy" &&
                <AppText
                    text={TabIcons[index].name}
                    style={{ bottom: 5 }}
                    color={activeColor}
                />
            }
        </TouchableOpacity>
    );
};

const CustomBottomTab = props => {
    const Tabs = Array.isArray(props?.state?.routes) ? props?.state?.routes : [];

    const onTabPress = (index, screen) => {
        props.navigation.navigate(screen);
    };

    return (
        <View style={{ backgroundColor: colors.white }}>
            <View
                style={[{
                    ...styles.bottomBar,
                }, flexSpaceAround]}>
                {Tabs.map((item, index) => {
                    return (
                        <TabItems
                            index={index}
                            key={String(index)}
                            isActive={props.state.index == index}
                            onPress={() => {
                                onTabPress(index, item?.name);
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomBar: {
        height: 60,
        backgroundColor: colors.white,
        // borderRadius: 30,
        // marginHorizontal: 5,
        marginBottom: 10,
        borderTopWidth: 0.5,
        borderColor: colors.grey
    },
    iconView: {
        height: 40,
        width: 40,
        borderRadius: 20,
        ...Center,
    },
});

export default CustomBottomTab;
