import { PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { sendQuotation } from '../../store/actions/PolicyAction'
import { WebView } from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../../styles/colors';
import { navigate } from '../../routes/RootNavigation';
import RNHTMLToPdf from 'react-native-html-to-pdf'
// import RNFetchBlob from 'react-native-fetch-blob';
import RNFetchBlob from 'rn-fetch-blob';
import { Center } from '../../styles/CommonStyling';

const WebviewQuatationScreen = ({ navigation }) => {
    const [quotationHtml, setquotationHtml] = useState(null);

    const isPermitted = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs access to Storage data',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                alert('Write permission err', err);
                return false;
            }
        } else {
            return true;
        }
    };

    const generatePdf = async () => {
        if (await isPermitted()) {
            const options = {
                html: quotationHtml ? quotationHtml : '<h1>Heading</h1>',
                fileName: "test",
                directory: './data/',
                base64: true
            }
            const randomNum = Math.floor(Math.random() * 999999);

            const file = await RNHTMLToPdf.convert(options);

            // let filePath = RNFetchBlob.fs.dirs.DownloadDir + "/test.pdf"
            let filePath = RNFetchBlob.fs.dirs.DownloadDir + `/Premium_Q${randomNum}.pdf`

            RNFetchBlob.fs
                .writeFile(filePath, file.base64, 'base64')
                .then(res => {
                    console.log(res);
                    alert('File Downloaded');
                })
                .catch(err => {
                    console.log('rnfetchlob err--> ', err);
                });
            console.log(file.filePath);

            // const { dirs } = RNFetchBlob.fs;
            // RNFetchBlob.config({
            //     fileCache: true,
            //     addAndroidDownloads: {
            //         useDownloadManager: true,
            //         notification: true,
            //         mediaScannable: true,
            //         title: `test.pdf`,
            //         path: `${dirs.DownloadDir}/test.pdf`,
            //     },
            // })
            //     .fetch('GET', 'http://www.africau.edu/images/default/sample.pdf', {})
            //     .then((res) => {
            //         console.log('The file saved to ', res.path());
            //     })
            //     .catch((e) => {
            //         console.log(e)
            //     });

            // console.log(file.filePath);
        }
    }

    useEffect(() => {
        sendQuotation().then(res => {
            console.log('hello', res);
            setquotationHtml(res)
        });
        // generatePdf()
        navigation.setOptions({
            // headerTitle: `${vehicleData?.MakeName},  ${vehicleData?.ModelName} ${vehicleData?.VariantName} -2 ${vehicleData?.RegistrationYear}`,
            // headerLeft: () => <CustomBackButton style={{ marginLeft: 20 }} onPress={() => popToTop()} />,
            headerRight: () =>
                <TouchableOpacity onPress={() => generatePdf()} style={{ height: 50, width: 60, ...Center }}>
                    <AntDesign name='download' color={colors.white} size={24} style={{ marginRight: 20 }} onPress={() => generatePdf()} />
                </TouchableOpacity>
            ,
        })

    }, [])

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <WebView
                source={{ html: quotationHtml ? quotationHtml : '' }}
                style={{ marginTop: 20 }}
            />
        </View>
    )
}

export default WebviewQuatationScreen

const styles = StyleSheet.create({})