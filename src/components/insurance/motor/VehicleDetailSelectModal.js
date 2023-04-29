import React, { useEffect, useState } from 'react'
import { Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button, Loader, ModalTitleHeader } from '../../CustomFields'
import { HeadingText } from '../../../Utility/TextUtility'
import { Center, flexRow, width } from '../../../styles/CommonStyling'
import FlexWrapListComponent from '../FlexWrapListComponent'
import { getMotorMakeAction, getMotorModelAction, getMotorVariantAction } from '../../../store/actions/PolicyAction'
import { AppConst } from '../../../constants/AppConst';


const titlesObj = {
    make: "",
    model: "Select Vehicle Model",
    variant: "Select Vehicle Variant"
}

const detailsSelectArr = [
    {
        title: "Select Vehicle Make",
        key: "make"
    },
    {
        title: "Select Vehicle Model",
        key: "model"
    },
    {
        title: "Select Vehicle Variant",
        key: "variant"
    },
]

const VehicleDetailSelectModal = ({ onClose = () => { }, vehicleType = "MotorBike", onDetailSelect, selected, activeIndex = 0 }) => {
    // const [title, setTitle] = useState(titlesObj.make);
    const [activeType, setActiveType] = useState(activeIndex);
    const [makeArr, setMakeArr] = useState([]);
    const [modelArr, setModelArr] = useState([]);
    const [variantArr, setVariantArr] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(selected ? selected : { make: null, model: null, variant: null });
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true)
        getMotorMakeAction(vehicleType).then(res => {
            setLoad(false);
            if (res?.status) {
                setMakeArr(res?.data);
            }
            if (selectedDetail?.make) {
                let body = {
                    "make": selectedDetail.make,
                    "Vehicle_Type": vehicleType
                }
                getMotorModelAction(body).then(res => {
                    if (res?.status) {
                        setModelArr(res?.data);
                    }
                    if (selectedDetail?.model) {
                        let body = {
                            "make": selectedDetail.make,
                            "model": selectedDetail.model,
                            "Vehicle_Type": vehicleType
                        }
                        getMotorVariantAction(body).then(res => {
                            if (res?.status) {
                                setVariantArr(res.data);
                            }

                        });
                    }
                });
            }
        });
    }, []);

    const continuePress = () => {
        const newIndex = activeType + 1;
        AppConst.showConsoleLog("--- ", activeType);
        if ((activeType == 0 && !selectedDetail?.make)) {
            return;
        }
        if ((activeType == 1 && !selectedDetail?.model)) {
            return;
        }
        if ((activeType == 2 && !selectedDetail?.variant)) {
            return;
        }
        if (newIndex >= detailsSelectArr.length) {
            onDetailSelect({ ...selectedDetail });
            return;
        }
        setActiveType(newIndex);
    }


    const onMakeSelect = (make) => {
        setSelectedDetail({ ...selectedDetail, make });
        setActiveType(activeType + 1);
        let body = {
            "make": make,
            "Vehicle_Type": vehicleType
        }
        setLoad(true)
        getMotorModelAction(body).then(res => {
            setLoad(false)
            if (res?.status) {
                setModelArr(res?.data);
            }
        })
    }

    const onModelSelect = (model) => {
        setActiveType(activeType + 1);
        setSelectedDetail({ ...selectedDetail, model });
        let body = {
            "make": selectedDetail.make,
            "model": model,
            "Vehicle_Type": vehicleType
        }
        setLoad(true);
        getMotorVariantAction(body).then(res => {
            setLoad(false)
            if (res?.status) {
                setVariantArr(res.data);
            }
        })
    }

    const onVariantSelect = (variant) => {
        setSelectedDetail({ ...selectedDetail, variant });
        onDetailSelect({ ...selectedDetail, variant });
    }

    const onItemPress = (selected) => {
        if (activeType == 0) {
            onMakeSelect(selected)
        } else if (activeType == 1) {
            onModelSelect(selected)
        } else {
            onVariantSelect(selected)
        }
    }

    const onPrevious = () => {
        const newIndex = activeType - 1;
        if (activeType == 0) {
            return;
        }
        setActiveType(newIndex);
    }

    return (
        <Modal
            visible
            transparent
            onRequestClose={() => onClose()}
            animationType="slide"
        >
            <View style={styles.cont}>
                <View style={styles.modalCont}>
                    <ModalTitleHeader
                        title={"Vehicle Details"}
                        onPress={onClose}
                    />
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: "center", marginVertical: 10 }}>
                            <HeadingText
                                text={detailsSelectArr[activeType].title}
                                size={16}
                            />
                            <View style={[flexRow, { marginTop: 10 }]}>
                                {detailsSelectArr.map((item, index) => {
                                    return (
                                        <View
                                            key={String(index)}
                                            style={{ height: 7, width: 7, borderRadius: 10, backgroundColor: item.key == detailsSelectArr[activeType].key ? colors.primary : colors.grey, marginHorizontal: 5 }}
                                        />
                                    )
                                })}
                            </View>
                        </View>

                        <View style={{ flex: 1, backgroundColor: colors.off_white }}>
                            <ScrollView style={{ flex: 1 }}>
                                <ListContainer
                                    list={activeType == 0 ? makeArr : activeType == 1 ? modelArr : variantArr}
                                    activeType={detailsSelectArr[activeType].key}
                                    selectedDetail={selectedDetail[detailsSelectArr[activeType].key]}
                                    onItemPress={onItemPress}
                                />
                            </ScrollView>
                        </View>
                    </View>
                    <View style={activeType > 0 ? { ...flexRow, justifyContent: "space-between", marginHorizontal: 10 } : {}}>
                        {activeType > 0 &&
                            <TouchableOpacity activeOpacity={0.8} onPress={() => onPrevious()} style={{ height: 50, width: 55, borderRadius: 10, backgroundColor: colors.off_white, ...Center, marginLeft: 10 }}>
                                <AntDesign name='left' size={24} color={colors.primary} />
                            </TouchableOpacity>
                        }
                        <View>
                            <Button
                                title='Continue'
                                onPress={() => continuePress()}
                                style={{}}
                            />
                        </View>
                    </View>
                    {load && <Loader />}
                </View>
            </View>
        </Modal>
    )
}


