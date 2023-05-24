import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import { Center, flexRow, screenStyle, width } from '../../../styles/CommonStyling'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import { healthInsuranceForArr, otherHealthInsuranceForArr } from '../../../constants/OtherConst'
import { Button, Checkbox } from '../../../components/CustomFields'
import { colors } from '../../../styles/colors'
import { shadows } from '../../../styles/shadow'
import { PersonSvgIcon } from '../../../assets/svg/basicSvgs'
import TimelineComponent from '../../../components/custom/TimelineComponent'
import BottomNumberAskModal from '../../../components/insurance/health/BottomNumberAskModal'
import { navigate } from '../../../routes/RootNavigation'
import { AppConst } from '../../../constants/AppConst'
import { ScrollView } from 'react-native-gesture-handler';
import { AppToastMessage } from '../../../components/custom/SnackBar';
import { dispatchHealthQuickQuote } from '../../../store/actions/HealthPolicyAction';
import { useSelector } from 'react-redux';


const HealthInsuranceForScreen = () => {
    const [childAskModal, setChildAskModal] = useState(false);
    const [insurerArr, setInsurerArr] = useState(healthInsuranceForArr);
    const [forArr, setForArr] = useState(["self"]);
    const [sonNum, setSonNum] = useState(0);
    const [daughterNum, setDaughterNum] = useState(0);
    const [maxNum, setMaxNum] = useState(4);
    const userData = useSelector(state => state.motor?.apiRequestQQ);

    const onItemPress = (key) => {
        if (key == "other") {
            let arr = insurerArr.filter(i => i.key != "other");
            setInsurerArr([...arr, ...otherHealthInsuranceForArr]);
            return;
        }

        console.log('for', forArr);

        if (forArr.includes(key)) {
            setForArr(forArr.filter(i => i != key));
            if (key == "son") {
                let n = maxNum + sonNum;
                setMaxNum(n);
                setSonNum(0);
            }
            if (key == "daughter") {
                let n = maxNum + daughterNum;
                setMaxNum(n);
                setDaughterNum(0);
            }
        } else {
            if (forArr.includes('father') || forArr.includes('mother')) {
                if (key != 'mother' && key != 'father') {
                    AppToastMessage('Cannot select other members with mother/father !')

                } else {
                    setForArr([...forArr, key]);
                    if (key == "son") {
                        // setSonNum(1);
                        let n = daughterNum ? 4 - daughterNum : 4;
                        setMaxNum(n)
                        setChildAskModal({ type: "son" });
                    }
                    if (key == "daughter") {
                        // setDaughterNum(1);
                        let n = sonNum ? 4 - sonNum : 4;
                        setMaxNum(n);
                        setChildAskModal({ type: "daughter" });
                    }
                }
            }
            if (forArr.includes('son') || forArr.includes('daughter') || forArr.includes('spouse') || forArr.includes('self')) {
                if (key != 'son' && key != 'daughter' && key != 'spouse' && key != 'self') {
                    AppToastMessage('Cannot select mother/father with other members!')

                } else {
                    setForArr([...forArr, key]);
                    if (key == "son") {
                        // setSonNum(1);
                        let n = daughterNum ? 4 - daughterNum : 4;
                        setMaxNum(n)
                        setChildAskModal({ type: "son" });
                    }
                    if (key == "daughter") {
                        // setDaughterNum(1);
                        let n = sonNum ? 4 - sonNum : 4;
                        setMaxNum(n);
                        setChildAskModal({ type: "daughter" });
                    }
                }
            }
            if (forArr.length == 0) {
                setForArr([...forArr, key]);
            }
        }

    }

    const onContinuePress = () => {
        if (forArr.length == 0) {
            AppToastMessage('Please select atleast one member');
            return;
        }
        if (forArr.some(i => {
            return i == 'spouse' || i == 'son' || i == 'daughter' || i == 'father' || i == 'mother'
        })) {
            dispatchHealthQuickQuote('CustomerType', 'Family')
        } else {
            dispatchHealthQuickQuote('CustomerType', 'Individual')
        }

        dispatchHealthQuickQuote('ChildCount', sonNum + daughterNum)
        // dispatchHealthQuickQuote('InsuredMembers', sonNum)
        dispatchHealthQuickQuote('SonCount', sonNum)
        dispatchHealthQuickQuote('DaughterCount', daughterNum)
        navigate("personalAndFamilyForm", { insuranceFor: forArr, sonNum, daughterNum });
    }

    AppConst.showConsoleLog("max Num: ", maxNum);

    return (
        <ScrollView style={screenStyle}>
            <View style={{ flex: 1 }}>
                <View style={{ padding: 20 }}>
                    <PersonSvgIcon />
                    <AppText
                        text={`Hey, ${userData?.FirstName || ''}\nLet's find the right \nHealth insurance for you`}
                        style={{ marginTop: 20, lineHeight: 22 }}
                        size={18}
                    />
                </View>
                <View>
                    <TimelineComponent />
                </View>
                <View style={{ padding: 10 }}>
                    <HeadingText
                        text={"Who would you like to insure?"}
                        style={{ margin: 10 }}
                    />
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 10 }}>
                        {insurerArr.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={String(index)}
                                    activeOpacity={0.8}
                                    style={[styles.item, { borderColor: forArr.includes(item.key) ? colors.primary : colors.grey }]}
                                    onPress={() => onItemPress(item.key)}
                                >
                                    {item.key == "other" ?
                                        <AntDesign name="addusergroup" size={23} color={colors.grey} />
                                        :
                                        <Checkbox
                                            value={forArr.includes(item.key)}
                                            onPress={() => onItemPress(item.key)}
                                        />
                                    }
                                    <AppText
                                        text={item.title}
                                        style={{ marginHorizontal: 10, flex: 1 }}
                                    />
                                    {((item.key == "son" && forArr.includes(item.key)) || (item.key == "daughter" && forArr.includes(item.key))) &&
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => setChildAskModal({ type: item.key })}
                                            style={{ height: 22, width: 22, ...Center, borderRadius: 20, backgroundColor: colors.primary }}
                                        >
                                            <AppText
                                                text={item.key == "son" ? sonNum : daughterNum}
                                                style={{}}
                                                color={colors.white}
                                            />
                                        </TouchableOpacity>
                                    }
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </View>
            <View style={{ margin: 20 }}>
                <Button
                    title='Continue'
                    onPress={() => onContinuePress()}
                />
            </View>
            {childAskModal &&
                <BottomNumberAskModal
                    // num={maxNum}
                    title={`How many ${childAskModal?.type} do you have?`}
                    selectedNum={childAskModal?.type == "son" ? sonNum : daughterNum}
                    onClose={() => {
                        if ((childAskModal?.type == "son") && !sonNum) {
                            setForArr(forArr.filter(i => i != "son"));
                        }
                        if ((childAskModal?.type == "daughter") && !daughterNum) {
                            setForArr(forArr.filter(i => i != "daughter"));
                        }
                        setChildAskModal(false)
                    }}
                    onSelect={(num) => {
                        const activeNum = childAskModal?.type == "son" ? sonNum : daughterNum
                        const totalNum = sonNum + daughterNum;
                        const availableNum = childAskModal?.type == "son" ? (4 - daughterNum) : (4 - sonNum);
                        AppConst.showConsoleLog("selected num: ", num)
                        AppConst.showConsoleLog("available num: ", availableNum)
                        if (num == activeNum) {
                            setChildAskModal(false);
                            return;
                        }
                        if ((availableNum < num) && (num > activeNum)) { //(maxNum < num) && num > activeNum
                            return;
                        }
                        const newAvailableNum = 4 - (activeNum + num)  //num < activeNum ? maxNum + num : maxNum - num
                        AppConst.showConsoleLog("new avail num: ", newAvailableNum);
                        if (childAskModal?.type == "son") {
                            setSonNum(num)
                        } else {
                            setDaughterNum(num)
                        }
                        // setMaxNum(newAvailableNum);
                        setChildAskModal(false);
                        // navigate("personalAndFamilyForm");

                    }}
                />
            }
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    item: {
        height: 50,
        width: (width - 60) / 2,
        backgroundColor: colors.white,
        borderRadius: 10,
        marginBottom: 15,
        marginHorizontal: 10,
        ...shadows[0],
        ...flexRow,
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderColor: colors.grey
    }
})

export default HealthInsuranceForScreen