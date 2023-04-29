import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { colors } from '../../styles/colors'


const ComparePlansModal = ({ onClose }) => {

    return (
        <Modal
            visible
            transparent={true}
            onRequestClose={() => onClose()}
            animationType="slide"
        >
            <View style={{ flex: 1, backgroundColor: colors.transparent_black }}>

            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({})

export default ComparePlansModal