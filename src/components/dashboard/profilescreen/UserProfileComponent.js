import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import { flexRow } from '../../../styles/CommonStyling'
import { navigate } from '../../../routes/RootNavigation'
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../../styles/colors'

const UserProfileComponent = ({ userData, phone }) => {
    return (
        <View style={{ padding: 20, flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigate('editProfile')}>
                <Image source={require("../../../assets/images/profile.png")} style={{ height: 70, width: 70, resizeMode: "contain" }} />
            </TouchableOpacity>
            <View style={{ flex: 1, paddingLeft: 20 }}>
                <HeadingText
                    text={userData?.FirstName ? userData?.FirstName + ' ' + userData?.LastName : 'Guest1022i93'}
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

export default UserProfileComponent

const styles = StyleSheet.create({})