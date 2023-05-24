import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, } from 'react-native';
import { AvailableInsuranceComponent, HomeHeader, HomeScreenBanner, HowInsuranceWorkComponent, } from '../../components/home/HomeComponents';
import { screenStyle, } from '../../styles/CommonStyling';
import { HeadingText } from '../../Utility/TextUtility';
import { useDispatch } from 'react-redux';
import { getUserProfileData } from '../../store/actions/UserAction';
import { CustomSafeAreaView } from '../../styles/SafeAreaCustomView';
import { getRecentSearchedQuote, } from '../../store/actions/PolicyAction';
import RecentInsuranceList from '../../components/home/RecentInsuranceList';


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



  return (
    <View style={screenStyle}>
      <CustomSafeAreaView>
        <HomeHeader />
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <HomeScreenBanner />
            <AvailableInsuranceComponent />
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
            <HowInsuranceWorkComponent />

          </ScrollView>
        </View>
      </CustomSafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