const cardWidth = ((width - 100) / 2);
const ActiveListView = ({ item, activeType, selected, onItemPress }) => {
    switch (activeType) {
        case "make":
            return <FlexWrapListComponent
                // key={String(index)}
                item={item}
                textKey={"Make"}
                onPress={(item) => onItemPress(item.Make)}
                itemWidth={cardWidth}
                // borderWidth={1}
                borderWidth={item.Make == selected ? 1 : 0}
            />
        case "model":
            return <FlexWrapListComponent
                // key={String(index)}
                item={item}
                textKey={"Model"}
                onPress={(item) => onItemPress(item.Model)}
                itemWidth={cardWidth}
                borderWidth={item.Model == selected ? 1 : 0}
            />
        case "variant":
            return <FlexWrapListComponent
                // key={String(index)}
                item={item}
                textKey={"Variant"}
                onPress={(item) => onItemPress(item.Variant)}
                itemWidth={((width - 80))}
                borderWidth={item.Variant == selected ? 1 : 0}
            />
        default:
            return null;
    }
}

const ListContainer = ({ list = [], activeType, selectedDetail, onItemPress }) => {
    return (
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: 10 }}>
            {list?.map((item, index) => {
                return (
                    <ActiveListView
                        key={String(index)}
                        item={item}
                        activeType={activeType}
                        selected={selectedDetail}
                        onItemPress={onItemPress}
                    />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: colors.transparent_black,
        padding: 20,
        paddingTop: Platform.OS == "ios" ? 50 : 20
    },
    modalCont: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 20,

    }
})

export default VehicleDetailSelectModal