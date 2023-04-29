import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { height, screenStyle, width } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../Utility/TextUtility'
import { colors } from '../../styles/colors'
import { Button } from '../../components/CustomFields'
import { useDispatch } from 'react-redux'
import { ChangeAppStatus } from '../../store/actions/AppAction'
import Ad1 from '../../components/onBoarding/Ad1'
import Ad2 from '../../components/onBoarding/Ad2'
import Ad3 from '../../components/onBoarding/Ad3'
import AdComponent from '../../components/onBoarding/AdComponent'
import { Marketing2BackgroundSvg, MarketingAd1Svg, MarketingAd2Svg, MarketingAd3Svg, MarketingBackgroundSvg } from '../../assets/svg/appSvgs'
import { AppConst } from '../../constants/AppConst'



const AdvertisementScreen = () => {
    const dispatch = useDispatch();
    const ref = useRef();
    const [activeIndex, setActiveIndex] = useState(0);

    const bottomHeight = 110;

    const slider = [
        {
            id: 1,
            title: "Your Insurance Simplified",
            backgroundSvg: <MarketingBackgroundSvg style={{ bottom: -40, zIndex: -1 }} />,
            adSvg: <MarketingAd1Svg />,
            content: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.`,
        },
        {
            id: 2,
            title: "Your Policies on your Figertips",
            backgroundSvg: <Marketing2BackgroundSvg style={{ top: -10 }} />,
            adSvg: <MarketingAd2Svg />,
            content: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.`,
        },
        {
            id: 3,
            title: "Your Claim, Our Concern",
            backgroundSvg: <MarketingBackgroundSvg style={{ bottom: -40, zIndex: -1 }} />,
            adSvg: <MarketingAd3Svg />,
            content: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.`,
        },
    ];

    const onNextPress = () => {
        if (activeIndex == (slider.length - 1)) {
            dispatch(ChangeAppStatus(2));
            return;
        }
        const index = activeIndex + 1;
        if (ref?.current) {
            ref?.current?.scrollToIndex({ index, animated: true });
        }
        return;
    };


    const GetComponent2 = ({ item, index }) => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{}}>
                    <View>
                        {item.backgroundSvg}
                        <View style={{ position: "absolute", zIndex: 1, alignSelf: 'center', top: 40 }}>
                            {item.adSvg}
                        </View>
                    </View>
                </View>
                <View style={{ padding: 20, flex: 1 }}>
                    <HeadingText
                        text={item.title}
                        size={20}
                        color={colors.primary}
                    />
                    <AppText
                        text={item.content}
                        color={colors.darkGrey}
                        style={{ marginTop: 10, maxWidth: "80%" }}
                    />
                </View>
                <View style={{ padding: 20, paddingHorizontal: 30 }}>
                    <Button
                        title='Next'
                        onPress={() => onNextPress()}
                    />
                </View>
            </View>
        )
        // }
    }

    return (
        <View style={screenStyle}>
            <View style={{ flex: 1, paddingTop: AppConst.paddingTop }}>
                <FlatList
                    ref={ref}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={slider}
                    pagingEnabled
                    keyExtractor={(I, i) => String(i)}
                    style={{
                        width: width,
                    }}
                    onScroll={e => {
                        if (
                            activeIndex != Math.round(e.nativeEvent.contentOffset.x / width)
                        ) {
                            setActiveIndex(
                                Math.round(e.nativeEvent.contentOffset.x / width),
                            );
                        }
                    }}
                    initialScrollIndex={activeIndex}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: width }}>
                                {index == 1 ?
                                    <GetComponent2 item={item} index={index} />
                                    :
                                    <View style={{ flex: 1 }}>
                                        <View style={{ padding: 20, marginBottom: 20 }}>
                                            <HeadingText
                                                text={item.title}
                                                size={20}
                                                color={colors.primary}
                                            />
                                            <AppText
                                                text={item.content}
                                                color={colors.darkGrey}
                                                style={{ marginTop: 10 }}
                                            />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                                            <View style={{ position: "absolute", zIndex: 1, bottom: bottomHeight }}>
                                                <View style={{ zIndex: -1 }}>
                                                    {item.backgroundSvg}
                                                </View>
                                            </View>
                                            <View style={{ height: bottomHeight, backgroundColor: colors.primary, justifyContent: "center", paddingHorizontal: 30, zIndex: 1 }}>
                                                {true &&
                                                    <View style={{ position: "absolute", bottom: bottomHeight - 10, zIndex: 1 }}>
                                                        {item.adSvg}
                                                    </View>
                                                }
                                                <Button
                                                    title={"Next"}
                                                    backgroundColor={colors.white}
                                                    textColor={colors.primary}
                                                    onPress={() => onNextPress()}
                                                />
                                            </View>
                                        </View>
                                    </View>}
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    adBanner: {
        resizeMode: "contain",
        width: width - 40,
        height: height / 1.7,
        alignSelf: "center",
        marginVertical: 20
    }
})
export default AdvertisementScreen