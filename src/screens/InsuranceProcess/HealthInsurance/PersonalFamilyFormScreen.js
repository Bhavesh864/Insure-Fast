import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import { HeadingText } from '../../../Utility/TextUtility'
import TimelineComponent from '../../../components/custom/TimelineComponent'
import { Button, TouchableTextView } from '../../../components/CustomFields'
import { screenStyle } from '../../../styles/CommonStyling'
import { navigate } from '../../../routes/RootNavigation'
import { AppConst } from '../../../constants/AppConst'
import NumberListPositionModal from '../../../components/modals/NumberListPositionModal'
import { getAdultAgeArr, getChildAgeArr } from '../../../constants/OtherConst'
import { colors } from '../../../styles/colors';
import { AppToastMessage } from '../../../components/custom/SnackBar';
import { dispatchHealthQuickQuote } from '../../../store/actions/HealthPolicyAction';


const PersonalFamilyFormScreen = ({ route }) => {
    const { insuranceFor, sonNum, daughterNum } = route.params;
    const [insuranceMembers, setInsuranceMembers] = useState([]);
    const [modalConfig, setModalConfig] = useState(false);


    useEffect(() => {
        let arr = []
        for (let i = 0; i < insuranceFor.length; i++) {
            const el = insuranceFor[i];
            const obj = {
                key: el,
                value: null,
                title: getLabel(el)
            }
            if (el != "son" && el != "daughter") {
                arr = [...arr, obj]
            }
        }
        for (let i = 1; i <= sonNum; i++) {
            const obj = {
                key: `son_${i}`,
                value: null,
                title: `Son ${i} Age`
            }
            arr = [...arr, obj]
        }
        for (let i = 1; i <= daughterNum; i++) {
            const obj = {
                key: `daughter_${i}`,
                value: null,
                title: `Daughter ${i} Age`
            }
            arr = [...arr, obj]
        }
        setInsuranceMembers(arr);
    }, []);




    const getLabel = (key) => {
        switch (key) {
            case "self":
                return "Your Age";
            case "spouse":
                return "Spouse Age"
            case "father":
                return "Father Age"
            case "mother":
                return "Mother Age"
            case "grandFather":
                return "Grand father Age"
            case "grandMather":
                return "Grand Mother Age"
            case "fatherInLaw":
                return "Father-in-law Age"
            case "motherInLaw":
                return "Mother-in-law Age"
            default:
                return key + " age";
        }
    }

    const onItemPress = (item, index, position) => {
        const minAge = item.key?.includes("grand") ? 54 : (item.key?.includes("father") || item.key?.includes("mother")) ? 40 : 18
        let ageArr = (item.key?.includes("son") || item.key?.includes("daughter")) ? getChildAgeArr() : getAdultAgeArr(minAge);
        setModalConfig({
            position,
            options: ageArr,
            key: item.key,
            index
        });
    }

    const onContinue = () => {
        const selfAge = getItemArr("self")[0] //insuranceFor.includes("self") ? insuranceMembers.filter(i => i.key == "self")[0].value : null;
        const spouseAge = getItemArr("spouse")[0] //insuranceFor.includes("spouse") ? insuranceMembers.filter(i => i.key == "spouse")[0].value : null;
        const sonAges = insuranceFor.includes("son") ? insuranceMembers.filter(i => i.key?.includes("son")) : [];
        const daughterAges = insuranceFor.includes("daughter") ? insuranceMembers.filter(i => i.key?.includes("daughter")) : [];
        const checkValidSonAge = sonAges.filter((i) => ((selfAge?.value - i?.value) < 18));
        const checkValidDaughterAge = daughterAges.filter((i) => ((selfAge?.value && spouseAge?.value - i?.value) < 18));

        // AppConst.showConsoleLog("self: ", selfAge);
        // AppConst.showConsoleLog("spouseAge: ", spouseAge);
        // AppConst.showConsoleLog("sonAges: ", sonAges);
        // AppConst.showConsoleLog("daughterAges: ", daughterAges);
        // AppConst.showConsoleLog("checkValidSonAge: ", checkValidSonAge);


        if (sonAges?.length > 0 && checkValidSonAge?.length > 0) {
            AppToastMessage("Self/Spouse and Son age gap should be 18 years or above");
            return;
        }
        if (daughterAges?.length > 0 && checkValidDaughterAge?.length > 0) {
            AppToastMessage("Self/Spouse and Daughter age gap should be 18 years or above");
            return;
        }



        let isAge = false;
        for (let i = 0; i < insuranceMembers.length; i++) {
            if (insuranceMembers[i].value == null) {
                isAge = false;
            } else {
                isAge = true;
            }
        }

        let insuredMemberDetail = [];
        if (isAge) {
            for (let i = 0; i < insuranceMembers.length; i++) {
                insuredMemberDetail = [...insuredMemberDetail, {
                    'insurer_relation': insuranceFor[i],
                    'insured_age': insuranceMembers[i].value,
                    'customerId': AppConst.customerId,
                }]
            }

            dispatchHealthQuickQuote('Family', insuredMemberDetail);
            navigate("locationSelect")
        } else {
            AppToastMessage('Age is required!')
        }
    }

    const getItemArr = (key) => {
        const arr = insuranceFor.includes(key) ? insuranceMembers.filter(i => i.key == key) : null;
        return arr?.length > 0 ? arr : [null]
    }
    // AppConst.showConsoleLog("-- ", getChildAgeArr())
    return (
        <View style={screenStyle}>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ paddingVertical: 20 }}>
                        <TimelineComponent
                            doneIndex={2}
                        />
                    </View>
                    <HeadingText
                        text={"How old is each member?"}
                        size={16}
                        style={{ paddingHorizontal: 20, marginBottom: 20 }}
                    />

                    {insuranceMembers?.map((item, index) => {
                        return (
                            <View key={String(index)}>
                                <TouchableTextView
                                    placeholder={"Age"}
                                    value={item.value}
                                    style={{ marginBottom: 10 }}
                                    label={item.title}
                                    leftIcon={<AntDesign name='down' color={colors.grey} size={20} />}
                                    onPress={(event) => onItemPress(item, index, event.nativeEvent.pageY - event.nativeEvent.locationY)}
                                />
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View style={{ margin: 20 }}>
                <Button
                    title='Continue'
                    onPress={() => onContinue()}
                />
            </View>
            {modalConfig &&
                <NumberListPositionModal
                    close={() => setModalConfig(false)}
                    position={modalConfig?.position}
                    options={modalConfig?.options}
                    titleKey={"title"}
                    optionPress={item => {
                        let ind = modalConfig.index;
                        let arr = insuranceMembers;
                        let obj = insuranceMembers[ind];
                        obj["value"] = item.key
                        arr[ind] = obj;
                        AppConst.showConsoleLog("arr: ", arr);
                        setInsuranceMembers(arr);
                        setModalConfig(false);
                    }}
                />
            }
        </View>
    )
}


const styles = StyleSheet.create({})

export default PersonalFamilyFormScreen