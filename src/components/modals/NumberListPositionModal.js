import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fonts, height, normalTextStyle } from '../../styles/CommonStyling';
import { colors } from '../../styles/colors';
import { shadows } from '../../styles/shadow';
import { AppText } from '../../Utility/TextUtility';
// import { height } from '../../styles/dimensions';
// import { fonts } from '../../styles/fonts';
// import { colors, DashboardDarkColor } from '../../styles/color';
// import { shadows } from '../../styles/shadow';
// import { getAllEvents, MarkEvent } from '../../store/actions/EventAction';
// import { AppConst } from '../../constants/AppConst';
// import { connect } from 'react-redux';



const NumberListPositionModal = ({ close, position, options, optionPress = () => { }, titleKey = "option" }) => {

    // console.log(height / position);

    return (
        <View>
            <Modal
                visible
                animationType="fade"
                onRequestClose={() => close()}
                transparent={true}
            >
                <TouchableOpacity activeOpacity={1} onPressOut={() => close()} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={[
                        styles.moreModal,
                        // { top: height - position < 170 ? position - 80 : position + 10, },
                        // { paddingVertical: 10, paddingHorizontal: 10 },
                        // view == "doc" ? { right: 50 } : null,
                        ((height / position) > 2) ?
                            {
                                bottom: 20,
                                top: position + 30
                            } :
                            {
                                bottom: (height - position) + 20,
                                top: Platform.OS == "ios" ? 40 : 20
                            }
                        ,
                        shadows[2]
                    ]}>
                        {
                            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                                {options?.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={String(index)} style={styles.item} onPress={() => optionPress(item)}>
                                            <AppText
                                                text={titleKey ? item[titleKey] : item}
                                            />
                                            {/* <Text allowFontScaling={false}
                                                style={[
                                                    styles.myEvntOptn,
                                                ]}
                                            >{titleKey ? item[titleKey] : item}</Text> */}
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        }
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    moreIcon: {
        position: 'absolute',
        right: 0,
        padding: 10
    },
    modalOptn: {
        ...normalTextStyle,
        marginLeft: 10
    },
    singleOptn: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    moreModal: {
        position: 'absolute',
        // right: 35,
        // height: 150,
        width: "90%",
        backgroundColor: colors.white,
        borderRadius: 10,
        alignSelf: "center"
    },
    myEvntOptn: {
        ...normalTextStyle,
        padding: 10,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: 'grey',
        paddingLeft: 0,
        paddingRight: 20
    },
    item: {
        padding: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: colors.grey
    }
});


export default NumberListPositionModal;