import React, { useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../styles/colors'
import { Center, flexRow, height, width } from '../../styles/CommonStyling'
import { InputField, ModalTitleHeader } from '../CustomFields'
import { AppText, HeadingText } from '../../Utility/TextUtility'
import { AppConst } from '../../constants/AppConst'


const DataListSelectModal = ({ onClose, title = "Select", list = [], onItemSelect, selectedItem, textKey = "title", isSearch = false, onSearch, contStyle = {}, selectedKey = "key" }) => {
    const [search, setSearch] = useState("");
    const [dataList, setdataList] = useState(list);

    const searchAction = (text) => {
        setSearch(text);
        let data = onSearch && onSearch(text);
        setdataList(data);
    }
    // AppConst.showConsoleLog("selected: ", selectedItem, selectedKey)
    const getFirstLetter = (text = "") => {
        if (typeof text == "string" && text?.length > 0) {
            let l = text.trim().replace(`"`, "").charAt(0);
            return l;
        }
        return ""
    }

    return (
        <Modal
            visible
            transparent
            onRequestClose={onClose}
            animationType='slide'
        >
            <View style={styles.modalCont}>
                <View style={[styles.cont, contStyle]}>
                    <ModalTitleHeader
                        title={title}
                        onPress={onClose}
                        style={{ backgroundColor: colors.primary }}
                        color={colors.white}
                    />
                    {isSearch &&
                        <View style={{ marginTop: 15 }}>
                            <InputField
                                placeholder='Search'
                                value={search}
                                onTextChange={txt => searchAction(txt)}
                                style={{ marginBottom: 0 }}
                            />
                        </View>
                    }
                    <ScrollView style={{ flexGrow: 1 }}>
                        <View style={styles.itemCont}>
                            {dataList.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={String(index)}
                                        activeOpacity={0.8}
                                        style={[styles.item, { borderColor: colors.grey }]}
                                        onPress={() => onItemSelect(item)}
                                    >
                                        <View style={styles.letterView}>
                                            <HeadingText
                                                text={getFirstLetter(item[textKey])}
                                                size={14}
                                            />
                                        </View>
                                        <AppText
                                            text={item[textKey]}
                                            style={{ flex: 1 }}
                                            numberOfLines={2}
                                        // color={}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalCont: {
        flex: 1,
        backgroundColor: colors.transparent_black,
        justifyContent: "flex-end"
    },
    cont: {
        maxHeight: height - 60,
        margin: 20,
        borderRadius: 15,
        backgroundColor: colors.white,
        marginTop: AppConst.paddingTop
    },
    item: {
        height: 45,
        // width: (width - 80) / 2,
        backgroundColor: colors.white,
        // borderWidth: 1,
        borderColor: colors.grey,
        // ...Center,
        margin: 10,
        borderRadius: 10,
        borderBottomWidth: 1,
        ...flexRow
    },
    itemCont: {
        paddingVertical: 20
    },
    letterView: {
        height: 30,
        width: 30,
        borderRadius: 25,
        backgroundColor: colors.primaryLight,
        ...Center,
        marginRight: 10
    }
})

export default DataListSelectModal;