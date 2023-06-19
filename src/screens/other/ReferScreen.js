import { StyleSheet, Text, View, Image, Share } from 'react-native'
import React from 'react'
import { TouchableTextView } from '../../components/CustomFields'
// import icons from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import { colors } from '../../styles/colors'
import { AppToastMessage } from '../../components/custom/SnackBar'
import { ChatSvgComponent, GoogleSvgComponent } from '../../assets/svg/basicSvgs'
import { Center } from '../../styles/CommonStyling'


const ReferScreen = () => {

    const onShare = () => {
        // AppConst.showConsoleLog("referLink: ", referLink)
        Share.share({
            message: `https://www.insurefast.in/?q=basic+insurance+app+refer+screen&sxsrf=APwXEdfgiixuoGO8671q1UTuekKs7Eos6g:1682433611348&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi7wozOocX- `,
            url: 'https://www.insurefast.com/?q=basic+insurance+app+refer+screen&sxsrf=APwXEdfgiixuoGO8671q1UTuekKs7Eos6g:1682433611348&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi7wozOocX-',
            title: "Refer Earn",
        });

    }

    return (
        <View>
            <View style={{ alignItems: 'center', marginBottom: 40 }}>
                <Image source={require("../../assets/images/banners/banner1.png")} style={{ height: 100, width: 100, resizeMode: "contain", marginTop: 20 }} />
                <Text style={{ fontSize: 20, textAlign: 'center', padding: 10 }}>Refer your family and friends and let them know about this amazing app.</Text>
            </View>
            <TouchableTextView
                style={{ alignItems: 'center' }}
                label={'Copy link and share with your friends'}
                value={'https://www.insurefast.in/?q=basic+insurance+app+refer+screen&sxsrf=APwXEdfgiixuoGO8671q1UTuekKs7Eos6g:1682433611348&source=lnms'}
                Icon={<Octicons
                    name={'share'}
                    size={20}
                    color={colors.darkGrey}
                    style={{
                        marginRight: 5
                    }}
                />}
                onPress={() => { onShare() }}
            />

        </View>
    )
}
{/* <View style={{ padding: 5, backgroundColor: colors.primary, borderRadius: 20, height: 60, width: 60, ...Center, borderColor: colors.grey, borderWidth: 0.8 }}>
                {/* <AntDesign name='check' size={15} color={colors.white} /> */}
{/* <GoogleSvgComponent />
            </View >
    <View style={{ padding: 5, backgroundColor: colors.primary, borderRadius: 20, height: 60, width: 60, ...Center, borderColor: colors.grey, borderWidth: 0.8 }}>
        <ChatSvgComponent />
    </View> * /} */}

export default ReferScreen

const styles = StyleSheet.create({})