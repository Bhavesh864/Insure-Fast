import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { screenStyle } from '../../../styles/CommonStyling'
import { AppText } from '../../../Utility/TextUtility'
import { Button, TouchableTextView } from '../../../components/CustomFields'
import { newPolicyTypes, ownershipTypesArr, pcvGcvPolicyTypes } from '../../../constants/OtherConst'
import ListShowModal from '../../../components/modals/ListShowModal'
import DatePicker from 'react-native-date-picker'
import { AppConst } from '../../../constants/AppConst'
import moment from 'moment'
import { createOnlinePolicyObj, dispatchQuickQuote, fillPolicyDataAction } from '../../../store/actions/PolicyAction'
import { navigate } from '../../../routes/RootNavigation'
import { useSelector } from 'react-redux'
import { AppToastMessage } from '../../../components/custom/SnackBar'


const VehiclePolicyFormScreen = () => {
    const details = useSelector(state => state.motor?.apiRequestQQ);
    // const userProfile = useSelector(state => state.user?.user);
    const [lModal, setLModal] = useState(false);
    const [selectedPolicyType, setSelectedPolicyType] = useState(null)
    const [mfgDate, setMfgDate] = useState(null);
    const [regDate, setRegDate] = useState(null);
    const [ownershipType, setOwnershipType] = useState(null);
    const [dateModal, setDateModal] = useState(false);


    useEffect(() => {
        if (details?.NewPolicyType) {
            let obj = newPolicyTypes.find(i => i.key == details.NewPolicyType);
            setSelectedPolicyType(obj);
        }
        if (details?.RegistrationYear) {
            let regYear = details?.RegistrationYear;
            let currentMonth = moment().format("MM") //new Date().getMonth();
            let d = moment(`${"01" + "-" + currentMonth + "-" + regYear}`, "DD-MM-YYYY").format("YYYY-MM-DD");
            // AppConst.showConsoleLog("--- ", `${"01" + "-" + currentMonth + "-" + regYear}`)
            // AppConst.showConsoleLog("::: ", details?.RegistrationYear, d);
            let rgDate = moment(d, "YYYY-MM-DD").add(1, "month").format("YYYY-MM-DD");
            setMfgDate(regYear);

            setRegDate(rgDate);

            if (details?.IsVehicleNew) {
                if (checkVehicleODType(rgDate)) {
                    let obj = newPolicyTypes.find(i => i.key == "Comprehensive");
                    setSelectedPolicyType(obj)
                }
            }
            else {
                if (checkVehicleODType(rgDate) && details?.VehicleType != 'Passenger Carrying' && details?.VehicleType != 'Goods Carrying') {
                    let obj = newPolicyTypes.find(i => i.key == "own_damage");
                    setSelectedPolicyType(obj)

                } else {
                    let obj = newPolicyTypes.find(i => i.key == "Comprehensive");
                    setSelectedPolicyType(obj)
                }
            }
        }
    }, []);

    const onAction = () => {
        dispatchQuickQuote("RegistrationDate", regDate);
        dispatchQuickQuote("ManufaturingDate", mfgDate);
        if (details?.IsVehicleNew) {
            createPolicy();
        } else {
            if (selectedPolicyType.key == 'ThirdParty') {
                dispatchQuickQuote("onlyThirdPartyIns", true);
            }

            navigate("previousPolicy");
        }
    }

    const createPolicy = () => {
        // dispatchQuickQuote("ManufaturingDate", mfgDate);
        // dispatchQuickQuote("RegistrationDate", regDate);
        // dispatchQuickQuote("NewPolicyType", selectedPolicyType);
        // AppConst.showConsoleLog("vehicle type: ", selectedPolicyType.key == 'ThirdParty');
        if (selectedPolicyType.key == 'ThirdParty') {
            dispatchQuickQuote("onlyThirdPartyIns", true);
        }

        let obj = createOnlinePolicyObj(details);
        AppConst.showConsoleLog("obj: ", obj);
        // return;
        let formData = new FormData();
        for (let key in obj) {
            formData.append(key, obj[key]);
        }
        formData.append("customerId", AppConst.getCustomerId());
        console.log("customerId", AppConst.getCustomerId());

        fillPolicyDataAction(formData).then(res => {
            AppConst.showConsoleLog("fill policy res: ", res);
            if (res?.status) {
                navigate("quotationSummary");
            }
        })
    }

    const regSelectPress = () => {
        if (!mfgDate) {
            AppToastMessage("Please select Manufacturer date first");
            return
        }
        setDateModal({ type: "reg", minDate: new Date(mfgDate) });
    }

    const mfgSelectPress = () => {
        setDateModal({ type: "mfg" });
    }

    const policySelectPress = () => {

        if (details.onlyThirdPartyIns) {
            return;
        }
        if (!regDate) {
            AppToastMessage("Please select registration date first");
            return;
        }
        if (details?.VehicleType != 'Passenger Carrying' && details?.VehicleType != 'Goods Carrying') {
            if (checkVehicleODType(regDate)) {
                return;
            }
        }

        if (details?.IsVehicleNew && (details?.VehicleType == 'Passenger Carrying' || details?.VehicleType == 'Goods Carrying')) {
            return;
        }

        if (details?.VehicleType == 'Passenger Carrying' || details?.VehicleType == 'Goods Carrying' || !checkVehicleODType(regDate)) {
            setLModal({ type: "policyType", title: "Select Policy Type", list: pcvGcvPolicyTypes, selected: selectedPolicyType?.key })
        } else {
            setLModal({ type: "policyType", title: "Select Policy Type", list: newPolicyTypes, selected: selectedPolicyType?.key })
        }
    }

    const checkVehicleODType = (reg) => {
        const threeYr = moment().subtract(3, "years").format("YYYY-MM-DD");
        const fiveYr = moment().subtract(5, "years").format("YYYY-MM-DD");
        const checkDate = details?.VehicleType == "Pvt Car" ? threeYr : fiveYr
        AppConst.showConsoleLog("-- ", threeYr, reg, moment(reg).isBefore(checkDate))
        if (moment(reg).isAfter(checkDate)) {
            return true
        } else {
            return false
        }
    }
    AppConst.showConsoleLog("pl: ", details.VehicleType);
    console.log(details?.VehicleType);
    console.log(selectedPolicyType?.title);

    return (
        <View style={screenStyle}>
            <View style={{ flex: 1 }}>
                <AppText
                    text={"Fill Vehicle and Policy details"}
                    size={18}
                    style={{ padding: 20 }}
                />
                <TouchableTextView
                    label={"Mfg. date of Car"}
                    placeholder={"Select Manufacturer date"}
                    value={mfgDate}
                    onPress={() => mfgSelectPress()}
                />
                <TouchableTextView
                    label={"Reg. date of Car"}
                    placeholder={"Select Registration date"}
                    value={regDate}
                    onPress={() => regSelectPress()}
                />
                {!details.onlyThirdPartyIns &&
                    <TouchableTextView
                        placeholder={"Select Policy type"}
                        label={"New Policy type"}
                        value={selectedPolicyType?.title}
                        onPress={() => policySelectPress()}
                    />
                }
                <TouchableTextView
                    label={"Vehicle Owned By"}
                    placeholder={"Select Ownership"}
                    value={ownershipType?.title}
                    onPress={() => setLModal({ type: "ownership", title: "Select Ownership Type", list: ownershipTypesArr, selected: ownershipType?.key })}
                />
            </View>
            <View style={{ margin: 20 }}>
                <Button
                    title='Get Prefered Quote'
                    onPress={() => onAction()}
                />
            </View>
            {lModal &&
                <ListShowModal
                    onClose={() => setLModal(false)}
                    list={lModal?.list}
                    title={lModal.title}
                    selectedItem={lModal?.selected}
                    onItemSelect={(item) => {
                        if (lModal.type == "policyType") {
                            setSelectedPolicyType(item);
                            dispatchQuickQuote("NewPolicyType", item.key);
                        } else {
                            setOwnershipType(item);
                        }
                        setLModal(false);
                    }}
                />
            }

            {
                dateModal &&
                <DatePicker
                    modal
                    mode="date"
                    open={true}
                    date={new Date()}
                    androidVariant="iosClone"
                    maximumDate={dateModal?.maxDate ? dateModal?.maxDate : new Date()}
                    minimumDate={dateModal?.minDate ? dateModal?.minDate : null}
                    theme='light'
                    onConfirm={(date) => {
                        // setDate(date)
                        let d = moment(date).format("YYYY-MM-DD") //getAge(date);
                        if (dateModal.type == "mfg") {
                            let rgDate = moment(date).add(1, "month").format("YYYY-MM-DD");
                            dispatchQuickQuote("ManufaturingDate", date.getFullYear());
                            dispatchQuickQuote("RegistrationDate", rgDate);
                            setMfgDate(date.getFullYear());

                            setRegDate(rgDate);
                            console.log('d', date.getFullYear());
                        } else {
                            dispatchQuickQuote("RegistrationDate", d);
                            setRegDate(d);
                            if (checkVehicleODType(d)) {
                                let obj = newPolicyTypes.find(i => i.key == "own_damage");
                                setSelectedPolicyType(obj)
                            }
                        }
                        setDateModal(false);
                    }}
                    onCancel={() => {
                        setDateModal(false)
                    }}
                />
            }
        </View>
    )
}


const styles = StyleSheet.create({})

export default VehiclePolicyFormScreen