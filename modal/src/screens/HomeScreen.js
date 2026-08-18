import React, { useState } from 'react';

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import Colors from '../constants/Colors';

import CenterModal from '../components/CenterModal';
import BottomSheetModal from '../components/BottomSheetModal';
import DeleteModal from '../components/DeleteModal';
import LoginModal from '../components/LoginModal';
import ImagePreviewModal from '../components/ImagePreviewModal';
import LoadingModal from '../components/LoadingModal';

const HomeScreen = () => {
  const [centerModal, setCenterModal] = useState(false);

  const [bottomSheet, setBottomSheet] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const [loginModal, setLoginModal] = useState(false);

  const [imageModal, setImageModal] = useState(false);

  const [loadingModal, setLoadingModal] = useState(false);

  const demoImage =
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=900';

  const handleDelete = () => {
    Alert.alert(
      'Success',
      'Item Deleted Successfully',
    );

    setDeleteModal(false);
  };

  const showLoading = () => {
    setLoadingModal(true);

    setTimeout(() => {
      setLoadingModal(false);

      Alert.alert(
        'Success',
        'Task Completed Successfully',
      );
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        React Native Modal Showcase
      </Text>

      <Text style={styles.subtitle}>
        Learn Different Types of Modal
      </Text>

      {/* Center Modal */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setCenterModal(true)}>

        <Text style={styles.buttonText}>
          Center Modal
        </Text>

      </TouchableOpacity>

      {/* Bottom Sheet */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setBottomSheet(true)}>

        <Text style={styles.buttonText}>
          Bottom Sheet
        </Text>

      </TouchableOpacity>

      {/* Delete Confirmation */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setDeleteModal(true)}>

        <Text style={styles.buttonText}>
          Delete Confirmation
        </Text>

      </TouchableOpacity>

      {/* Login Modal */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setLoginModal(true)}>

        <Text style={styles.buttonText}>
          Login Modal
        </Text>

      </TouchableOpacity>

      {/* Image Preview */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setImageModal(true)}>

        <Text style={styles.buttonText}>
          Image Preview
        </Text>

      </TouchableOpacity>

      {/* Loading */}

      <TouchableOpacity
        style={styles.button}
        onPress={showLoading}>

        <Text style={styles.buttonText}>
          Loading Modal
        </Text>

      </TouchableOpacity>

      {/* Center Modal */}

      <CenterModal
        visible={centerModal}
        onClose={() => setCenterModal(false)}
      />

      {/* Bottom Sheet */}

      <BottomSheetModal
        visible={bottomSheet}
        onClose={() => setBottomSheet(false)}
      />

      {/* Delete Modal */}

      <DeleteModal
        visible={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onDelete={handleDelete}
      />

      {/* Login Modal */}

      <LoginModal
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      />

      {/* Image Preview */}

      <ImagePreviewModal
        visible={imageModal}
        image={demoImage}
        onClose={() => setImageModal(false)}
      />

      {/* Loading Modal */}

      <LoadingModal
        visible={loadingModal}
      />

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },

  button: {
    height: 55,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 4,
  },

  buttonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
  },

});