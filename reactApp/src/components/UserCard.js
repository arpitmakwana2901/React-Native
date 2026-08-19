import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const HALF_WIDTH = (width - 40) / 2;
const FULL_WIDTH = width - 90;

const UserCard = ({ item, fullWidth }) => {
  return (
    <View
      style={[
        styles.card,
        {
          width: fullWidth ? FULL_WIDTH : HALF_WIDTH,
          alignSelf: fullWidth ? 'center' : 'auto',
        },
      ]}>

      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <Text style={styles.name}>
        {item.firstName} {item.lastName}
      </Text>

      <Text style={styles.email}>
        {item.email}
      </Text>

      <View style={styles.infoRow}>
        <Icon
          name="resize-outline"
          size={16}
          color="#007AFF"
        />
        <Text style={styles.infoText}>
          Height : {item.height} cm
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Icon
          name="barbell-outline"
          size={16}
          color="#007AFF"
        />
        <Text style={styles.infoText}>
          Weight : {item.weight} kg
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Icon
          name="calendar-outline"
          size={16}
          color="#007AFF"
        />
        <Text style={styles.infoText}>
          DOB : {item.birthDate}
        </Text>
      </View>

    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    padding: 14,

    marginBottom: 15,

    elevation: 5,

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  image: {
    width: '100%',

    height: 140,

    borderRadius: 14,

    resizeMode: 'cover',

    backgroundColor: '#F2F2F2',
  },

  name: {
    fontSize: 17,

    fontWeight: '700',

    color: '#222',

    marginTop: 12,
  },

  email: {
    fontSize: 13,

    color: '#777',

    marginTop: 4,

    marginBottom: 10,
  },

  infoRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 6,
  },

  infoText: {
    marginLeft: 6,

    fontSize: 13,

    color: '#444',

    flex: 1,
  },
});