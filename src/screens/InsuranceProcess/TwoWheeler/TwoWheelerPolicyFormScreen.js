import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { height, screenStyle } from '../../../styles/CommonStyling'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import { Button, TouchableTextView } from '../../../components/CustomFields'
import { getAllRtoCodesAction } from '../../../store/actions/PolicyAction'
import { AppConst } from '../../../constants/AppConst'
import ListShowModal from '../../../components/modals/ListShowModal'
import VehicleDetailSelectModal from '../../../components/insurance/motor/VehicleDetailSelectModal'
import { AppToastMessage } from '../../../components/custom/SnackBar'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { newPolicyTypes, ownershipTypesArr } from '../../../constants/OtherConst'


const TwoWheelerPolicyFormScreen = ({ route }) => {
    const isNew = route.params?.isNew;
    const [allRtoCode, setAllRtoCode] = useState([]);
    const [limitRtoCodes, setLimitRtoCode] = useState([]);
    const [listModal, setListModal] = useState(false);
    const [selectedRtoCode, setSelectedRtoCode] = useState(null);
    const [detailModel, setDetailModel] = useState(false);
    const [dateModal, setDateModal] = useState(false);
    const [vehicleDetail, setVehicleDetail] = useState({ make: null, model: null, variant: null });
    const [regDate, setRegDate] = useState(null);
    const [newPolicyDetail, setNewPolicyDetail] = useState({ policyType: null, mfgDate: null, ownership: null });
    const [previousPolicyDetail, setPreviousPolicyDetail] = useState({ policyDate: null })

    useEffect(() => {
        getAllRtoCodesAction().then(res => {
            AppConst.showConsoleLog("res:", res);
            if (res?.status) {
                const filtered = res?.data?.filter(function (item) {
                    if (this.count < 10 && item) {
                        this.count++;
                        return true;
                    }
                    return false;
                }, { count: 0 });
                setLimitRtoCode(filtered);
                setAllRtoCode(res?.data);
            }
        });
    }, []);


    const onContinue = () => {

    }

    const searchRtoCodes = (text) => {
        let arr = allRtoCode?.filter(function (item) {
            if ((item.RTO_Code?.toLowerCase().includes(text.toLowerCase()) || item?.registered_city_name?.toLowerCase().includes(text.toLowerCase())) && this.count < 20) {
                this.count++;
                return true;
            }
            return false;
        }, { count: 0 });
        setLimitRtoCode(arr);
        setListModal({ ...listModal, list: arr });
    }
    AppConst.showConsoleLog("rto: ", selectedRtoCode);
    return (
        <View style={screenStyle}>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <HeadingText
                        text={"Your two wheeler details"}
                        size={16}
                        style={{ margin: 20 }}
                    />
                    <TouchableTextView
                        label={"City/RTO"}
                        placeholder={"Select your RTO Code"}
                        onPress={() => setListModal({ type: "rtoCode", title: "Select your City/RTO Code", list: limitRtoCodes, selected: selectedRtoCode?.RTO_Code, textKey: "RTO_Code", selectedKey: "RTO_Code" })}
                        value={selectedRtoCode ? `${selectedRtoCode.registered_city_name} ( ${selectedRtoCode?.RTO_Code} )` : null}
                    />
                    {/* <TouchableTextView
                        label={"Make/Model/Variant"}
                        value={(vehicleDetail?.make && vehicleDetail?.model && vehicleDetail?.variant) ? `${vehicleDetail?.make + ", " + vehicleDetail?.model + ", " + vehicleDetail?.variant}` : null}
                        placeholder={"Select your vehicle"}
                        onPress={() => setDetailModel(true)}
                    /> */}
                    <TouchableTextView
                        label={"Make"}
                        value={vehicleDetail?.make}
                        placeholder={"Select your vehicle brand"}
                        onPress={() => setDetailModel({ index: 0 })}
                    />
                    <TouchableTextView
                        label={"Model"}
                        value={vehicleDetail?.model}
                        placeholder={"Select your vehicle model"}
                        onPress={() => vehicleDetail?.make ? setDetailModel({ index: 1 }) : AppToastMessage("Select vehicle make first")}
                    />
                    <TouchableTextView
                        label={"Variant"}
                        value={vehicleDetail?.variant}
                        placeholder={"Select your vehicle variant"}
                        onPress={() => (vehicleDetail?.make && vehicleDetail?.model) ? setDetailModel({ index: 2 }) : AppToastMessage("Select vehicle model first")}
                    />
                    <TouchableTextView
                        label={"Registration Date"}
                        placeholder={"Select vehicle registration date"}
                        value={regDate}
                        onPress={() => setDateModal({ type: "reg" })}
                    />


                    {!isNew &&
                        <View>
                            <HeadingText
                                text={"Previous Policy details"}
                                size={16}
                                style={{ margin: 20, marginTop: 10 }}
                            />
                            <TouchableTextView
                                label={"Policy type"}
                                placeholder={"Select your vehicle policy type"}
                            />
                            <TouchableTextView
                                label={"Policy Expiry Type"}
                                placeholder={"Select expiry type"}
                            />
                            <TouchableTextView
                                label={"Policy Expiry Date"}
                                placeholder={"Select your vehicle policy expiry date"}
                            />
                            <TouchableTextView
                                label={"Policy Insurer"}
                                placeholder={"Select previous policy insurer"}
                            />
                            <TouchableTextView
                                label={"Previous Policy No Claim Bonus (NCB)"}
                                placeholder={"Select previous policy NCB"}
                            />
                            <TouchableTextView
                                label={"Claim made in expiring policy"}
                                placeholder={"Select claim made"}
                            />
                        </View>
                    }

                    <HeadingText
                        text={"New Policy details"}
                        size={16}
                        style={{ margin: 20, marginTop: 10 }}
                    />
                    <TouchableTextView
                        label={"Policy type"}
                        placeholder={"Select your vehicle policy type"}
                        value={newPolicyDetail?.policyType?.title}
                        onPress={() => setListModal({ type: "policyType", title: "Select Policy Type", list: newPolicyTypes, selected: newPolicyDetail?.policyType?.key, selectedKey: "key" })}
                    />
                    <TouchableTextView
                        label={"Manufacturer Date"}
                        placeholder={"Select vehicle manufacturer date"}
                        value={newPolicyDetail?.mfgDate}
                        onPress={() => setDateModal({ type: "mfg" })}
                    />
                    <TouchableTextView
                        label={"Vehicle Owned By"}
                        placeholder={"Select vehicle ownership"}
                        value={newPolicyDetail?.ownership?.title}
                        onPress={() => setListModal({ type: "ownership", title: "Select Ownership Type", list: ownershipTypesArr, selected: newPolicyDetail?.ownership?.key, selectedKey: "key" })}
                    />
                </ScrollView>
            </View>
            <View style={{ margin: 20 }}>
                <Button
                    title='Continue'
                    onPress={onContinue}
                />
            </View>

            {listModal &&
                <ListShowModal
                    list={listModal?.list}
                    title={listModal?.title}
                    onClose={() => setListModal(false)}
                    textKey={listModal?.textKey}
                    isSearch={listModal.type == "rtoCode"}
                    onSearch={txt => searchRtoCodes(txt)}
                    contStyle={listModal.type == "rtoCode" ? { height: height / 1.5 } : {}}
                    selectedKey={listModal?.selectedKey}
                    selectedItem={listModal?.selected}
                    onItemSelect={item => {
                        if (listModal?.type == "rtoCode") {
                            setSelectedRtoCode(item)
                        } else if (listModal?.type == "policyType") {
                            setNewPolicyDetail({ ...newPolicyDetail, policyType: item });
                        } else if (listModal?.type == "ownership") {
                            setNewPolicyDetail({ ...newPolicyDetail, ownership: item });
                        }
                        setListModal(false);
                    }}
                />
            }

            {detailModel &&
                <VehicleDetailSelectModal
                    onClose={() => setDetailModel(false)}
                    onDetailSelect={(detail) => {
                        setVehicleDetail({ make: detail.make, model: detail.model, variant: detail.variant });
                        setDetailModel(false);
                    }}
                    selected={vehicleDetail}
                    activeIndex={detailModel?.index}
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
                    theme='light'
                    maximumDate={dateModal?.maxDate ? dateModal?.maxDate : new Date()}
                    minimumDate={dateModal?.minDate ? dateModal?.minDate : null}
                    onConfirm={(date) => {
                        // setDate(date)
                        let d = moment(date).format("YYYY-MM-DD") //getAge(date);
                        if (dateModal.type == "mfg") {
                            setNewPolicyDetail({ ...newPolicyDetail, mfgDate: d });
                            // dispatchQuickQuote("ManufaturingDate", d);
                        } else {
                            setRegDate(d);
                            // dispatchQuickQuote("RegistrationDate", d);
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

export default TwoWheelerPolicyFormScreen