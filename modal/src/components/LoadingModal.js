import React from 'react';

import {
  Modal,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';

const LoadingModal = ({
  visible,
}) => {

  return (

    <Modal
      visible={visible}
      transparent
      animationType="fade">

      <View style={styles.overlay}>

        <View style={styles.container}>

          <ActivityIndicator
            size="large"
            color={Colors.primary}
          />

          <Text style={styles.title}>
            Please Wait...
          </Text>

          <Text style={styles.subtitle}>
            Processing your request
          </Text>

        </View>

      </View>

    </Modal>

  );
};

export default LoadingModal;

const styles = StyleSheet.create({

  overlay:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.45)',
  },

  container:{
    width:'80%',
    backgroundColor:'#fff',
    borderRadius:18,
    padding:30,
    alignItems:'center',
    elevation:10,
  },

  title:{
    marginTop:20,
    fontSize:22,
    fontWeight:'700',
    color:'#222',
  },

  subtitle:{
    marginTop:10,
    color:'#777',
    fontSize:15,
  },

});