import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppText, HeadingText } from '../../../Utility/TextUtility';
import { FlatList } from 'react-native-gesture-handler';
import { colors } from '../../../styles/colors';
import { flexRow } from '../../../styles/CommonStyling';
import { navigate } from '../../../routes/RootNavigation';

const TrackClaimComponent = ({ claimData }) => {
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
                                            source={require('../../../assets/images/other/flagFill.png')}
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

export default TrackClaimComponent

const styles = StyleSheet.create({
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
})