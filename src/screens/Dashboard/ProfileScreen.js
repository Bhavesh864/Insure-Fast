import React, { useState } from 'react'
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Center, flexRow, screenStyle } from '../../styles/CommonStyling'
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { AppText, HeadingText } from '../../Utility/TextUtility'
import { colors } from '../../styles/colors'
import { userLogoutAction } from '../../store/actions/UserAction'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from '../../routes/RootNavigation';
import RateUsModal from '../../components/modals/RateUsModal';


const ProfileScreen = () => {
    const userData = useSelector(state => state.motor?.apiRequestQQ);
    const dispatch = useDispatch();
    const phone = useSelector(state => state.user?.user?.phone);
    const [rateModal, setrateModal] = useState(null);

    const arr = [
        {
            title: "Payments",
            icon: <AntDesign name='creditcard' size={15} color={colors.primary} />,
            key: "transactions"
        },
        {
            title: "How we get you",
            key: "about",
            icon: <AntDesign name='question' size={15} color={colors.primary} />
        },
        {
            title: "Allocated Mentor",
            key: "allocate",
            icon: <AntDesign name='user' size={15} color={colors.primary} />
        },
        {
            title: "Rate us",
            key: 'rate',
            icon: <AntDesign name='staro' size={15} color={colors.primary} />
        },
        {
            title: "Refer",
            key: "refer",
            icon: <FontAwesome5 name='coins' size={15} color={colors.primary} />
        },
        {
            title: "Logout",
            key: "logout",
            icon: <AntDesign name='logout' size={15} color={colors.primary} />
        },
    ];

    const onItemPress = (key) => {
        if (!key) {
            return
        }
        if (key == "logout") {
            Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Logout",
                        onPress: () => dispatch(userLogoutAction()),
                        style: "destructive"
                    }
                ]
            );
            return;
            // dispatch(userLogoutAction())
        }
        if (key === 'rate') {
            setrateModal(true);
            return;
        }

        navigate(key)
    }

    const ListHeader = () => {
        return (
            <View style={{ padding: 20, flexDirection: "row" }}>
                <TouchableOpacity onPress={() => navigate('editProfile')}>
                    <Image source={require("../../assets/images/profile.png")} style={{ height: 70, width: 70, resizeMode: "contain" }} />
                </TouchableOpacity>
                <View style={{ flex: 1, paddingLeft: 20 }}>
                    <HeadingText
                        text={userData?.FirstName ? userData?.FirstName + ' ' + userData?.LastName : 'Guest1022i93'}
                        // size={16}
                        style={{}}
                    />
                    <View style={{ paddingTop: 6 }}>
                        <View style={[flexRow]}>
                            <Ionicons name='call-outline' size={18} color={colors.darkGrey} />
                            <AppText
                                text={phone || ''}
                                size={14}
                                color={colors.darkGrey}
                                style={{ paddingLeft: 10 }}
                            />
                        </View>
                        <View style={[flexRow]}>
                            <FontAwesome name='birthday-cake' size={15} color={colors.darkGrey} />
                            <AppText
                                text={userData?.Dob || 'Date of birth'}
                                size={14}
                                color={colors.darkGrey}
                                style={{ paddingLeft: 10, paddingTop: 3 }}
                            />
                        </View>
                        <TouchableOpacity style={{ marginTop: 10, ...flexRow }} onPress={() => navigate('editProfile')}>
                            <AppText
                                text='View Profile '
                                color={colors.primary}
                            />
                            <AntDesign name='right' size={15} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={screenStyle}>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={arr}
                    key={(a, b) => String(b)}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => <ListHeader />}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => onItemPress(item.key)}
                                style={[styles.item, { borderTopWidth: index == 0 ? 0 : 1 }]}
                            >
                                <View style={styles.iconView}>
                                    {item.icon}
                                </View>
                                <AppText
                                    text={item.title}
                                    size={15}
                                />
                            </TouchableOpacity>
                        )
                    }}
                />
            </SafeAreaView>
            {rateModal &&
                <RateUsModal
                    onClose={() => setrateModal(false)}
                    list={[1, 2, 3]}
                    title={'Would you like to rate us?'}
                    onItemSelect={(item) => {
                    }}
                />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderColor: colors.grey,
        ...flexRow
    },
    iconView: {
        height: 30,
        width: 30,
        ...Center,
        borderRadius: 20,
        backgroundColor: colors.primaryLight,
        marginRight: 10
    }
})

export default ProfileScreen