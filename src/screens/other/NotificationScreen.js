import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { screenStyle } from '../../styles/CommonStyling';
import { HeadingText } from '../../Utility/TextUtility';


const NotificationScreen = () => {

    return (
        <View style={screenStyle}>

            {
                <HeadingText
                    text={"No Notifications for you !"}
                    size={16}
                    style={styles.noData}
                />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    noData: {
        position: "absolute",
        alignSelf: "center",
        top: "48%"
    }
});

export default NotificationScreen