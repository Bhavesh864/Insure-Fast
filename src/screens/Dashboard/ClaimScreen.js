import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Center,
  flexRow,
  fonts,
  screenStyle,
  width,
} from '../../styles/CommonStyling';
import { AppText, HeadingText } from '../../Utility/TextUtility';
import { colors } from '../../styles/colors';
import { shadows } from '../../styles/shadow';
import { navigate } from '../../routes/RootNavigation';
import { HomeHeader } from '../../components/home/HomeComponents';
import {
  getAllClaimOfCustomer,
  getPunchedPoliciesData,
} from '../../store/actions/PolicyAction';
import { FlatList } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableTextView } from '../../components/CustomFields';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PoliciesDetailsComponent from '../../components/insurance/PoliciesDetailsComponent';

const options = [
  {
    title: 'Your Plans',
    key: 'plan',
  },
  {
    title: 'Track claims',
    key: 'claim',
  },
];

const ClaimScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('plan');
  const [claimData, setclaimData] = useState(null);

  const [policiesList, setpoliciesList] = useState(null);

  useEffect(() => {
    // console.log('hello');
    navigation.addListener('focus', () => {
      getPunchedPoliciesData().then(res => {
        console.log('object', JSON.stringify(res));
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

const PlanComponent = ({ policiesList }) => {
  if (policiesList && policiesList.length == 0) {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: 'absolute',
            bottom: '40%',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <HeadingText
            text={'No policies yet'}
            size={24}
          // color={colors.darkGrey}
          />
          <AppText
            text={"Let's figure out how we can still help you"}
            color={colors.darkGrey}
            style={{ marginTop: 2 }}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={screenStyle}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={policiesList}
          keyExtractor={(item, index) => index}
          renderItem={(item, index) => {
            return <PoliciesDetailsComponent item={item} />;
          }}
        />
      </View>
    );
  }
};

const TrackClaimComponent = ({ claimData }) => {
  // console.log('hello;', claimData.length);
  return (
    <View style={{ flex: 1 }}>
      {claimData && claimData.length === 0 ? (
        <View
          style={{
            position: 'absolute',
            bottom: '40%',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <HeadingText
            text={'No claims raised'}
            size={24}
          // color={colors.darkGrey}
          />
          <AppText
            text={"We're glad you are fine"}
            color={colors.darkGrey}
            style={{ marginTop: 2 }}
          />
        </View>
      ) : (
        <>
          <HeadingText
            text={`Claims Made By You`}
            style={{ top: -1, textAlign: 'center', marginBottom: 10 }}
            size={20}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={claimData}
            keyExtractor={(_, index) => index}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.claimReqCont}
                  onPress={() => {
                    navigate('claimDetails', { item });
                  }}>
                  <View>
                    <Image
                      source={require('../../assets/images/other/flagFill.png')}
                      style={styles.flagImg}
                    />
                  </View>
                  <View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <HeadingText
                        text={`Name: ${item.customer_name}`}
                        size={16}
                        style={{ width: '60%' }}
                      />
                      {/* <View style={{ marginHorizontal: 30 }}></View> */}
                      <AppText
                        text={`Status: ${item.status}`}
                        style={{ width: '40%', }}
                        size={12}
                      />
                    </View>
                    <AppText
                      text={`Query Type - ${item.query_type}`}
                      style={{ width: '60%' }}
                      size={13}
                    />
                    <AppText
                      text={`Product Type - ${item.product_type}`}
                      style={{ width: '60%' }}
                      size={13}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}
    </View>
  );
};

const TabView = ({ activeTab, setActiveTab, setclaimData }) => {
  return (
    <View style={styles.tabCont}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={String(index)}
          activeOpacity={0.8}
          onPress={async () => {
            setActiveTab(item.key);
            if (item.key == 'claim') {
              const customerId = await AsyncStorage.getItem('customerid');
              await getAllClaimOfCustomer(customerId).then(res => {
                console.log('data', res);
                if (res?.status) {
                  setclaimData(res?.data);
                } else {
                  setclaimData([]);
                }
              });
            }
          }}
          style={[
            styles.tabOption,
            activeTab == item.key
              ? {
                backgroundColor: colors.white,
                ...shadows[1],
              }
              : null,
          ]}>
          <AppText
            text={item.title}
            color={activeTab == item.key ? colors.primary : colors.black}
            style={{ fontFamily: fonts.medium }}
            size={15}
          />
        </TouchableOpacity>
      ))}
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
