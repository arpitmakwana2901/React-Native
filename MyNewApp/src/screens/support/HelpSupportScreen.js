import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

const HelpSupportScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !subject || !message) {
      Alert.alert(
        'Validation',
        'All fields are required',
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert(
        'Validation',
        'Enter a valid email',
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      Alert.alert(
        'Success',
        'Your support request has been submitted.',
      );

      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }>

      <ScrollView contentContainerStyle={styles.container}>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />

        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />

        <Input
          value={subject}
          onChangeText={setSubject}
          placeholder="Subject"
        />

        <Input
          value={message}
          onChangeText={setMessage}
          placeholder="Message"
          multiline
        />

        <Button
          title="Submit"
          onPress={handleSubmit}
          loading={loading}
        />
      </ScrollView>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default HelpSupportScreen;