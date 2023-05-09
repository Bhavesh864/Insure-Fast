import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { screenStyle } from '../../styles/CommonStyling';
import { HomeHeader } from '../../components/home/HomeComponents';
import { getPunchedPoliciesData } from '../../store/actions/PolicyAction';
import { useEffect } from 'react';
import PoliciesDetailsComponent from '../../components/insurance/PoliciesDetailsComponent';
import { useState } from 'react';
import { AppText, HeadingText } from '../../Utility/TextUtility';
import { colors } from '../../styles/colors';

const PoliciesScreen = ({ navigation }) => {
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

  if (policiesList && policiesList.length == 0) {
    return (
      <SafeAreaView style={screenStyle}>
        <View style={{ flex: 1 }}>
          <HomeHeader screen={'policy'} />
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
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={screenStyle}>
        <View style={screenStyle}>
          <HomeHeader />
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={policiesList?.reverse()}
            keyExtractor={(item, index) => index}
            renderItem={(item, index) => {
              return <PoliciesDetailsComponent item={item} />;
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({});

export default PoliciesScreen;
