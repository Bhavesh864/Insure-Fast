import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {AppText} from '../../Utility/TextUtility';
import {ScrollView} from 'react-native-gesture-handler';

const AboutUsScreen = () => {
  return (
    <ScrollView style={{paddingHorizontal: 20}}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{
          height: 50,
          width: 50,
          resizeMode: 'contain',
          alignSelf: 'center',
          borderRadius: 30,
          marginTop: 20,
        }}
      />
      <Text style={{paddingHorizontal: 5}}>{'\n'} Why InsureFast?</Text>
      <Text style={{paddingHorizontal: 10}}>
        We are regulated financial adviser who specialises in Health, Motor,
        Life & Non-Motor insurance. We are experts who will help you decide what
        type of insurance and level of cover you need and recommend a suitable
        policy at a price you can afford.
      </Text>
      <Text style={{padding: 10}}>
        Advantages of Insurefast for your Insurance {'\n'}
        1. Getting expert guidance doesn’t cost you more.{'\n'}
        2. We will help you to find the right product for you.{'\n'}
        3. Fast Service.{'\n'}
        4. Stress Free Claim Service.{'\n'}
        5. Easy Interface.{'\n'}
        {'\n'}
        INTRODUCTION{'\n'}
        We are based out of Jaipur, Rajasthan, InsureFast is an insurance Web
        Aggregator approved by IRDA of India. We offer an online platform for
        insurance buyers where they can fluently compare different insurance
        programs similar as auto insurance, life insurance, two- wheeler
        insurance, term insurance, pension plans etc. They can make an informed
        choice in a matter of a single click that too from the comfort of their
        home.{'\n'}
        {'\n'}
        PRODUCT OFFERING{'\n'}
        Policy on your finger with few clicks, the Insurefast app offer you to
        purchase any of following products.{'\n'}
        1. Health Insurance{'\n'}
        2. Car Insurance{'\n'}
        3. Two-Wheeler Insurance{'\n'}
        4. Travel Insurance{'\n'}
        5. Investment Plans{'\n'}
        6. Life Insurance{'\n'}
        {'\n'}
        Key Features{'\n'}
        Multiple Option{'\n'}
        1. We are offering multiple companies where you can compare the best
        Policy that suite for your and your pocket.{'\n'}
        Easy Interface{'\n'}
        2. We are providing the best and easy application interface where you
        can buy your policy with few clicks.{'\n'}
        Claim Support{'\n'}
        3. We have open 24*7 Claim Support available for you, whether you made
        policy with us or not.{'\n'}
        My Account{'\n'}
        4. You can directly connect with our Expert team that you can find their
        contact number and E-mail ID in My Account.{'\n'}
        Easy Comparison{'\n'}
        5. You can compare the best quote with multiple insurance company by
        selecting the companies.'{'\n'}
      </Text>
    </ScrollView>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({});
