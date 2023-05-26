import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CustomBackButton } from '../../../components/CustomFields'
import InsurancePlanList from '../../../components/insurance/InsurancePlanList'
import { colors } from '../../../styles/colors'
import { Center, flexRow, screenStyle, width } from '../../../styles/CommonStyling'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import { shadows } from '../../../styles/shadow'
import { AddonSvgIcon, FilterSvgIcon } from '../../../assets/svg/basicSvgs'
import { navigate, popToTop } from '../../../routes/RootNavigation'
import IdvSelectModal from '../../../components/modals/IdvSelectModal'
import { useSelector } from 'react-redux'
import { idvOptions, AccesoriesList, AddOnsList, AdditionalCoversList, policyExpiryArr, newPolicyTypes, commercialVehiclePolicyList } from '../../../constants/OtherConst'
import AntDesign from "react-native-vector-icons/AntDesign";
import DataListSelectModal from '../../../components/modals/DataListSelectModal'
import { AppToastMessage } from '../../../components/custom/SnackBar'
import { dispatchQuickQuote } from '../../../store/actions/PolicyAction'


const QuotationSummaryScreen = ({ navigation, route }) => {
    const vehicleData = useSelector(state => state.motor.apiRequestQQ);
    const prevClaimMade = route?.params?.previosClaimMade;
    const recentQuote = route?.params?.recentQuote;
    const [addonsModal, setaddonsModal] = useState(null);
    const [showModal, setshowModal] = useState(null);

    useEffect(() => {
        if (recentQuote) {
            dispatchQuickQuote("MakeName", recentQuote?.vehicle_make);
            dispatchQuickQuote("ModelName", recentQuote?.vehicle_model);
            dispatchQuickQuote("FuelType", recentQuote?.fuel_type);
            dispatchQuickQuote("VariantName", recentQuote?.vehicle_variant);
            dispatchQuickQuote("RegistrationNumber", recentQuote?.vehicle_no);
            dispatchQuickQuote("RegistrationDate", recentQuote?.registration_date);
            dispatchQuickQuote("ManufaturingDate", recentQuote?.vehicle_mfg_yr);

            navigation.setOptions({
                headerTitle: `${recentQuote?.vehicle_make},  ${recentQuote?.vehicle_model} ${recentQuote?.vehicle_variant} -2 ${recentQuote?.vehicle_mfg_yr}`,
                headerLeft: () => <CustomBackButton style={{ marginLeft: 20 }} onPress={() => popToTop()} />,
                headerRight: () => <AntDesign name='edit' color={colors.white} size={22} style={{ marginRight: 20 }} onPress={() => navigate('editVehicleDetails', { recentQuote, fromRecent: true })} />,
            })
        } else {
            navigation.setOptions({
                headerTitle: `${vehicleData?.MakeName},  ${vehicleData?.ModelName} ${vehicleData?.VariantName} -2 ${vehicleData?.RegistrationYear}`,
                headerLeft: () => <CustomBackButton style={{ marginLeft: 20 }} onPress={() => popToTop()} />,
                headerRight: () => <AntDesign name='edit' color={colors.white} size={22} style={{ marginRight: 20 }} onPress={() => navigate('editVehicleDetails')} />,
            })
        }

    }, [navigation]);

    return (
        <View style={[screenStyle, { backgroundColor: colors.off_white }]}>
            {/* <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} /> */}
            <SafeAreaView style={{ flex: 1 }} >
                <ScrollView style={{ flex: 1 }}>
                    {/* <CustomBackButton style={{ margin: 20, marginTop: 10 }} /> */}
                    <View style={{ flex: 1 }}>
                        <CarDetails setshowModal={setshowModal} showModal={showModal} setaddonsModal={setaddonsModal} addonsModal={addonsModal} prevClaimMade={prevClaimMade} recentQuote={recentQuote} />
                        <AvailablePlans />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <View style={[flexRow, { backgroundColor: colors.white, paddingVertical: 5 }]}>
                <TouchableOpacity style={[styles.bottomSingleV, { borderRightWidth: 0.5 }]} onPress={() => {
                    setaddonsModal(true)
                    setshowModal(true)
                }}>
                    <AddonSvgIcon />
                    <HeadingText
                        text={"Add On"}
                        style={{ left: 5 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomSingleV} >
                    <FilterSvgIcon />
                    <HeadingText
                        text={"Filters"}
                        style={{ left: 7 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const AvailablePlans = () => {

    return (
        <View style={{ flex: 1, paddingVertical: 20, backgroundColor: colors.off_white, zIndex: -1 }}>
            <View style={[styles.header, { marginBottom: 0 }]}>
                <AppText
                    text={`2 of 2 Plans with Personal Accident (PA) Cover`}
                    size={16}
                // style={SemiMediumTextStyle}
                />
                <AppText
                    text='All prices including of GST'
                    style={{ marginTop: 2 }}
                />
            </View>
            <View>
                <InsurancePlanList />
            </View>
        </View>
    )
}

const CarDetails = ({ addonsModal, setaddonsModal, showModal, setshowModal, prevClaimMade, recentQuote }) => {
    const [idvModal, setidvModal] = useState(null);
    const details = useSelector(state => state.motor?.apiRequestQQ);
    // console.log('prev', prevClaimMade);
    const [ncbValueModal, setNcbValueModal] = useState(null);
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [selectedAccessories, setselectedAccessories] = useState([]);
    const [selectedIDV, setselectedIDV] = useState(null);
    const [selectedNCB, setselectedNCB] = useState(null);
    const [policyTypeModal, setpolicyTypeModal] = useState(null);
    const [selectedPolicyType, setselectedPolicyType] = useState(details?.VehicleType == 'Passenger Carrying' || details?.VehicleType == 'Goods Carrying' ? 'comprehensive' : details?.NewPolicyType || recentQuote?.policy_type);

    const vehicleData = useSelector(state => state.motor.apiRequestQQ);

    const detailArr = [
        // CBZ X-Treme Electric Disc Brake(150 cc Petrol)

        {
            text: ` ${vehicleData?.ModelName ? vehicleData?.ModelName : recentQuote?.vehicle_make} ${vehicleData?.VariantName || recentQuote?.vehicle_model} ${vehicleData?.FuelType || recentQuote?.vehicle_variant} (${vehicleData?.VehicleType || recentQuote?.vehicle_mfg_yr})`,
            key: 1,
        },
        {
            text: "Ap-31 Anakapalle",
            key: 2,
        },
        {
            text: "Quotation No: SAD987654NB87612",
            key: 3,
        },
    ]



    return (
        <View style={styles.detailCont}>
            <View style={{ padding: 10, backgroundColor: "#1AA978", borderRadius: 15, marginBottom: 50 }}>
                {detailArr.map((item, index) => {
                    return (
                        <View style={{ marginVertical: 5, ...flexRow }} key={String(index)}>
                            <View style={{ height: 8, width: 8, borderRadius: 5, backgroundColor: colors.white, marginHorizontal: 10 }} />
                            <AppText
                                text={item.text}
                                color={colors.white}
                            />
                        </View>
                    )
                })}
            </View>
            <View style={{ ...flexRow, position: "absolute", bottom: -20, marginHorizontal: 10, zIndex: 1 }}>
                <View style={{ marginHorizontal: 10 }}>
                    <AppText
                        text={"IDV"}
                        color={colors.white}
                        size={14}
                        style={{ marginBottom: 7 }}
                    />
                    <TouchableOpacity style={styles.touchableSelect} onPress={() => {
                        if (!details?.onlyThirdPartyIns) {
                            setshowModal(true);
                            setidvModal(true)
                        } else {
                            AppToastMessage('IDV Not Available for third party insurance')
                        }
                    }}>
                        <AppText
                            text={selectedIDV ? selectedIDV.key : "Select"}
                            color={colors.grey}
                            style={{ flex: 1 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 5 }}>
                    <AppText
                        text={"Eligible NCB"}
                        color={colors.white}
                        size={14}
                        style={{ marginBottom: 7 }}
                    />
                    <TouchableOpacity style={styles.touchableSelect}
                        onPress={() => {
                            if (!prevClaimMade && !details?.IsVehicleNew && !details?.onlyThirdPartyIns) {
                                setNcbValueModal(true)
                                setshowModal(true)
                                return
                            }
                            AppToastMessage('NCB Not Available');
                        }}
                    >
                        <AppText
                            text={details?.IsVehicleNew || details?.onlyThirdPartyIns || prevClaimMade ? '0%' : selectedNCB ? selectedNCB + '%' : 'Select'}
                            color={colors.grey}
                            style={{ flex: 1 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                    <AppText
                        text={"Policy Type"}
                        color={colors.white}
                        size={14}
                        style={{ marginBottom: 7 }}
                    />
                    <TouchableOpacity style={styles.touchableSelect} onPress={() => {
                        if (details?.NewPolicyType == 'StandAlone OD') {
                            return;
                        }
                        if ((details?.VehicleType != 'Passenger Carrying' || details?.VehicleType != 'Goods Carrying') && !details?.onlyThirdPartyIns) {
                            let obj = newPolicyTypes.filter(i => i.key != "own_damage");
                            setpolicyTypeModal(obj);
                            return;
                        } else {
                            setpolicyTypeModal(commercialVehiclePolicyList);
                            return;
                        }

                        setpolicyTypeModal(newPolicyTypes);
                    }}>
                        <AppText
                            text={selectedPolicyType ? selectedPolicyType : 'Select'}
                            color={colors.grey}
                            style={{ flex: 1 }}
                        />
                    </TouchableOpacity>


                    {showModal && <IdvSelectModal
                        list={idvModal ? idvOptions : !vehicleData?.onlyThirdPartyIns ? AddOnsList : null}
                        accList={!vehicleData?.onlyThirdPartyIns ? AccesoriesList : null}
                        addCoversList={AdditionalCoversList}
                        textKey={idvModal ? 'IDV' : addonsModal ? 'Addons' : 'NCB'}
                        onClose={() => {
                            setidvModal(false)
                            setaddonsModal(false)
                            setNcbValueModal(false);
                            setshowModal(false);
                        }}
                        title={idvModal ? 'Select Your IDV' : addonsModal ? 'Select Addons & Accessories' : 'Confirm NCB Value'}
                        selectedAddons={selectedAddons}
                        onAddonsSelect={item => {
                            setSelectedAddons(item)
                            // setidvModal(false)
                        }}
                        selectedAccessories={selectedAccessories}
                        onAccSelect={item => {
                            setselectedAccessories(item)
                            // setidvModal(false)
                        }}
                        selectedIDV={selectedIDV}
                        setselectedIDV={setselectedIDV}
                        selectedNCB={selectedNCB}
                        setselectedNCB={setselectedNCB}
                        idvOptions={idvOptions}
                    />}

                    {
                        policyTypeModal && <DataListSelectModal
                            list={policyTypeModal}
                            onItemSelect={(item) => {
                                if (item.key === 'ThirdParty') {
                                    dispatchQuickQuote("onlyThirdPartyIns", true);
                                } else {
                                    dispatchQuickQuote("onlyThirdPartyIns", false);
                                }
                                setselectedPolicyType(item.key)
                                setpolicyTypeModal(false)

                            }}
                            onClose={() => {
                                setpolicyTypeModal(false)
                            }}
                        />
                    }

                </View>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    header: {
        padding: 25,
        marginBottom: 20
    },
    detailCont: {
        paddingHorizontal: 20,
        backgroundColor: colors.primary
    },
    detailSub: {
        height: 45,
        justifyContent: "space-between"
    },
    detailRowSub: {
        height: 45,
        justifyContent: "space-between",
        width: "48%"
    },
    detailRowView: {
        ...flexRow,
        justifyContent: "space-between",
        marginVertical: 10
    },
    modifyBtn: {
        width: "48%",
        height: 45,
        backgroundColor: colors.primary,
        ...Center,
        borderRadius: 10,
    },
    touchableSelect: {
        height: 35,
        width: (width - 70) / 3,
        ...Center,
        ...flexRow,
        backgroundColor: colors.white,
        borderRadius: 10,
        ...shadows[0],
        paddingHorizontal: 10
    },
    bottomSingleV: {
        height: 50,
        width: "50%",
        backgroundColor: colors.white,
        ...Center,
        borderColor: colors.grey,
        ...flexRow
    }
})

export default QuotationSummaryScreen