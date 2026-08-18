import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';

const EmployeeCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}>

      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <View style={styles.info}>

        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>

        <Text style={styles.email}>
          📧 {item.email}
        </Text>

        <Text style={styles.phone}>
          📞 {item.phone}
        </Text>

        <Text style={styles.company}>
          🏢 {item.company.name}
        </Text>

      </View>

    </TouchableOpacity>
  );
};

export default EmployeeCard;

const styles = StyleSheet.create({

  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },

  email: {
    marginTop: 6,
    fontSize: 14,
    color: Colors.subtitle,
  },

  phone: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.subtitle,
  },

  company: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },

});