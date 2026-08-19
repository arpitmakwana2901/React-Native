import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import {useDispatch} from 'react-redux';

import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from '@react-native-firebase/auth';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {login} from '../redux/slices/authSlice';
import {saveUserData} from '../utils/storage';



const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  /*
   * ------------------------------------------------
   * NORMAL EMAIL/PASSWORD LOGIN
   * ------------------------------------------------
   */
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        'Missing Information',
        'Please enter email and password.',
      );
      return;
    }

    if (
      email.trim() !== 'arpit@gmail.com' ||
      password !== '12345'
    ) {
      Alert.alert(
        'Login Failed',
        'Invalid email or password.',
      );
      return;
    }

    const userData = {
      email: email.trim(),
    };

    try {
      setLoginLoading(true);

      // Save user in AsyncStorage
      await saveUserData(userData);

      // Save user in Redux
      dispatch(login(userData));

      // Navigate to Home
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (error) {
      console.log('Normal Login Error:', error);

      Alert.alert(
        'Error',
        'Something went wrong. Please try again.',
      );
    } finally {
      setLoginLoading(false);
    }
  };

  /*
   * ------------------------------------------------
   * GOOGLE LOGIN
   * ------------------------------------------------
   */
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      /*
       * Check Google Play Services
       */
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      /*
       * Open Google account selection
       */
      const signInResult = await GoogleSignin.signIn();

      console.log('Google Sign In Result:', signInResult);

      if (signInResult?.type === 'cancelled') {
        return;
      }

      /*
       * Google Sign-In v16 response
       *
       * idToken is inside:
       * signInResult.data.idToken
       */
      const idToken = signInResult?.data?.idToken;

      if (!idToken) {
        throw new Error(
          'Google ID Token was not received.',
        );
      }

      /*
       * Create Firebase Google Credential
       */
      const googleCredential =
        GoogleAuthProvider.credential(idToken);

      /*
       * Sign in to Firebase
       */
      const userCredential =
        await signInWithCredential(
          getAuth(),
          googleCredential,
        );

      /*
       * Firebase User
       */
      const firebaseUser = userCredential.user;

      console.log('Firebase User:', firebaseUser);

      /*
       * User data for Redux + AsyncStorage
       */
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || '',
        photo: firebaseUser.photoURL || '',
        provider: 'google',
      };

      /*
       * Save in AsyncStorage
       */
      await saveUserData(userData);

      /*
       * Save in Redux
       */
      dispatch(login(userData));

      /*
       * Navigate to Home
       */
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (error) {
      console.log('Google Sign-In Error:', error);

      /*
       * User cancelled Google login
       */
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return;
      }

      /*
       * Google login already running
       */
      if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert(
          'Please Wait',
          'Google Sign-In is already in progress.',
        );
        return;
      }

      /*
       * Google Play Services problem
       */
      if (
        error.code ===
        statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        Alert.alert(
          'Google Play Services',
          'Google Play Services is not available or needs to be updated.',
        );
        return;
      }

      /*
       * Other Firebase / Google errors
       */
      Alert.alert(
        'Google Sign-In Failed',
        error?.message ||
          'Something went wrong with Google Sign-In.',
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={
        Platform.OS === 'ios' ? 'padding' : undefined
      }>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        
        <View style={styles.container}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Welcome Back
            </Text>

            <Text style={styles.subtitle}>
              Login to continue
            </Text>
          </View>

          {/* EMAIL */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Email
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* PASSWORD */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Password
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* NORMAL LOGIN */}
          <TouchableOpacity
            style={[
              styles.button,
              loginLoading && styles.disabledButton,
            ]}
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={loginLoading}>

            {loginLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                Login
              </Text>
            )}
          </TouchableOpacity>

          {/* OR */}
          <View style={styles.orContainer}>
            <View style={styles.line} />

            <Text style={styles.orText}>
              OR
            </Text>

            <View style={styles.line} />
          </View>

          {/* GOOGLE BUTTON */}
          <TouchableOpacity
            style={[
              styles.googleButton,
              googleLoading &&
                styles.disabledGoogleButton,
            ]}
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
            disabled={googleLoading}>

            {googleLoading ? (
              <ActivityIndicator color="#4285F4" />
            ) : (
              <>
                <View style={styles.googleLogoContainer}>
                  <Text style={styles.googleLogo}>
                    G
                  </Text>
                </View>

                <Text style={styles.googleButtonText}>
                  Continue with Google
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* DEMO CREDENTIALS */}
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>
              Demo Credentials
            </Text>

            <Text style={styles.demoText}>
              Email: arpit@gmail.com
            </Text>

            <Text style={styles.demoText}>
              Password: 12345
            </Text>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  container: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  header: {
    marginBottom: 35,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
  },

  inputContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },

  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#0F172A',
  },

  button: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    marginTop: 8,
  },

  disabledButton: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },

  orText: {
    marginHorizontal: 14,
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },

  googleButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledGoogleButton: {
    opacity: 0.7,
  },

  googleLogoContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  googleLogo: {
    fontSize: 21,
    fontWeight: '800',
    color: '#4285F4',
  },

  googleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },

  demoContainer: {
    marginTop: 25,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },

  demoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 8,
  },

  demoText: {
    fontSize: 13,
    color: '#475569',
    marginTop: 3,
  },
});

export default LoginScreen;