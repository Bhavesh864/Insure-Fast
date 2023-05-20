import React, { useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { colors } from '../../styles/colors'
import { Center, height, width } from '../../styles/CommonStyling'
import { InputField, ModalTitleHeader } from '../CustomFields'
import { AppText } from '../../Utility/TextUtility'
import { AppConst } from '../../constants/AppConst'


const ListShowModal = ({ onClose, title = "Select", list = [], onItemSelect, selectedItem, textKey = "title", isSearch = false, onSearch, contStyle = {}, selectedKey = "key" }) => {
    const [search, setSearch] = useState("");


    const searchAction = (text) => {
        setSearch(text);
        onSearch && onSearch(text);
    }

    AppConst.showConsoleLog("selected: ", selectedItem, selectedKey)
    AppConst.showConsoleLog("selected: ", list, selectedKey)
    return (
        <Modal
            visible
            transparent
            onRequestClose={onClose}
            animationType='slide'
        >
            <TouchableOpacity style={styles.modalCont} onPressOut={() => onClose()} activeOpacity={1}>
                <TouchableWithoutFeedback>
                    <View style={[styles.cont, contStyle]}>
                        <ModalTitleHeader
                            title={title}
                            onPress={onClose}
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
                                {list.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={String(index)}
                                            activeOpacity={0.8}
                                            style={[styles.item, { borderColor: selectedItem == item[selectedKey] ? colors.primary : colors.grey }]}
                                            onPress={() => onItemSelect(item)}
                                        >
                                            <AppText
                                                text={item[textKey]}
                                            // color={}
                                            />
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalCont: {
        flex: 1,
        backgroundColor: colors.transparent_black,
        justifyContent: "center"
    },
    cont: {
        maxHeight: height - 40,
        margin: 20,
        borderRadius: 10,
        backgroundColor: colors.white
    },
    item: {
        height: 45,
        width: (width - 80) / 2,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.grey,
        ...Center,
        margin: 10,
        borderRadius: 10
    },
    itemCont: {
        flexDirection: "row",
        flexWrap: "wrap",
        // padding: 10,
        paddingVertical: 20
    }
})

export default ListShowModal