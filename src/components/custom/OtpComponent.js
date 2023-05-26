import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { MediumTextStyle } from '../../styles/CommonStyling';
import { colors } from '../../styles/colors';


const OtpComponent = ({ setotp, otp, text, resendPress = () => { }, theme = "light", showResend = true }) => {
    const firstRef = useRef();
    const secondRef = useRef();
    const thirdRef = useRef();
    const fourRef = useRef();
    const fiveRef = useRef();
    // const sixRef = useRef();
    const re = /^[0-9\b]+$/;
    const [counter, setCounter] = useState(45);

    useEffect(() => {
        firstRef.current.focus();
    }, []);

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    const onResend = async () => {
        if (counter > 1) {
            return;
        }
        resendPress();

    }

    // console.log(counter);
    return (
        <View style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", justifyContent: "space-evenly" }}>
                {/* <View style={{ ...styles.otp, alignItems: "center", justifyContent: "center" }}> */}
                <TextInput
                    autoFocus={true}
                    placeholder="-"
                    style={{ ...styles.otp, color: theme == "light" ? colors.black : colors.white }}
                    maxLength={1}
                    ref={firstRef}
                    value={otp.first}
                    onKeyPress={e => {
                        if (e.nativeEvent.key == 'Backspace') {
                            firstRef.current.focus();
                        } else {
                            secondRef.current.focus();
                        }
                    }}
                    keyboardType={'numeric'}
                    onChangeText={text => {
                        console.log(otp);
                        if (re.test(text)) {
                            setotp({ ...otp, first: text });
                            text && secondRef.current.focus();
                        } else {
                            setotp({ ...otp, first: '' });
                        }
                    }}
                />
                {/* </View> */}
                <TextInput
                    placeholder="-"
                    style={{ ...styles.otp, color: theme == "light" ? colors.black : colors.white }}
                    maxLength={1}
                    textAlign={'center'}
                    value={otp.second}
                    onKeyPress={e => {
                        if (e.nativeEvent.key == 'Backspace') {

                            firstRef.current.focus();
                        } else {
                            thirdRef.current.focus();
                        }
                        //     if (otp.second !== '') {
                        //         secondRef.current.focus();
                        //     } else if (e.nativeEvent.key == 'Backspace') {
                        //         if (otp.second == '') {
                        //             firstRef.current.focus();
                        //         }
                        //     }
                        // }
                    }}
                    ref={secondRef}
                    keyboardType={'number-pad'}
                    onChangeText={text => {

                        if (re.test(text)) {
                            setotp({ ...otp, second: text });
                            text && thirdRef.current.focus();
                        } else {
                            setotp({ ...otp, second: '' });
                        }
                    }}
                />
                <TextInput
                    placeholder="-"
                    style={{ ...styles.otp, color: theme == "light" ? colors.black : colors.white }}
                    value={otp.third}
                    onKeyPress={e => {
                        if (e.nativeEvent.key == 'Backspace') {
                            secondRef.current.focus();
                        } else {
                            fourRef.current.focus();
                        }
                        // if (e.nativeEvent.key == 'Backspace') {
                        //     if (otp.third !== '') {
                        //         thirdRef.current.focus();
                        //     } else if (e.nativeEvent.key == 'Backspace') {
                        //         if (otp.third == '') {
                        //             secondRef.current.focus();
                        //         }
                        //     }
                        // }
                    }}
                    maxLength={1}
                    ref={thirdRef}
                    keyboardType={'number-pad'}
                    onChangeText={text => {
                        if (re.test(text)) {
                            setotp({ ...otp, third: text });
                            text && fourRef.current.focus();
                        } else {
                            setotp({ ...otp, third: '' });
                        }
                    }}
                />
                <TextInput
                    placeholder="-"
                    style={{ ...styles.otp, color: theme == "light" ? colors.black : colors.white }}
                    value={otp.four}
                    maxLength={1}
                    ref={fourRef}
                    onKeyPress={e => {
                        if (e.nativeEvent.key == 'Backspace') {
                            thirdRef.current.focus();
                        } else {
                            fiveRef.current.focus();
                        }
                        // if (e.nativeEvent.key == 'Backspace') {
                        //     if (otp.four != '') {
                        //         fourRef.current.focus();
                        //     } else if (e.nativeEvent.key == 'Backspace') {
                        //         if (otp.four == '') {
                        //             thirdRef.current.focus();
                        //         }
                        //     }
                        // }
                    }}
                    keyboardType={'number-pad'}
                    onChangeText={text => {
                        console.log(otp);
                        if (re.test(text)) {
                            setotp({ ...otp, four: text });
                            fiveRef.current.focus();
                        } else {
                            setotp({ ...otp, four: '' });
                        }
                    }}
                />
                <TextInput
                    placeholder="-"
                    style={{ ...styles.otp, color: theme == "light" ? colors.black : colors.white }}
                    value={otp.five}
                    maxLength={1}
                    ref={fiveRef}
                    onKeyPress={e => {
                        if (e.nativeEvent.key == 'Backspace') {
                            fourRef.current.focus();
                            // if (otp.five != '') {
                            //     fiveRef.current.focus();
                            // } else if (e.nativeEvent.key == 'Backspace') {
                            //     if (otp.five == '') {
                            // fourRef.current.focus();
                            //     }
                            // }
                        }
                    }}
                    keyboardType={'number-pad'}
                    onChangeText={text => {
                        console.log(otp);
                        if (re.test(text)) {
                            setotp({ ...otp, five: text });
                            // sixRef.current.focus();
                        } else {
                            setotp({ ...otp, five: '' });
                        }
                    }}
                // onTextInput={() => {
                //     onVerify();
                // }}
                />
                {/* <TextInput
                    placeholder="-"
                    style={{ ...styles.otp, color: theme == "light" ? colors.black : colors.white }}
                    value={otp.six}
                    maxLength={1}
                    ref={sixRef}
                    onKeyPress={e => {
                        if (e.nativeEvent.key == 'Backspace') {
                            if (otp.six != '') {
                                sixRef.current.focus();
                            } else if (e.nativeEvent.key == 'Backspace') {
                                if (otp.six == '') {
                                    fiveRef.current.focus();
                                }
                            }
                        }
                    }}
                    keyboardType={'number-pad'}
                    onChangeText={text => {
                        console.log(otp);
                        if (re.test(text)) {
                            setotp({ ...otp, six: text });
                        } else {
                            setotp({ ...otp, six: '' });
                        }
                    }}
                /> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    otp: {
        textAlign: 'center',
        // borderWidth: 1,
        borderColor: colors.secondary,
        // marginHorizontal: 10,
        borderRadius: 5,
        width: 50,
        height: 50,
        color: colors.black,
        backgroundColor: colors.off_white,
    },
    optntxt: {
        ...MediumTextStyle,
        fontWeight: '600',
        color: colors.black,
    },
});

export default OtpComponent;
