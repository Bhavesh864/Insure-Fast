import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../styles/colors'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import { Center, width } from '../../../styles/CommonStyling'
import { AppConst } from '../../../constants/AppConst'


const BottomNumberAskModal = ({ title = "How many sons do you have?", onClose, onSelect, num = 4, selectedNum }) => {

    // AppConst.showConsoleLog("selected num: ", selectedNum)
    return (
        <Modal
            visible={true}
            // animationType="slide"
            onRequestClose={() => onClose()}
            transparent={true}
        >
            <View style={{ flex: 1, backgroundColor: colors.transparent_black, }}>
                <TouchableOpacity activeOpacity={1} onPress={() => onClose()} style={{ flex: 1 }} />

                <View>
                    <View style={{ padding: 20, backgroundColor: colors.primaryLight, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                        <AppText
                            text={title}
                            size={16}
                        />
                    </View>
                    <View style={{ paddingVertical: 20, backgroundColor: colors.white }}>
                        <View style={{ flexDirection: 'row', flexWrap: "wrap", padding: 10 }}>
                            {new Array(num).fill("1").map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={String(index)}
                                        activeOpacity={0.2}
                                        onPress={() => onSelect && onSelect(index + 1)}
                                        style={{ height: 50, width: (width - 80) / 3, ...Center, borderWidth: 0.5, borderColor: colors.grey, borderRadius: 10, margin: 10, backgroundColor: selectedNum == (index + 1) ? colors.primary : colors.white }}
                                    >
                                        <HeadingText
                                            text={index + 1}
                                            color={selectedNum == (index + 1) ? colors.white : colors.black}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({})

export default BottomNumberAskModal