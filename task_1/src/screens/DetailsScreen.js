import React, { useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import Colors from '../constants/Colors';

const DetailScreen = ({ route }) => {
  const { user } = route.params;

  useFocusEffect(
    useCallback(() => {
      console.log('Detail Screen Focused');

      return () => {
        console.log('Detail Screen Unfocused');
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        <Image
          source={{ uri: user.image }}
          style={styles.image}
        />

        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>

        <View style={styles.card}>

          <Item
            title="Email"
            value={user.email}
          />

          <Item
            title="Phone"
            value={user.phone}
          />

          <Item
            title="Gender"
            value={user.gender}
          />

          <Item
            title="Age"
            value={user.age}
          />

          <Item
            title="Birth Date"
            value={user.birthDate}
          />

          <Item
            title="Height"
            value={`${user.height} cm`}
          />

          <Item
            title="Weight"
            value={`${user.weight} kg`}
          />

          <Item
            title="Blood Group"
            value={user.bloodGroup}
          />

          <Item
            title="Company"
            value={user.company.name}
          />

          <Item
            title="Department"
            value={user.company.department}
          />

          <Item
            title="Job Title"
            value={user.company.title}
          />

          <Item
            title="Address"
            value={`${user.address.address},
${user.address.city},
${user.address.state}`}
          />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const Item = ({ title, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>
      {title}
    </Text>

    <Text style={styles.value}>
      {value}
    </Text>
  </View>
);

export default DetailScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 20,
    alignItems: 'center',
  },

  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 15,
  },

  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },

  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 18,
    elevation: 5,
  },

  row: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    color: '#777',
    marginBottom: 3,
  },

  value: {
    fontSize: 17,
    color: Colors.text,
    fontWeight: '600',
  },

});