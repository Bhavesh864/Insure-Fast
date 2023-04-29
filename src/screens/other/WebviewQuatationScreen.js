import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {sendQuotation} from '../../store/actions/PolicyAction';
import {WebView} from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../styles/colors';
import RNHTMLToPdf from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import {Center} from '../../styles/CommonStyling';

const WebviewQuatationScreen = ({navigation}) => {
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
        fileName: 'test',
        directory: './data/',
        base64: true,
      };
      const randomNum = Math.floor(Math.random() * 999999);
      const file = await RNHTMLToPdf.convert(options);

      let filePath =
        RNFetchBlob.fs.dirs.DownloadDir + `/Premium_Q${randomNum}.pdf`;
      RNFetchBlob.fs
        .writeFile(filePath, file.base64, 'base64')
        .then(res => {
          console.log('res--> ', res);
          alert('File Downloaded');
        })
        .catch(err => {
          console.log('rnfetchlob err--> ', err);
        });

      console.log(file.filePath);
    }
  };

  useEffect(() => {
    sendQuotation().then(res => {
      setquotationHtml(res);
    });
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => generatePdf()}
          style={{height: 50, width: 60, ...Center}}>
          <AntDesign
            name="download"
            color={colors.white}
            size={24}
            style={{marginRight: 20}}
            onPress={() => generatePdf()}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#f2fafc', paddingHorizontal: 10}}>
      <WebView
        showsVerticalScrollIndicator={false}
        source={{html: quotationHtml ? quotationHtml : ''}}
        // style={{marginTop: 20}}
      />
    </View>
  );
};

export default WebviewQuatationScreen;

const styles = StyleSheet.create({});
