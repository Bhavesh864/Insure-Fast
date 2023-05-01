import React, { useState } from 'react'
import { ScrollView, StyleSheet, Image, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import { Center, screenStyle } from '../../styles/CommonStyling'
import { Button, InputField } from '../../components/CustomFields'
import { AppText, HeadingText } from '../../Utility/TextUtility'
import { colors } from '../../styles/colors';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { claimRequest } from '../../store/actions/PolicyAction';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppToastMessage } from '../../components/custom/SnackBar';
import { navigate } from '../../routes/RootNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons'


const ClaimFormScreen = ({ navigation }) => {
    // const details = useSelector(state => state.motor?.apiRequestQQ);
    const formData = new FormData();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [number, setnumber] = useState('');
    const [employeeCode, setemployeeCode] = useState('');
    const [productType, setproductType] = useState('');
    const [queryType, setqueryType] = useState('');
    const [description, setdescription] = useState('');
    const [uriString, seturiString] = useState('');
    const [imageName, setimageName] = useState('');
    const [imageList, setimageList] = useState([]);
    const [pathList, setpathList] = useState([]);

    const openImageGallery = async () => {
        const res = await launchImageLibrary();
        if (res.didCancel) {
            return;
        }
        // uri: res.assets[0].uri,

        let data = {
            uri: res.assets[0].uri,
            name: res.assets[0].fileName ? res.assets[0].fileName : 'group_chat.png',
            type: res.assets[0].type,
        }
        setimageList([...imageList, data]);
        setpathList(data)


        // console.log('data', data);
        // console.log('imagelist', imageList)

    }

    const openCamera = async () => {
        const res = await launchCamera();
        if (res.didCancel) {
            return;
        }
        // uri: res.assets[0].uri,

        let data = {
            uri: res.assets[0].uri,
            name: res.assets[0].fileName ? res.assets[0].fileName : 'group_chat.png',
            type: res.assets[0].type,
        }
        setimageList([...imageList, data]);
        setpathList(data)


        // console.log('data', data);
        // console.log('imagelist', imageList)
    }

    const onPressImagePicker = async () => {
        Alert.alert(
            "Pick Image",
            "What you want to open?",
            [
                {
                    text: "Gallery",
                    onPress: () => openImageGallery(),
                    style: "cancel"
                },
                {
                    text: "Camera",
                    onPress: () => openCamera(),
                    style: "destructive"
                }
            ]
        );
        return;
    }


    const onSubmitForm = async () => {
        const customerId = await AsyncStorage.getItem("customerid");
        if (!name || !number || !employeeCode || !productType || !queryType || !description || !customerId) {
            AppToastMessage('Please provide all input fields!')
            return;
        }
        if (!email || !email.includes('@') || !email.includes('.com')) {
            AppToastMessage('Please enter valid email!');
            return;
        }

        if (imageList.length == '0') {
            AppToastMessage('Please add attachments!');
            return;
        }


        formData.append("customer_name", name);
        formData.append("customer_email", email);
        formData.append("mobile_number", number);
        formData.append("employe_code", employeeCode);
        formData.append("product_type", productType);
        formData.append("query_type", queryType);
        formData.append("description", description);
        formData.append("customerId", customerId);
        // formData.append("image", pathList);

        if (imageList?.length > 0) {
            imageList.forEach((item, i) => {
                formData.append('image[]', {
                    uri: item.uri,
                    name: item.filename || `filename${i}.jpg`,
                    type: item.type,
                })
            })
        }


        console.log('imagelist', imageList);

        console.log('formData', JSON.stringify(formData));
        // return;
        claimRequest(formData).then(res => {
            console.log('claim res', res);
            if (res?.status) {
                AppToastMessage(res?.message);
                navigate("claim");
            }
        })

    }


    return (
        <View style={screenStyle}>
            <ScrollView style={{ flex: 1 }}>
                <InputField
                    value={name}
                    placeholder='Enter your name'
                    style={{ marginTop: 30 }}
                    autoCapitalize='words'
                    onTextChange={(text) => {
                        setname(text);
                    }}
                />
                <InputField
                    value={email}
                    placeholder='Enter your email address'
                    keyboardType='email-address'
                    onTextChange={(text) => {
                        setemail(text);
                    }}
                />
                <InputField
                    value={number}
                    placeholder='Mobile Number'
                    onTextChange={(text) => {
                        setnumber(text);
                    }}
                    keyboardType='numeric'
                    maxLength={10}
                />
                <InputField
                    value={employeeCode}
                    placeholder='Employee code'
                    onTextChange={(text) => {
                        setemployeeCode(text);
                    }}
                />
                <InputField
                    autoCapitalize='words'
                    value={productType}
                    placeholder='Product Type'
                    onTextChange={(text) => {
                        setproductType(text);
                    }}
                />
                <InputField
                    value={queryType}
                    placeholder='Choose Query Type'
                    autoCapitalize='words'
                    onTextChange={(text) => {
                        setqueryType(text);
                    }}
                />
                <InputField
                    autoCapitalize='words'
                    value={description}
                    placeholder='Description'
                    isDescription={true}
                    onTextChange={(text) => {
                        setdescription(text);
                    }}
                />
                <View style={{ margin: 20, marginVertical: 10 }}>
                    <HeadingText
                        text={"Add Attachments"}
                        size={16}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => onPressImagePicker()} style={[styles.addAttach, { marginTop: 10 }]}>
                            <AntDesign name='plus' size={25} color={colors.primary} />
                        </TouchableOpacity>
                        <FlatList
                            data={imageList}
                            keyExtractor={(_, index) => index}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return <View style={{ marginTop: 15, marginHorizontal: 10 }} >
                                    <AntDesign

                                        name='minuscircle'
                                        size={20}
                                        color={colors.red}
                                        onPress={() => {
                                            setimageList(imageList.filter((el) => el !== item));
                                        }}
                                        style={{ position: 'absolute', top: -10, right: -5, zIndex: 1 }}
                                    />
                                    <Image style={styles.addAttach} source={{ uri: imageList[index].uri }} />
                                </View>
                            }}
                        />
                    </View>

                </View>
                <View style={{ marginVertical: 20 }}>
                    <Button
                        title='Submit'
                        onPress={() => onSubmitForm()}
                    />
                </View>
            </ScrollView >
        </View >
    )
}


const styles = StyleSheet.create({
    addAttach: {
        height: 130,
        width: 100,
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 10,
        ...Center
    }
})

export default ClaimFormScreen