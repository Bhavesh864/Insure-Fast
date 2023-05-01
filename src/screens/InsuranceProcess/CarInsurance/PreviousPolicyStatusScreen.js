import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Center, flexRow, screenStyle} from '../../../styles/CommonStyling';
import {colors} from '../../../styles/colors';
import {
  policyExpiryArr,
  previousPolicyStatusesArr,
} from '../../../constants/OtherConst';
import {AppText, HeadingText} from '../../../Utility/TextUtility';
import {
  Button,
  Checkbox,
  TouchableTextView,
  YesNoButton,
} from '../../../components/CustomFields';
import {navigate} from '../../../routes/RootNavigation';
import {useSelector} from 'react-redux';
import {AppConst} from '../../../constants/AppConst';
import {
  createOnlinePolicyObj,
  dispatchQuickQuote,
  fillPolicyDataAction,
  getPreviousPolicyCompanies,
} from '../../../store/actions/PolicyAction';
import ListShowModal from '../../../components/modals/ListShowModal';
import DataListSelectModal from '../../../components/modals/DataListSelectModal';
import {AppToastMessage} from '../../../components/custom/SnackBar';
import moment from 'moment';

const PreviousPolicyStatusScreen = () => {
  const details = useSelector(state => state.motor?.apiRequestQQ);
  const userProfile = useSelector(state => state.user?.user);
  const [selectedPolicyStatus, setSelectedPolicyStatus] = useState(null);
  const [previosClaimMade, setPreviousClaimMade] = useState(null);
  const [lastOwnerChange, setLastOwnerChange] = useState(null);
  const [policyExpire, setPolicyStatus] = useState(null);
  const [prevPolEndDate, setPrevPolEndDate] = useState(null);
  // const [policyType, setPolicyType] = useState(null);
  const [policyModal, setPolicyModal] = useState(false);
  const [previousPolicies, setPreviousPolicies] = useState([]);
  const [selectedpreviousPol, setSelectedPreviousPol] = useState(null);
  const [odType, setOdType] = useState(false);
  // AppConst.showConsoleLog("red: ", details);

  useEffect(() => {
    setOdType(checkVehicleODType());
    getPreviousPolicyCompanies().then(res => {
      AppConst.showConsoleLog('previous policy res: ', res);
      if (res?.status) {
        setPreviousPolicies(res?.data);
      }
    });
  }, []);

  const checkVehicleODType = (reg = details?.RegistrationDate) => {
    // AppConst.showConsoleLog("reg date: ", details?.ManufaturingDate);
    if (!reg) {
      return false;
    }
    const threeYr = moment().subtract(3, 'years').format('YYYY-MM-DD');
    const fiveYr = moment().subtract(5, 'years').format('YYYY-MM-DD');
    const checkDate = details?.VehicleType == 'Pvt Car' ? threeYr : fiveYr;
    AppConst.showConsoleLog(
      '-- ',
      threeYr,
      reg,
      moment(reg).isAfter(checkDate),
    );
    if (moment(reg).isAfter(checkDate)) {
      return true;
    } else {
      return false;
    }
  };

  const getPreviousPolicyStatus = selectedItem => {
    let prvPolEndDate =
      details.IsVehicleNew == false && selectedItem.key === 'continue'
        ? moment().add(2, 'day').format(`YYYY-MM-DD`)
        : selectedItem.key === 'expired within 90 day'
        ? moment().subtract(90, 'day').format(`YYYY-MM-DD`)
        : selectedItem.key === 'expired above 90 day'
        ? moment().subtract(180, 'day').format(`YYYY-MM-DD`)
        : '';
    console.log('policy Expire date', prvPolEndDate);

    setPolicyStatus(selectedItem.key);
    setPrevPolEndDate(prvPolEndDate);
  };

  const createPolicy = () => {
    if (previosClaimMade == null) {
      AppToastMessage('Please select claim made in last policy');
      return;
    }
    if (previosClaimMade == false && lastOwnerChange == null) {
      AppToastMessage('Provide last owner change detail');
      return;
    }

    if (!policyExpire) {
      AppToastMessage('Please provide previous policy status');
      return;
    }
    if (!odType && !selectedPolicyStatus) {
      AppToastMessage('Please provide your previous policy type');
      return;
    }
    if (!selectedpreviousPol) {
      AppToastMessage('Please provide your previous policy insurer');
      return;
    }
    dispatchQuickQuote('PrePolicyEndDate', prevPolEndDate);
    dispatchQuickQuote('PolicyStatus', policyExpire);
    dispatchQuickQuote('PreviousPolicyType', selectedPolicyStatus);

    let obj = createOnlinePolicyObj(details);

    let obj2 = {
      ...obj,
      PrePolicyEndDate: prevPolEndDate,
      PolicyStatus: policyExpire,
      PreviousPolicyType: selectedPolicyStatus,
    };

    console.log('obj2 ==> ', obj2);
    let formData = new FormData();
    for (let key in obj2) {
      formData.append(key, obj2[key]);
    }
    // formData.append("posId", store.getState().root.userDetails.id);
    formData.append('customerId', AppConst.getCustomerId());
    // console.log('customerid', AppConst.getCustomerId());

    fillPolicyDataAction(formData).then(res => {
      AppConst.showConsoleLog('fill policy res: ', res);
      if (res && res?.status) {
        console.log('policy id ==> ', res?.data?.id);
        dispatchQuickQuote('policyId', res?.data.id);
        navigate('quotationSummary', {previosClaimMade});
      } else {
        res
          ? AppToastMessage(res?.message)
          : AppToastMessage('Something went wrong');
      }
    });
  };

  AppConst.showConsoleLog('vehicle: ', details?.VehicleType);

  return (
    <View style={[screenStyle, {backgroundColor: colors.off_white}]}>
      <ScrollView style={{flex: 1}}>
        {/* <View style={styles.dataCont}>
                    {previousPolicyStatusesArr.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={String(index)}
                                activeOpacity={0.8}
                            style={{ marginVertical: 10, ...flexRow }}
                                onPress={() => setSelectedPolicyStatus(item.key)}
                            >
                                <Checkbox
                                    value={item.key == selectedPolicyStatus}
                                    onPress={() => setSelectedPolicyStatus(item.key)}
                                />
                                <AppText
                                    text={item.title}
                                    style={{ marginLeft: 10 }}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </View> */}
        <View style={styles.dataCont}>
          <HeadingText text={'Claim Made in last policy'} />
          <YesNoButton
            value={previosClaimMade}
            onPress={setPreviousClaimMade}
          />
        </View>
        {!previosClaimMade && (
          <View style={styles.dataCont}>
            <HeadingText text={'Last Owner Changes'} />
            <YesNoButton value={lastOwnerChange} onPress={setLastOwnerChange} />
          </View>
        )}
        <View style={styles.dataCont}>
          <HeadingText
            text={'Previous Policy Status'}
            style={{marginBottom: 5}}
          />
          {policyExpiryArr.map((item, index) => {
            return (
              <TouchableOpacity
                key={String(index)}
                style={[
                  styles.policyExpire,
                  {
                    backgroundColor:
                      item.key == policyExpire ? colors.primary : colors.white,
                  },
                ]}
                onPress={() => {
                  getPreviousPolicyStatus(item);
                }}>
                <AppText
                  text={item.title}
                  color={item.key == policyExpire ? colors.white : colors.black}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.dataCont}>
          <HeadingText
            text={
              !odType
                ? 'What is your previous policy type?'
                : 'Your previous policy insurer'
            }
            style={{marginBottom: 10}}
          />
          {/* <View style={[flexRow, { marginTop: 15 }]}>
                        <TouchableOpacity activeOpacity={0.8} style={[styles.smallBtn, { marginRight: 10 }]}>
                            <AppText
                                text={"Comprehensive"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={styles.smallBtn}>
                            <AppText
                                text={"Third Party"}
                            />
                        </TouchableOpacity>
                    </View> */}
          {!odType &&
            previousPolicyStatusesArr.map((item, index) => {
              return (
                <TouchableOpacity
                  key={String(index)}
                  activeOpacity={0.8}
                  style={{marginVertical: 10, ...flexRow}}
                  onPress={() => setSelectedPolicyStatus(item.key)}>
                  <Checkbox
                    value={item.key == selectedPolicyStatus}
                    onPress={() => {
                      setSelectedPolicyStatus(item.key);
                    }}
                  />
                  <AppText text={item.title} style={{marginLeft: 10}} />
                </TouchableOpacity>
              );
            })}
          <View style={{marginTop: 20}}>
            <TouchableTextView
              placeholder={'Previous Insurer'}
              value={selectedpreviousPol?.Name}
              onPress={() => setPolicyModal(true)}
              style={{marginBottom: 0}}
              marginHorizontal={0}
            />
          </View>
        </View>
        <View style={{margin: 20, marginTop: 0}}>
          <Button
            title="Continue"
            // onPress={() => navigate("quotationSummary")}
            onPress={createPolicy}
          />
        </View>
      </ScrollView>

      {policyModal && (
        <DataListSelectModal
          isSearch={true}
          list={previousPolicies}
          textKey="Name"
          onClose={() => setPolicyModal(false)}
          title="Previous Insurer Company"
          onItemSelect={item => {
            setSelectedPreviousPol(item);
            setPolicyModal(false);
          }}
          onSearch={text => {
            let tempList = previousPolicies.filter(item => {
              return item.Name.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });
            return tempList;
            console.log('list', previousPolicies);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dataCont: {
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  smallBtn: {
    height: 40,
    width: 130,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    ...Center,
  },
  policyExpire: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
  },
});

export default PreviousPolicyStatusScreen;

// let body = {
//     "first_name": "",
//     "last_name": "last_name",
//     "phone": "",
//     "city": "city", //khaali
//     "state": "state", //khaali
//     "email": "email",
//     "pincode": "pincode",//khaali
//     "dob": "dob",
//     "address_line1": "address_line1",//khaali
//     "address_line2": "address_line2",//khaali
//     "address_line3": "address_line3",//khaali
//     "pan_card": "pan_card",//khaali
//     "aadhar_card": "aadhar_card",
//     "gender": "gender",//khaali
//     "marital_status": "marital_status",//khaali
//     "occupation": "",//khaali
//     "nominee_name": "nominee_name",//khaali
//     "nominee_relation": "nominee_relation",//khaali
//     "nominee_age": "nominee_age",//khaali
//     "appointee_relation": "appointee_relation",//khaali
//     "appointee_name": "appointee_name",//khaali
//     "vehicle_type": "Pvt Car",
//     "case_type": "",//khaali
//     "policy_type": "",
//     "vehicle_no": "",
//     "vehicle_make": details?.MakeName,
//     "vehicle_model": details?.ModelName,
//     "fuel_type": details?.FuelType,
//     "vehicle_variant": details?.VariantName,
//     "vehicle_mfg_yr": details?.RegistrationYear,
//     "registration_date": details?.RegistrationYear,
//     "rm_name_Code": "",//khaali
//     "pos_name_Code": " ",//khaali
//     "rto": "rto",
//     "policy_status": "pending",
//     "engine_no": "",//khaali
//     "chassis_no": "",//khaali
//     "policy_start": "",//khaali
//     "policy_expiry": "",//khaali
//     "policy_no": "",//khaali
//     "policy_issue": "",//khaali
//     "od_premium": "",//khaali
//     "net_premium": "",//khaali
//     "TP_premium": "",//khaali
//     "tax_amount": "",//khaali
//     "idv": "",//khaali
//     "gross_premium": "",//khaali
//     "discount": "",//khaali
//     "insurance_company": "",//khaali
//     "payment_mode": "",//khaali
//     "coverages": "",
//     "commisanalbe_premium": "",
//     "od_net_premium": "",
//     "tp_cover": "",
//     "addons": "",
//     "cc_gcv_str": "",
//     "insurance_branch": "",
//     "broker_name": "",
//     "remark_internal_ops": "",
//     "remark_pos": "",
//     "leadtypeId": "1",
//     "type": "online"
// }
