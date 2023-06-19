import React, { useState } from 'react'
import { Alert, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Center, flexRow, screenStyle } from '../../styles/CommonStyling'
import { AppText } from '../../Utility/TextUtility'
import { colors } from '../../styles/colors'
import { userLogoutAction } from '../../store/actions/UserAction'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from '../../routes/RootNavigation';
import RateUsModal from '../../components/modals/RateUsModal';
import { profileScreenArr } from '../../constants/OtherConst';
import UserProfileComponent from '../../components/dashboard/profilescreen/UserProfileComponent';



const ProfileScreen = () => {
    const userData = useSelector(state => state.motor?.apiRequestQQ);
    const dispatch = useDispatch();
    const phone = useSelector(state => state.motor?.apiRequestQQ?.MobileNumber);
    const [rateModal, setrateModal] = useState(null);


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
        }
        if (key === 'rate') {
            setrateModal(true);
            return;
        }
        navigate(key)
    }

    return (
        <View style={screenStyle}>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={profileScreenArr}
                    key={(a, b) => String(b)}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => <UserProfileComponent userData={userData} phone={phone} />}
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