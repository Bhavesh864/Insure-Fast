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

const MedicalHistoryScreen = () => {
    const [showModal, setshowModal] = useState(null);
    const [selectedMedicalProcedure, setselectedMedicalProcedure] = useState([]);

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
                    return <CheckBoxCard key={index} item={item} showModal={showModal} setshowModal={setshowModal} selectedMedicalProcedure={selectedMedicalProcedure} setselectedMedicalProcedure={setselectedMedicalProcedure} />
                })}
            </View>

            {selectedMedicalProcedure.length != 0 && <View style={{ margin: 20, justifyContent: 'flex-end' }}>
                <Button
                    title='Continue'
                    onPress={() => {
                        if (selectedMedicalProcedure) {
                            navigate("healthQuotations")
                        }
                    }}
                />
            </View>}

            {showModal &&
                <DataListSelectModal
                    title='Select all that apply'
                    list={diseasesArr}
                    multipleSelect={true}
                    onClose={() => { setshowModal(false) }}
                />}
        </View>

    )
}

export default MedicalHistoryScreen

const styles = StyleSheet.create({

})