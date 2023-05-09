import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import {
  AvailableInsuranceComponent,
  HomeHeader,
  HomeScreenBanner,
  HowInsuranceWorkComponent,
} from '../../components/home/HomeComponents';
// import HomeHeader from '../../components/home/HomeHeader'
import { colors } from '../../styles/colors';
import { Center, flexRow, height, screenStyle, width } from '../../styles/CommonStyling';
import { AppText, HeadingText } from '../../Utility/TextUtility';
import { useDispatch } from 'react-redux';
import { getUserProfileData } from '../../store/actions/UserAction';
import { CustomSafeAreaView } from '../../styles/SafeAreaCustomView';
import {
  getRecentSearchedQuote,
} from '../../store/actions/PolicyAction';
import { navigate } from '../../routes/RootNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import RecentInsuranceList from '../../components/home/RecentInsuranceList';




const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [recentQuote, setrecentQuote] = useState(null);
  const [recentQuoteList, setrecentQuoteList] = useState([]);

  useEffect(() => {
    dispatch(getUserProfileData());
    navigation.addListener('focus', () => {
      getRecentSearchedQuote().then(res => {
        // console.log('hello', res?.data);
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
                  style={{ paddingHorizontal: 20, paddingTop: 20 }}
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

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderColor: colors.grey,
    ...flexRow,
  },
  tabCont: {
    flexDirection: 'row',
    height: 45,
    margin: 20,
    // width: "90%",
    backgroundColor: colors.lightGrey,
    borderRadius: 5,
  },
  tabOption: {
    flex: 1,
    ...Center,
    margin: 2,
    borderRadius: 5,
  },
  claimReqCont: {
    marginHorizontal: 20,
    width: width * 0.8,
    backgroundColor: colors.lightBlue,
    ...flexRow,
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
  },
  flagImg: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    transform: [{ rotate: '12deg' }],
    marginRight: 15,
  },
  spacer: {
    height: 20,
    width: width,
    backgroundColor: colors.off_white,
    marginVertical: 20,
  },
});

export default HomeScreen;
