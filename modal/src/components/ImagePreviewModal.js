import React from 'react';

import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const ImagePreviewModal = ({
  visible,
  image,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade">

      <View style={styles.overlay}>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}>

          <Icon
            name="close-circle"
            size={40}
            color="#fff"
          />

        </TouchableOpacity>

        <Image
          source={{ uri: image }}
          style={styles.image}
        />

      </View>

    </Modal>
  );
};

export default ImagePreviewModal;

const styles = StyleSheet.create({

  overlay:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.95)',
    justifyContent:'center',
    alignItems:'center',
  },

  closeButton:{
    position:'absolute',
    top:60,
    right:25,
    zIndex:100,
  },

  image:{
    width:'92%',
    height:420,
    borderRadius:18,
    resizeMode:'contain',
  },

});