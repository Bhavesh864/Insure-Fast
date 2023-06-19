import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AppText, HeadingText } from '../../../Utility/TextUtility';
import { colors } from '../../../styles/colors';
import { FlatList } from 'react-native-gesture-handler';
import { screenStyle } from '../../../styles/CommonStyling';
import PoliciesDetailsComponent from '../PoliciesDetailsComponent';

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

export default PlanComponent

const styles = StyleSheet.create({})