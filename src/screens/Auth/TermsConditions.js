import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview'
import { CustomBackButton, ModalHeader } from '../../components/CustomFields'
import { goBack } from '../../routes/RootNavigation'
import { Center } from '../../styles/CommonStyling'

const TermsConditions = () => {
    const [loader, setloader] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <ModalHeader title='Terms & Conditions'
                onPress={() => {
                    goBack();
                }} />
            <WebView
                onLoadEnd={() => {
                    setloader(true);

                }}
                source={{ uri: 'https://insurefast.in/tnc' }}
                style={{ flex: 1 }}
            />
            {
                !loader && <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, ...Center }}>
                    <ActivityIndicator size={'large'} color={'black'} />
                </View>
            }
        </View>
    )
}

export default TermsConditions

const styles = StyleSheet.create({})