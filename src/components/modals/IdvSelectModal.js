import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  UIManager,
  LayoutAnimation,
  Animated,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import { colors } from '../../styles/colors';
import {
  Center,
  flexRow,
  flexSpaceBetween,
  fontSize,
  height,
  width,
} from '../../styles/CommonStyling';
import {
  InputField,
  ModalTitleHeader,
  YesNoButton,
  Checkbox,
  TouchableTextView,
} from '../CustomFields';
import { AppText, HeadingText } from '../../Utility/TextUtility';
import SelectNCBValue from '../insurance/motor/SelectNCBValue';
import { TextInput } from 'react-native';
import { AddOnsList, AdditionalCoversList } from '../../constants/OtherConst';
import { shadows } from '../../styles/shadow';
import AdditionalCoversDropdown from '../custom/AdditionalCoversDropdown';
import { RightArrowIcon } from '../../assets/svg/appSvgs';
import { passengerArr } from '../../constants/OtherConst';

const IdvSelectModal = ({
  onClose,
  title = 'Select',
  list = [],
  accList = [],
  textKey = 'title',
  onAddonsSelect = {},
  onAccSelect = {},
  selectedAccessories = [],
  selectedAddons = [],
  setselectedIDV,
  selectedIDV,
  selectedNCB,
  setselectedNCB,
  idvOptions,
}) => {
  const [previosClaimMade, setPreviousClaimMade] = useState(null);
  const [accLists, setAccList] = useState(accList);
  const [addList, setAddList] = useState(AdditionalCoversList);
  const [addonsList, setAddonsList] = useState(AddOnsList);
  const [enteredIdv, setEnteredIdv] = useState(idvOptions);
  const [selectedPaidDriver, setselectedPaidDriver] = useState(null);
  const [selectedPassenger, setselectedPassenger] = useState(false);

  // const TogglePharmcyList = () => {
  const ListUpAndDownAnimation = () => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: 'easeInEaseOut', property: 'opacity' },
      update: { type: 'easeInEaseOut', property: 'opacity' },
      delete: { type: 'easeInEaseOut', property: 'opacity' },
    });
  };
  // }

  const handleAccessoriesList = (text, i) => {
    let arr = [...accLists];
    arr[i].value = text;
    setAccList(arr);
  };

  const handleAddCov = (text, i) => {
    let arr = [...addList];
    arr[i].value = text;
    setAddList(arr);
  };

  const handleAddons = (text, i) => {
    let arr = [...addonsList];
    arr[i].value = text;
    setAddonsList(arr);
  };

  const handleIDV = (text, i) => {
    let arr = [...enteredIdv];
    arr[i].value = text;
    setEnteredIdv(arr);
  };

  const SelectedNCBValue = textKey => {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <AppText
          style={{ marginTop: 10, fontSize: 20 }}
          text="Did you make a claim in your existing policy?"
        />
        <YesNoButton value={previosClaimMade} onPress={setPreviousClaimMade} />

        {previosClaimMade == false && (
          <>
            <AppText
              style={{ marginTop: 35, fontSize: 20 }}
              text="Select your existing No Claim Bonus (NCB)"
            />
            <SelectNCBValue
              value={selectedNCB}
              onPress={setselectedNCB}
              onSubmit={() => {
                onClose();
              }}
            />
          </>
        )}

        {previosClaimMade && (
          <AppText
            style={{ marginTop: 35, fontSize: 20 }}
            text="Since youv were made a claim in your existing policy, your NCB will be reset to 0%"
          />
        )}
      </View>
    );
  };

  return (
    <Modal
      transparent
      onRequestClose={() => {
        onClose();
      }}
      animationType="slide">
      <TouchableOpacity style={[styles.modalCont, { justifyContent: 'flex-end' }]} onPressOut={() => onClose()} activeOpacity={1}>
        <TouchableWithoutFeedback>
          <View style={[styles.cont, { marginBottom: 10 }]}>
            <ModalTitleHeader
              title={title}
              onPress={onClose}
              style={{ backgroundColor: colors.primary }}
              color={colors.white}
            />

            {textKey == 'NCB' ? (
              <SelectedNCBValue />
            ) : (
              <ScrollView style={{ flexGrow: 1 }}>
                <View style={styles.itemCont}>
                  {textKey == 'Addons' && (
                    <AppText
                      style={{ marginHorizontal: 10, marginTop: 10 }}
                      text="Addons"
                      size={fontSize.medium}
                    />
                  )}
                  {list.map((item, index) => {
                    return (
                      <View key={String(index)}>
                        <TouchableOpacity
                          key={String(index)}
                          activeOpacity={0.8}
                          style={[
                            styles.item,
                            {
                              borderColor: colors.grey,
                              marginVertical: textKey == 'Addons' ? 3 : 15,
                            },
                          ]}
                          onPress={() => {
                            // onAddonsSelect(item.title)
                            if (textKey == 'IDV') {
                              setselectedIDV(item);
                              onClose();
                            } else {
                              if (!selectedAddons.includes(item.key)) {
                                onAddonsSelect([...selectedAddons, item.key]);
                              } else {
                                onAddonsSelect(
                                  selectedAddons.filter(i => item.key != i),
                                );
                              }
                            }
                          }}>
                          {textKey == 'IDV' ? (
                            <View style={styles.letterView}>
                              <HeadingText text={null} size={0} />
                            </View>
                          ) : (
                            <View style={styles.checkbox}>
                              <Checkbox
                                value={selectedAddons.includes(item.key)}
                                onPress={() => {
                                  if (!selectedAddons.includes(item.key)) {
                                    onAddonsSelect([...selectedAddons, item.key]);
                                  } else {
                                    onAddonsSelect(
                                      selectedAddons.filter(i => item.key != i),
                                    );
                                  }
                                }}
                              />
                            </View>
                          )}

                          <AppText
                            text={item.title}
                            style={{ flex: 1 }}
                            numberOfLines={2}
                          // color={}
                          />
                          {item.showInput && (
                            <TextInput
                              // label={isThirdParty ? "Vehicle Registration Number" : "Stay home & renew in 2 minutes"}
                              placeholder={item.placeholderTxt}
                              keyboardType={'number-pad'}
                              value={item.value}
                              onChangeText={text => {
                                handleIDV(text, index);
                              }}
                              // onTextChange={t => onRegTextChange(t)}
                              style={styles.input}
                            />
                          )}
                        </TouchableOpacity>
                        {selectedAddons.includes(item.key) && item.key == 12 ? (
                          <TextInput
                            // label={isThirdParty ? "Vehicle Registration Number" : "Stay home & renew in 2 minutes"}
                            placeholder={item.placeholderTxt}
                            keyboardType={'number-pad'}
                            value={item.value}
                            onChangeText={text => {
                              handleAddons(text, index);
                            }}
                            // onTextChange={t => onRegTextChange(t)}
                            style={styles.input}
                          />
                        ) : null}
                      </View>
                    );
                  })}
                </View>

                {textKey == 'Addons' && (
                  <View View style={styles.itemCont}>
                    <AppText
                      style={{ marginHorizontal: 10, marginTop: 10 }}
                      text="Accessories"
                      size={fontSize.medium}
                    />
                    {accLists.map((item, index) => {
                      return (
                        <View key={String(index)}>
                          <TouchableOpacity
                            key={String(index)}
                            activeOpacity={0.8}
                            style={[styles.item, { borderColor: colors.white }]}
                            onPress={() => {
                              if (textKey == 'IDV') {
                                onClose();
                              } else {
                                if (!selectedAccessories.includes(item.key)) {
                                  onAccSelect([...selectedAccessories, item.key]);
                                } else {
                                  onAccSelect(
                                    selectedAccessories.filter(
                                      i => item.key != i,
                                    ),
                                  );
                                }
                              }
                            }}>
                            <View style={styles.checkbox}>
                              <Checkbox
                                value={selectedAccessories.includes(item.key)}
                                onPress={() => {
                                  if (!selectedAccessories.includes(item.key)) {
                                    onAccSelect([
                                      ...selectedAccessories,
                                      item.key,
                                    ]);
                                  } else {
                                    onAccSelect(
                                      selectedAccessories.filter(
                                        i => item.key != i,
                                      ),
                                    );
                                  }
                                }}
                              />
                            </View>

                            <AppText
                              text={item.title}
                              style={{ flex: 1 }}
                              numberOfLines={2}
                            // color={}
                            />
                          </TouchableOpacity>
                          {selectedAccessories.includes(item.key) && (
                            <TextInput
                              // label={isThirdParty ? "Vehicle Registration Number" : "Stay home & renew in 2 minutes"}
                              placeholder={item.placeholderTxt}
                              keyboardType={'number-pad'}
                              value={item.value}
                              onChangeText={text => {
                                handleAccessoriesList(text, index);
                              }}
                              // onTextChange={t => onRegTextChange(t)}
                              style={styles.input}
                            />
                          )}
                        </View>
                      );
                    })}
                  </View>
                )}

                {textKey == 'Addons' ? (
                  <View style={styles.itemCont}>
                    <AppText
                      style={{ marginHorizontal: 10, marginTop: 10 }}
                      text="Additional Covers"
                      size={fontSize.medium}
                    />
                    {AdditionalCoversList.map((item, index) => {
                      return (
                        <View key={index}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                              styles.item,
                              {
                                borderColor: colors.grey,
                                marginVertical: textKey == 'Addons' ? 3 : 15,
                              },
                            ]}
                            onPress={() => {
                              // onAddonsSelect(item.title)
                              if (textKey == 'IDV') {
                                setselectedIDV(item);
                                onClose();
                              } else {
                                if (!selectedAddons.includes(item.key)) {
                                  onAddonsSelect([...selectedAddons, item.key]);
                                  ListUpAndDownAnimation();
                                } else {
                                  onAddonsSelect(
                                    selectedAddons.filter(i => item.key != i),
                                  );
                                }
                              }
                            }}>
                            {textKey == 'IDV' ? (
                              <View style={styles.letterView}>
                                <HeadingText text={null} size={0} />
                              </View>
                            ) : (
                              <View style={styles.checkbox}>
                                <Checkbox
                                  value={selectedAddons.includes(item.key)}
                                  onPress={() => {
                                    if (!selectedAddons.includes(item.key)) {
                                      ListUpAndDownAnimation();
                                      onAddonsSelect([
                                        ...selectedAddons,
                                        item.key,
                                      ]);
                                    } else {
                                      onAddonsSelect(
                                        selectedAddons.filter(i => item.key != i),
                                      );
                                    }
                                  }}
                                />
                              </View>
                            )}

                            <AppText
                              text={`${item.title} `}
                              style={{ flex: 1 }}
                              numberOfLines={2}
                            // color={}
                            />
                            {item.showInput && (
                              <TextInput
                                // label={isThirdParty ? "Vehicle Registration Number" : "Stay home & renew in 2 minutes"}
                                placeholder={item.placeholderTxt}
                                keyboardType={'number-pad'}
                                value={item.value}
                                onChangeText={text => {
                                  handleIDV(text, index);
                                }}
                                // onTextChange={t => onRegTextChange(t)}
                                style={styles.input}
                              />
                            )}
                          </TouchableOpacity>
                          {selectedAddons.includes(item.key) && item.key == 1 ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                marginVertical: 5,
                              }}>
                              <View>
                                <AdditionalCoversDropdown
                                  data={[
                                    { amount: 1, key: 1 },
                                    { amount: 2, key: 2 },
                                  ]}
                                  onPress={setselectedPaidDriver}
                                  selectedItem={selectedPaidDriver}
                                />
                              </View>
                            </View>
                          ) : null}

                          {selectedAddons.includes(item.key) && item.key == 3 ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                marginVertical: 5,
                              }}>
                              <View>
                                <AdditionalCoversDropdown
                                  data={passengerArr}
                                  onPress={setselectedPassenger}
                                  selectedItem={selectedPassenger}
                                />
                              </View>
                            </View>
                          ) : null}
                        </View>
                      );
                    })}
                  </View>
                ) : null}

                <TouchableOpacity
                  style={styles.buyNowBtn}
                  onPress={() => {
                    onClose();
                  }}>
                  <AppText text={'Submit'} color={colors.white} />
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>

    </Modal>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 50,
    width: '50%',
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    ...shadows[0],
    ...flexRow,
    borderWidth: 0.5,
    borderColor: colors.grey,
    flexWrap: 'wrap',
  },
  modalCont: {
    flex: 1,
    backgroundColor: colors.transparent_black,
    // justifyContent: "center"
  },
  cont: {
    // flex: 1,
    maxHeight: height - 100,
    marginHorizontal: 20,
    paddingBottom: 10,
    borderRadius: 15,
    backgroundColor: colors.white,
    // marginTop: AppConst.paddingTop,
  },
  item: {
    // height: 30,
    // width: (width - 80) / 2,
    backgroundColor: colors.white,
    // borderWidth: 1,
    borderColor: colors.grey,
    // ...Center,
    margin: 5,
    borderRadius: 10,
    borderBottomWidth: 1,
    ...flexRow,
    marginHorizontal: 10,
  },
  itemCont: {
    paddingVertical: 10,
  },
  letterView: {
    height: 20,
    width: 20,
    borderRadius: 25,
    backgroundColor: colors.primaryLight,
    ...Center,
    marginRight: 10,
  },
  checkbox: {
    height: 30,
    width: 30,
    borderRadius: 25,
    ...Center,
    marginRight: 10,
  },
  buyNowBtn: {
    height: 40,
    width: 120,
    backgroundColor: colors.primary,
    borderRadius: 10,
    ...Center,
    ...flexRow,
    alignSelf: 'center',
    marginTop: 10,
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 5,
    width: '50%',
    padding: 5,
    marginLeft: 25,
    marginVertical: 5,
  },
  options: {
    height: 30,
    width: '25%',
    alignSelf: 'flex-start',
  },
  optContainer: {
    height: 100,
    // flexDirection: 'row'
    // flexGrow:2
  },
});

export default IdvSelectModal;
