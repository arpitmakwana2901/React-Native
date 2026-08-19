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

const DeleteModal = ({
  visible,
  onCancel,
  onDelete,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}>

      <View style={styles.overlay}>

        <View style={styles.container}>

          <View style={styles.iconContainer}>

            <Icon
              name="trash"
              size={45}
              color="#FF3B30"
            />

          </View>

          <Text style={styles.title}>
            Delete Item?
          </Text>

          <Text style={styles.message}>
            Are you sure you want to delete this item?
            This action cannot be undone.
          </Text>

          <View style={styles.buttonRow}>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}>

              <Text style={styles.cancelText}>
                Cancel
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onDelete}>

              <Text style={styles.deleteText}>
                Delete
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </View>

    </Modal>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({

  overlay:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.45)',
  },

  container:{
    width:'88%',
    backgroundColor:'#fff',
    borderRadius:22,
    padding:25,
    alignItems:'center',
    elevation:10,
  },

  iconContainer:{
    width:80,
    height:80,
    borderRadius:40,
    backgroundColor:'#FFECEC',
    justifyContent:'center',
    alignItems:'center',
  },

  title:{
    fontSize:24,
    fontWeight:'700',
    color:'#222',
    marginTop:18,
  },

  message:{
    fontSize:15,
    color:'#666',
    textAlign:'center',
    lineHeight:24,
    marginTop:12,
  },

  buttonRow:{
    flexDirection:'row',
    marginTop:28,
  },

  cancelButton:{
    flex:1,
    height:48,
    backgroundColor:'#F2F2F2',
    borderRadius:12,
    justifyContent:'center',
    alignItems:'center',
    marginRight:10,
  },

  deleteButton:{
    flex:1,
    height:48,
    backgroundColor:'#FF3B30',
    borderRadius:12,
    justifyContent:'center',
    alignItems:'center',
  },

  cancelText:{
    fontWeight:'700',
    fontSize:16,
    color:'#333',
  },

  deleteText:{
    fontWeight:'700',
    fontSize:16,
    color:'#fff',
  },

});