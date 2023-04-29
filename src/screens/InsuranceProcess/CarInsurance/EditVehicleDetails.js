import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableTextView } from '../../../components/CustomFields'
import { useSelector } from 'react-redux';
import { AppText } from '../../../Utility/TextUtility';
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { navigate, push } from '../../../routes/RootNavigation';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { vehicleTypesObj } from '../../../constants/OtherConst';


const EditVehicleDetails = ({ route }) => {
    const vehicleData = useSelector(state => state?.motor?.apiRequestQQ);
    const [mfgDate, setMfgDate] = useState(null);
    const [regDate, setRegDate] = useState(null);
    const [dateModal, setDateModal] = useState(false);
    console.log('vehicletype', vehicleData?.FuelType);
    // console.log('vehibike', vehicleTypesObj?.bike);


    const regSelectPress = () => {
        setDateModal({ type: "reg", minDate: new Date(mfgDate) });
    }

    const mfgSelectPress = () => {
        setDateModal({ type: "mfg" });
    }

    return (
        <ScrollView>
            <AppText text='Vehicle Details' size={16} style={{ margin: 20, textAlign: 'center', fontWeight: 'bold' }} />
            {!vehicleData?.IsVehicleNew ? <TouchableTextView
                placeholder={vehicleData?.RegistrationNumber}
                value={vehicleData?.RegistrationNumber}
                onPress={() => push('carRegistration', { isEdit: true })}
                leftIcon={<AntDesign name='edit' color={colors.black} size={16} />}
            /> : null}
            <TouchableTextView
                label={"Vehicle Brand"}
                placeholder={vehicleData?.MakeName}
                value={vehicleData?.MakeName}
                onPress={() => push('carBrandList', { isEdit: true })}
                leftIcon={<AntDesign name='down' color={colors.black} size={16} />}

            />
            <TouchableTextView
                label={"Vehicle Model"}
                placeholder={"Vehicle Model"}
                value={vehicleData?.ModelName}
                onPress={() => push('carModalScreen', { isEdit: true })}
                leftIcon={<AntDesign name='down' color={colors.black} size={16} />}

            />
            <TouchableTextView
                label={"Vehicle Variant"}
                placeholder={"Select Manufacturer date"}
                value={vehicleData?.VariantName}
                onPress={() => push('carVariantScreen', { isEdit: true })}
                leftIcon={<AntDesign name='down' color={colors.black} size={16} />}

            />
            {vehicleData?.vehicleType != vehicleTypesObj.bike ? <TouchableTextView
                label={"Vehicle fuel type"}
                value={vehicleData?.FuelType}
                onPress={() => push('carVariantScreen', { isEdit: true })}
                leftIcon={<AntDesign name='down' color={colors.black} size={16} />}
            /> : null}

            <AppText text='Policy & registration details' size={16} style={{ margin: 20, textAlign: 'center', fontWeight: 'bold' }} />
            <TouchableTextView
                label={"Mfg. date of Vehicle"}
                placeholder={"Select Manufacturer date"}
                value={mfgDate ? mfgDate : vehicleData?.ManufaturingDate}
                onPress={() => mfgSelectPress()}
                leftIcon={<AntDesign name='calendar' color={colors.black} size={16} />}

            />
            <TouchableTextView
                label={"Reg. date of Vehicle"}
                placeholder={"Select Registration date"}
                value={regDate ? regDate : vehicleData?.RegistrationDate}
                onPress={() => regSelectPress()}
                leftIcon={<AntDesign name='calendar' color={colors.black} size={16} />}

            />
            {!vehicleData?.IsVehicleNew && vehicleData?.PrePolicyEndDate != '' ? <TouchableTextView
                label={"Previous Policy Expiry Date"}
                value={vehicleData?.PrePolicyEndDate}
                onPress={() => setDateModal(true)}
                leftIcon={<AntDesign name='calendar' color={colors.black} size={16} />}
            /> : null}
            {
                dateModal &&
                <DatePicker
                    modal
                    mode="date"
                    open={true}
                    date={new Date()}
                    // androidVariant="iosClone"
                    maximumDate={dateModal?.maxDate ? dateModal?.maxDate : new Date()}
                    minimumDate={dateModal?.minDate ? dateModal?.minDate : null}
                    theme='light'
                    onConfirm={(date) => {
                        // setDate(date)
                        let d = moment(date).format("YYYY-MM-DD") //getAge(date);
                        if (dateModal.type == "mfg") {
                            let rgDate = moment(date).add(1, "month").format("YYYY-MM-DD");
                            // dispatchQuickQuote("ManufaturingDate", date.getFullYear());
                            // dispatchQuickQuote("RegistrationDate", rgDate);
                            setMfgDate(d);

                            setRegDate(rgDate);
                            console.log('d', date.getFullYear());
                        } else {
                            // dispatchQuickQuote("RegistrationDate", d);
                            setRegDate(d);

                        }
                        setDateModal(false);
                    }}
                    onCancel={() => {
                        setDateModal(false)
                    }}
                />
            }
        </ScrollView>
    )
}

export default EditVehicleDetails

const styles = StyleSheet.create({})