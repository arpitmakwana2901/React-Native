import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({
  navigation,
  title = 'Products',
  subtitle = 'Explore our latest collection',
}) => {
  return (
    <View style={styles.container}>

      {/* Left Section */}
      <View style={styles.leftContainer}>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.openDrawer()}>
          <Icon
            name="menu"
            size={30}
            color="#222"
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>

      </View>

      {/* Right Section */}

      <View style={styles.rightContainer}>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.iconButton}>
          <Icon
            name="search-outline"
            size={24}
            color="#333"
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate('Profile')
          }>
          <Icon
            name="person-circle"
            size={38}
            color="#007AFF"
          />
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#F5F7FA',
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  titleContainer: {
    marginLeft: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: '#777',
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconButton: {
    marginLeft: 15,
  },

});