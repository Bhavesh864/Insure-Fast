import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View, } from 'react-native';
import { Center, flexRow, screenStyle, width, } from '../../styles/CommonStyling';
import { AppText, HeadingText } from '../../Utility/TextUtility';
import { colors } from '../../styles/colors';
import { navigate } from '../../routes/RootNavigation';
import { HomeHeader } from '../../components/home/HomeComponents';
import { getPunchedPoliciesData, } from '../../store/actions/PolicyAction';
import PlanComponent from '../../components/insurance/claim/PlanComponent';
import TrackClaimComponent from '../../components/insurance/claim/TrackClaimComponent';
import TabView from '../../components/insurance/claim/TabView';


const ClaimScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('plan');
  const [claimData, setclaimData] = useState(null);
  const [policiesList, setpoliciesList] = useState(null);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getPunchedPoliciesData().then(res => {
        if (res?.status) {
          setpoliciesList(res?.data);
        } else {
          setpoliciesList([]);
        }
      });
    });
  }, []);

  return (
    <SafeAreaView style={screenStyle}>
      <View style={screenStyle}>
        <HomeHeader />
        <TabView
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setclaimData={setclaimData}
        />

        {activeTab == 'plan' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigate('claimForm')}
            style={styles.claimReqCont}>
            <View>
              <Image
                source={require('../../assets/images/other/flagFill.png')}
                style={styles.flagImg}
              />
            </View>
            <View>
              <HeadingText text={'Submit Cliam Request'} size={16} />
              <AppText
                text={'Available only for InsureFast Customer'}
                style={{ top: -1 }}
                size={12}
              />
            </View>
          </TouchableOpacity>
        ) : (
          ''
        )}

        <View style={styles.spacer} />

        {activeTab == 'plan' ? (
          <PlanComponent policiesList={policiesList?.reverse()} />
        ) : (
          <TrackClaimComponent claimData={claimData} />
        )}

      </View>
    </SafeAreaView>
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
    padding: 15,
    marginHorizontal: 15,
    backgroundColor: colors.lightBlue,
    ...flexRow,
    borderRadius: 15,
    marginVertical: 10,
  },
  flagImg: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    transform: [{ rotate: '2deg' }],
    marginRight: 10,
  },
  spacer: {
    height: 20,
    width: width,
    backgroundColor: colors.off_white,
    marginVertical: 20,
  },
});

export default ClaimScreen;
