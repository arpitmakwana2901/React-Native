import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// Card width for 2 columns
const CARD_WIDTH = (width - 40) / 2;

const PostCard = ({ item }) => {
  const fullStars = Math.floor(item.rating);

  return (
    <View style={styles.card}>
      {/* Product Image */}
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.image}
      />

      {/* Product Title */}
      <Text
        style={styles.title}
        numberOfLines={2}>
        {item.title}
      </Text>

      {/* Description */}
      <Text
        style={styles.description}
        numberOfLines={2}>
        {item.description}
      </Text>

      {/* Price */}
      <Text style={styles.price}>
        ₹ {Math.round(item.price * 85)}
      </Text>

      {/* Stock */}
      <View style={styles.stockContainer}>
        <Text style={styles.stockText}>
          Stock : {item.stock}
        </Text>
      </View>

      {/* Rating */}
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="star"
            size={15}
            color={
              star <= fullStars
                ? '#FFC107'
                : '#D6D6D6'
            }
            style={{ marginRight: 2 }}
          />
        ))}

        <Text style={styles.ratingText}>
          {item.rating}
        </Text>
      </View>

      {/* Tags */}
      <View style={styles.tagContainer}>
        {item.tags.slice(0, 2).map((tag, index) => (
          <View
            key={index}
            style={styles.tag}>
            <Text style={styles.tagText}>
              {tag}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,

    backgroundColor: '#fff',

    borderRadius: 18,

    marginBottom: 16,

    padding: 10,

    elevation: 5,

    shadowColor: '#000',

    shadowOpacity: 0.12,

    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  image: {
    width: '100%',

    height: 130,

    borderRadius: 12,

    resizeMode: 'cover',

    backgroundColor: '#F2F2F2',
  },

  title: {
    marginTop: 10,

    fontSize: 15,

    fontWeight: '700',

    color: '#222',

    minHeight: 40,
  },

  description: {
    marginTop: 5,

    fontSize: 12,

    color: '#666',

    lineHeight: 18,

    minHeight: 36,
  },

  price: {
    marginTop: 10,

    fontSize: 18,

    fontWeight: 'bold',

    color: '#0A8F08',
  },

  stockContainer: {
    alignSelf: 'flex-start',

    marginTop: 8,

    backgroundColor: '#E8F5E9',

    paddingHorizontal: 8,

    paddingVertical: 4,

    borderRadius: 20,
  },

  stockText: {
    color: '#2E7D32',

    fontSize: 11,

    fontWeight: '600',
  },

  ratingContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 10,
  },

  ratingText: {
    marginLeft: 5,

    fontSize: 13,

    fontWeight: '600',

    color: '#555',
  },

  tagContainer: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    marginTop: 10,
  },

  tag: {
    backgroundColor: '#007AFF',

    paddingHorizontal: 8,

    paddingVertical: 4,

    borderRadius: 12,

    marginRight: 5,

    marginBottom: 5,
  },

  tagText: {
    color: '#fff',

    fontSize: 10,

    fontWeight: '600',
  },
});