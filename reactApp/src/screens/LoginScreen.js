import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/Color';
import Logo from '../components/Logo';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../components/PrimaryButton';
import Divider from '../components/Divider';
import SocialButton from '../components/SocialButton';
import Images from '../constants/Images';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === '') {
      Alert.alert('Validation', 'Please enter your email.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Validation', 'Please enter a valid email.');
      return;
    }

    if (password.trim() === '') {
      Alert.alert('Validation', 'Please enter your password.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Validation',
        'Password must be at least 6 characters.'
      );
      return;
    }

    try {
      const user = {
        email,
      };

      await AsyncStorage.setItem(
        'USER_DATA',
        JSON.stringify(user)
      );

      Alert.alert('Success', 'Login Successful');

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
          },
        ],
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Unable to login.');
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google Login');
  };

  const handleAppleLogin = () => {
    console.log('Apple Login');
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.card}>
          <Logo />

          <Text style={styles.title}>
            Welcome Back!
          </Text>

          <Text style={styles.subtitle}>
            Enter your credentials to continue.
          </Text>

          <CustomInput
            label="Email Address"
            placeholder="john@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            label="Password"
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.forgotContainer}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <PrimaryButton
            title="Log In"
            onPress={handleLogin}
          />

          <Divider />

          <SocialButton
            icon={Images.google}
            title="Sign in with Google"
            onPress={handleGoogleLogin}
          />

          <SocialButton
            icon={Images.apple}
            title="Sign in with Apple"
            onPress={handleAppleLogin}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 25,
    paddingHorizontal: 22,
    paddingVertical: 28,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 5,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    color: Colors.subtitle,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 25,
  },

  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: 4,
    marginBottom: 5,
  },

  forgotText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});