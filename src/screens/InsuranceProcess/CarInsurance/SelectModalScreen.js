import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import { pop, navigate } from '../../../routes/RootNavigation';
import { Center, flexRow, screenStyle, width } from '../../../styles/CommonStyling';
import { AppText, HeadingText } from '../../../Utility/TextUtility';
import { Button, InputField } from '../../../components/CustomFields';
import { hondaCarModals } from '../../../constants/OtherConst';
import { colors } from '../../../styles/colors';
import { dispatchQuickQuote, getMotorModelAction } from '../../../store/actions/PolicyAction';
import FlexWrapListComponent from '../../../components/insurance/FlexWrapListComponent';
import { useSelector } from 'react-redux';
import { AppToastMessage } from '../../../components/custom/SnackBar';

const cardWidth = ((width - 80) / 2);

const SelectModalScreen = ({ route }) => {
    const isEdit = route?.params?.isEdit;
    const carBrand = route.params?.make;
    const insuranceType = route?.params?.insuranceType;
    const [selectedModel, setSelectedModel] = useState(null);
    const [allModels, setAllModels] = useState([]);
    const [searchResult, setSearchResult] = useState(null);
    const [search, setSearch] = useState("");
    const vehicleData = useSelector(state => state.motor.apiRequestQQ);



    useEffect(() => {
        let body = {
            "make": isEdit ? vehicleData?.MakeName : carBrand,
            "Vehicle_Type": isEdit ? vehicleData?.vehicleType : insuranceType?.vehicleType
        }
        getMotorModelAction(body).then(res => {
            if (res?.status) {
                setAllModels(res?.data);
            }
        })
    }, []);

    const onNext = () => {
        if (!selectedModel) {
            return
        }
        dispatchQuickQuote("ModelName", selectedModel);
        navigate("carVariantScreen", { make: carBrand, model: selectedModel, insuranceType });
    }

    const onModelPress = (key) => {
        dispatchQuickQuote("ModelName", key);
        setSelectedModel(key)
        if (!isEdit) {
            // navigate("carVariantScreen", { make: carBrand, model: key, insuranceType });
        } else {
            pop();
            AppToastMessage('Model updated successfully!')
        }
    }

    const onSearch = (text) => {
        setSearch(text)
        if (text) {
            let body = {
                "make": carBrand,
                "Vehicle_Type": insuranceType?.vehicleType,
                "model": text
            }
            getMotorModelAction(body, true).then(res => {
                // AppConst.showConsoleLog("search res: ", res)
                if (res?.status) {
                    setSearchResult(res?.data);
                }
            })
        }
    }

    return (
        <View style={[screenStyle, { backgroundColor: colors.off_white }]}>

            <InputField
                placeholder='Search modal'
                isSearch={true}
                style={{ marginTop: 20 }}
                value={search}
                onTextChange={onSearch}
                leftIcon={search ? <AntDesign
                    name="close"
                    size={22}
                    color={colors.black}
                    onPress={() => {
                        setSearch("")
                        setSearchResult(null);
                    }}
                /> : null}
            />
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: 10 }}>
                        {((search && searchResult) ? searchResult : allModels)?.map((item, index) => {
                            return (
                                // <TouchableOpacity
                                //     key={String(index)}
                                //     style={{ height: 50, width: cardWidth, backgroundColor: colors.white, margin: 10, ...Center, borderRadius: 10, borderColor: colors.primary, borderWidth: item.Model == selectedModel ? 1 : 0 }}
                                //     onPress={() => onModelPress(item.Model)}
                                // >
                                //     <AppText
                                //         text={item.Model}
                                //     />
                                // </TouchableOpacity>
                                <FlexWrapListComponent
                                    key={String(index)}
                                    item={item}
                                    textKey={"Model"}
                                    onPress={(item) => onModelPress(item.Model)}
                                    borderWidth={item.Model == selectedModel ? 2 : 0}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <View style={{ margin: 20, }}>
                <View style={{}}>
                    <Button
                        title='Next'
                        onPress={onNext}
                    />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({});

export default SelectModalScreen