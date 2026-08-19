import React from 'react';

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';

const BottomSheetModal = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>

      <TouchableOpacity
        activeOpacity={1}
        style={styles.overlay}
        onPress={onClose}>

        <TouchableOpacity
          activeOpacity={1}
          style={styles.container}>

          <View style={styles.line} />

          <Text style={styles.title}>
            Select Option
          </Text>

          <TouchableOpacity style={styles.item}>

            <Icon
              name="camera-outline"
              size={26}
              color="#007AFF"
            />

            <Text style={styles.itemText}>
              Camera
            </Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>

            <Icon
              name="images-outline"
              size={26}
              color="#007AFF"
            />

            <Text style={styles.itemText}>
              Gallery
            </Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>

            <Icon
              name="document-outline"
              size={26}
              color="#007AFF"
            />

            <Text style={styles.itemText}>
              Files
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancel}
            onPress={onClose}>

            <Text style={styles.cancelText}>
              Cancel
            </Text>

          </TouchableOpacity>

        </TouchableOpacity>

      </TouchableOpacity>

    </Modal>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({

  overlay:{
    flex:1,
    justifyContent:'flex-end',
    backgroundColor:'rgba(0,0,0,0.45)',
  },

  container:{
    backgroundColor:'#fff',

    borderTopLeftRadius:30,

    borderTopRightRadius:30,

    padding:25,
  },

  line:{
    width:60,

    height:5,

    borderRadius:10,

    backgroundColor:'#ccc',

    alignSelf:'center',

    marginBottom:20,
  },

  title:{
    fontSize:22,

    fontWeight:'700',

    textAlign:'center',

    marginBottom:20,

    color:Colors.black,
  },

  item:{
    flexDirection:'row',

    alignItems:'center',

    paddingVertical:18,

    borderBottomWidth:0.5,

    borderColor:'#ddd',
  },

  itemText:{
    marginLeft:18,

    fontSize:18,

    color:'#333',

    fontWeight:'600',
  },

  cancel:{
    marginTop:18,

    backgroundColor:'#F2F2F2',

    borderRadius:12,

    height:52,

    justifyContent:'center',

    alignItems:'center',
  },

  cancelText:{
    color:'red',

    fontWeight:'700',

    fontSize:17,
  },

});