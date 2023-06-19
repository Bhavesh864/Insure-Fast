import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, } from 'react-native';
import { AvailableInsuranceComponent, HomeHeader, HomeScreenBanner, HowInsuranceWorkComponent, } from '../../components/home/HomeComponents';
import { screenStyle, } from '../../styles/CommonStyling';
import { HeadingText } from '../../Utility/TextUtility';
import { useDispatch } from 'react-redux';
import { getUserProfileData } from '../../store/actions/UserAction';
import { CustomSafeAreaView } from '../../styles/SafeAreaCustomView';
import { dispatchQuickQuote, getRecentSearchedQuote, } from '../../store/actions/PolicyAction';
import RecentInsuranceList from '../../components/home/RecentInsuranceList';
import { navigate } from '../../routes/RootNavigation';


const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [recentQuote, setrecentQuote] = useState(null);
  const [recentQuoteList, setrecentQuoteList] = useState([]);

  useEffect(() => {
    dispatch(getUserProfileData());
    navigation.addListener('focus', () => {
      getRecentSearchedQuote().then(res => {
        if (res?.status && res?.data) {
          setrecentQuote(res?.data[0] || false);
          setrecentQuoteList(res?.data)
        }
      });
    });
  }, []);


  const onOptionPress = (key, payloads = {}, name) => {
    if (!key) {
      return
    }
    if (name == " Car TP" || name == "BIKE TP") {
      dispatchQuickQuote("NewPolicyType", "ThirdParty");
      dispatchQuickQuote("onlyThirdPartyIns", true);
      navigate(key, payloads);
    } else if (name == 'Car') {
      dispatchQuickQuote('vehicleType', payloads.vehicleType);
      dispatchQuickQuote("onlyThirdPartyIns", false);
      navigate(key, payloads);
      // navigate('quotationSummary');
    } else if (name == 'BIKE') {
      dispatchQuickQuote('vehicleType', payloads.vehicleType);
      dispatchQuickQuote("onlyThirdPartyIns", false);
      navigate(key, payloads);
      // navigate('quotationSummary');
    } else {
      dispatchQuickQuote('vehicleType', payloads.vehicleType);
      dispatchQuickQuote("onlyThirdPartyIns", false);
      navigate(key, payloads);
    }
  }



  return (
    <View style={screenStyle}>
      <CustomSafeAreaView>
        <HomeHeader />
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <HomeScreenBanner onOptionPress={onOptionPress} />
            <AvailableInsuranceComponent onOptionPress={onOptionPress} />
            {recentQuote && (
              <View>
                <HeadingText
                  text="Continue with your last search"
                  style={{ paddingHorizontal: 20, paddingTop: 10 }}
                />
                <RecentInsuranceList
                  data={recentQuoteList}
                />
              </View>
            )}
            <HowInsuranceWorkComponent onOptionPress={onOptionPress} />

          </ScrollView>
        </View>
      </CustomSafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
