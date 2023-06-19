import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import CheckBoxCard from '../../../components/insurance/health/CheckBoxCard'
import { diseasesArr, medicalHistoryArr } from '../../../constants/OtherConst'
import { useState } from 'react'
import DataListSelectModal from '../../../components/modals/DataListSelectModal'
import { Button } from '../../../components/CustomFields'
import { navigate } from '../../../routes/RootNavigation'
import { height } from '../../../styles/CommonStyling'
import { dispatchHealthQuickQuote, submitHealthPolicyAction } from '../../../store/actions/HealthPolicyAction'
import { useSelector } from 'react-redux'
import { AppConst } from '../../../constants/AppConst'
import { AppToastMessage } from '../../../components/custom/SnackBar'

const MedicalHistoryScreen = () => {
    const [showModal, setshowModal] = useState(null);
    const [selectedMedicalProcedure, setselectedMedicalProcedure] = useState([]);
    const [selectedDiseases, setselectedDiseases] = useState([]);
    const [diseaseObjArr, setdiseaseObjArr] = useState([]);
    const data = useSelector(state => state.health?.apiRequestQQ);


    const onContinuePress = () => {
        const isSurgery = selectedMedicalProcedure.includes(2);
        const isDisease = selectedMedicalProcedure.includes(1);

        dispatchHealthQuickQuote('SurgicalProcedure', isSurgery);
        dispatchHealthQuickQuote('DiseaseSuffered', isDisease);
        dispatchHealthQuickQuote('Diseases', selectedDiseases);

        if (selectedMedicalProcedure) {
            const body = {
                policy_type: data?.CustomerType,
                disease_suffered: isDisease,
                surgical_procedure: isSurgery,
                son_count: data?.SonCount,
                daughter_count: data?.DaughterCount,
                customerId: AppConst.customerId,
                child_count: data?.ChildCount,
                insuredMemberDetail: data?.Family,
                diseasesuffered: diseaseObjArr,
            }

            submitHealthPolicyAction(body).then(res => {
                if (res?.status) {
                    console.log(res);
                    navigate("healthQuotations")

                }
            })
        }
    }

    const addRemoveItemFromList = (item) => {
        if (!selectedMedicalProcedure.includes(item.key)) {
            if (item.key == 3) {
                setselectedMedicalProcedure([3]);
                setselectedDiseases([])
                setdiseaseObjArr([])
                return
            }
            if (!selectedMedicalProcedure.includes(3)) {
                if (item.key == 1) {
                    setshowModal(true);
                }
                setselectedMedicalProcedure([...selectedMedicalProcedure, item.key]);
            } else {
                setselectedMedicalProcedure([item.key]);
                if (item.key == 1) {
                    setshowModal(true)
                }
            }
        } else {
            setselectedMedicalProcedure(
                selectedMedicalProcedure.filter(i => item.key != i),
            );
        }
    }

    return (
        <View >
            <View style={{ height: height - 230 }}>
                <View style={{ margin: 15, alignItems: 'center' }}>
                    <HeadingText
                        text='Do you have an existing illness or medical history?'
                        style={{ paddingVertical: 10, paddingHorizontal: 5 }}
                    />
                    <AppText
                        // style={{ paddingVertical: 10 }}
                        text='This helps us find plans that cover your condition and avoid claim rejection'
                    />
                </View>
                {medicalHistoryArr.map((item, index) => {
                    return <CheckBoxCard key={index} item={item} showModal={showModal} setshowModal={setshowModal} selectedMedicalProcedure={selectedMedicalProcedure} setselectedMedicalProcedure={setselectedMedicalProcedure} addRemoveItemFromList={addRemoveItemFromList} />
                })}
            </View>

            {selectedMedicalProcedure.length != 0 && <View style={{ margin: 20, justifyContent: 'flex-end' }}>
                <Button
                    title='Continue'
                    onPress={() => {
                        onContinuePress()
                    }}
                />
            </View>}

            {showModal &&
                <DataListSelectModal
                    title='Select all that apply'
                    list={diseasesArr}
                    multipleSelect={true}
                    onClose={() => {
                        setshowModal(false)
                        setselectedMedicalProcedure(selectedMedicalProcedure.filter(i => i != 1));
                        setselectedDiseases([]);
                    }}
                    selectedItem={(item) => {
                        if (selectedDiseases.includes({ 'disease': item.title, customerId: AppConst.customerId })) {
                            setselectedDiseases(selectedDiseases.filter(i => i != { 'disease': item.title, customerId: AppConst.customerId }))
                        } else {
                            setselectedDiseases([...selectedDiseases, { 'disease': item.title, customerId: AppConst.customerId }])
                        }
                    }}
                    onSubmit={() => {
                        setshowModal(false)
                        console.log('onSubmit', selectedDiseases)
                        setdiseaseObjArr(selectedDiseases);
                        setselectedDiseases([]);
                    }}
                />}
        </View>

    )
}

export default MedicalHistoryScreen

const styles = StyleSheet.create({

})