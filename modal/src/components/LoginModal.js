import React, { useState } from 'react';

import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';

const LoginModal = ({
  visible,
  onClose,
}) => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const handleLogin = () => {

    if (!email.trim()) {
      Alert.alert('Validation', 'Enter Email');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Validation', 'Enter Password');
      return;
    }

    Alert.alert(
      'Success',
      'Login Successful',
    );

    setEmail('');
    setPassword('');

    onClose();
  };

  return (

    <Modal
      visible={visible}
      transparent
      animationType="fade">

      <View style={styles.overlay}>

        <View style={styles.container}>

          <Text style={styles.title}>
            Welcome Back
          </Text>

          <Text style={styles.subtitle}>
            Login to continue
          </Text>

          <TextInput
            placeholder="Enter Email"
            placeholderTextColor="#888"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.passwordBox}>

            <TextInput
              placeholder="Enter Password"
              placeholderTextColor="#888"
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(
                  !showPassword,
                )
              }>

              <Icon
                name={
                  showPassword
                    ? 'eye-off-outline'
                    : 'eye-outline'
                }
                size={24}
                color="#555"
              />

            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}>

            <Text style={styles.loginText}>
              LOGIN
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}>

            <Text style={styles.closeText}>
              Close
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </Modal>

  );
};

export default LoginModal;

const styles = StyleSheet.create({

  overlay:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.5)',
  },

  container:{
    width:'90%',
    backgroundColor:'#fff',
    borderRadius:20,
    padding:25,
    elevation:10,
  },

  title:{
    fontSize:28,
    fontWeight:'700',
    color:Colors.primary,
    textAlign:'center',
  },

  subtitle:{
    textAlign:'center',
    color:'#666',
    marginVertical:10,
    marginBottom:25,
  },

  input:{
    borderWidth:1,
    borderColor:'#ddd',
    borderRadius:12,
    paddingHorizontal:15,
    height:50,
    marginBottom:15,
    color:'#000',
  },

  passwordBox:{
    borderWidth:1,
    borderColor:'#ddd',
    borderRadius:12,
    paddingHorizontal:15,
    flexDirection:'row',
    alignItems:'center',
    marginBottom:20,
  },

  passwordInput:{
    flex:1,
    height:50,
    color:'#000',
  },

  loginButton:{
    backgroundColor:Colors.primary,
    height:50,
    borderRadius:12,
    justifyContent:'center',
    alignItems:'center',
  },

  loginText:{
    color:'#fff',
    fontSize:17,
    fontWeight:'700',
  },

  closeButton:{
    marginTop:15,
    alignItems:'center',
  },

  closeText:{
    color:'red',
    fontSize:16,
    fontWeight:'600',
  },

});