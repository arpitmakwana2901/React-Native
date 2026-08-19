import { useState } from 'react';
import {
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImageLibraryOptions,
  CameraOptions,
  Asset,
} from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { Attachment } from '../types';

export const useMediaPicker = () => {
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Request Android Permissions
  const requestAndroidPermission = async (type: 'camera' | 'gallery'): Promise<boolean> => {
    try {
      const permissions: string[] = [];

      if (Platform.OS === 'android') {
        const androidVersion = Platform.Version as number;

        // Android 13+ (API 33+)
        if (androidVersion >= 33) {
          if (type === 'gallery') {
            permissions.push(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
            );
          } else {
            permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
          }
        } else {
          // Android 12 and below
          if (type === 'gallery') {
            permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
          } else {
            permissions.push(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
          }
        }

        if (permissions.length === 0) return true;

        const result = await PermissionsAndroid.requestMultiple(
          permissions as any
        );

        const allGranted = Object.values(result).every(
          (status) => status === PermissionsAndroid.RESULTS.GRANTED
        );

        if (!allGranted) {
          Alert.alert(
            'Permission Required',
            'Please grant permissions to use this feature.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Settings', onPress: () => {} }
            ]
          );
          return false;
        }
        return true;
      }
      return true;
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  };

  // ✅ Request iOS Permissions
  const requestIosPermission = async (type: 'camera' | 'gallery'): Promise<boolean> => {
    try {
      const permission = type === 'camera' 
        ? PERMISSIONS.IOS.CAMERA 
        : PERMISSIONS.IOS.PHOTO_LIBRARY;

      const status = await check(permission);

      if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
        return true;
      }

      if (status === RESULTS.DENIED) {
        const result = await request(permission);
        return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
      }

      if (status === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Required',
          'Please enable permission from settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => {} }
          ]
        );
        return false;
      }

      return false;
    } catch (error) {
      console.error('iOS permission error:', error);
      return false;
    }
  };

  // ✅ Unified Permission Request
  const requestPermission = async (type: 'camera' | 'gallery'): Promise<boolean> => {
    if (Platform.OS === 'android') {
      return await requestAndroidPermission(type);
    } else {
      return await requestIosPermission(type);
    }
  };

  // ✅ PICK IMAGE FROM GALLERY
  const pickImage = async (): Promise<Attachment | null> => {
    const hasPermission = await requestPermission('gallery');
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access gallery.');
      return null;
    }

    setIsLoading(true);
    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
        selectionLimit: 1,
      };

      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        return null;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to pick image');
        return null;
      }

      if (result.assets && result.assets.length > 0) {
        const asset: Asset = result.assets[0];
        return {
          id: Date.now().toString(),
          type: 'image',
          name: asset.fileName || `Image_${Date.now()}`,
          url: asset.uri || '',
          thumbnail: asset.uri || '',
          file: asset,
        };
      }
      return null;
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
      console.error('Pick image error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ PICK VIDEO FROM GALLERY
  const pickVideo = async (): Promise<Attachment | null> => {
    const hasPermission = await requestPermission('gallery');
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access gallery.');
      return null;
    }

    setIsLoading(true);
    try {
      const options: ImageLibraryOptions = {
        mediaType: 'video',
        quality: 0.8,
        includeBase64: false,
        selectionLimit: 1,
      };

      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        return null;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to pick video');
        return null;
      }

      if (result.assets && result.assets.length > 0) {
        const asset: Asset = result.assets[0];
        return {
          id: Date.now().toString(),
          type: 'video',
          name: asset.fileName || `Video_${Date.now()}`,
          url: asset.uri || '',
          thumbnail: asset.uri || '',
          file: asset,
        };
      }
      return null;
    } catch (error) {
      Alert.alert('Error', 'Failed to pick video');
      console.error('Pick video error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ CAPTURE IMAGE FROM CAMERA
  const captureImage = async (): Promise<Attachment | null> => {
    const hasPermission = await requestPermission('camera');
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access camera.');
      return null;
    }

    setIsLoading(true);
    try {
      const options: CameraOptions = {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
        saveToPhotos: true,
        cameraType: 'back',
      };

      const result = await launchCamera(options);

      if (result.didCancel) {
        return null;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to capture image');
        return null;
      }

      if (result.assets && result.assets.length > 0) {
        const asset: Asset = result.assets[0];
        return {
          id: Date.now().toString(),
          type: 'camera',
          name: `Camera_${Date.now()}`,
          url: asset.uri || '',
          thumbnail: asset.uri || '',
          file: asset,
        };
      }
      return null;
    } catch (error) {
      Alert.alert('Error', 'Failed to capture image');
      console.error('Capture image error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ CAPTURE VIDEO FROM CAMERA
  const captureVideo = async (): Promise<Attachment | null> => {
    const hasPermission = await requestPermission('camera');
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access camera.');
      return null;
    }

    setIsLoading(true);
    try {
      const options: CameraOptions = {
        mediaType: 'video',
        quality: 0.8,
        includeBase64: false,
        saveToPhotos: true,
        videoQuality: 'medium',
      };

      const result = await launchCamera(options);

      if (result.didCancel) {
        return null;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to capture video');
        return null;
      }

      if (result.assets && result.assets.length > 0) {
        const asset: Asset = result.assets[0];
        return {
          id: Date.now().toString(),
          type: 'video',
          name: `Video_${Date.now()}`,
          url: asset.uri || '',
          thumbnail: asset.uri || '',
          file: asset,
        };
      }
      return null;
    } catch (error) {
      Alert.alert('Error', 'Failed to capture video');
      console.error('Capture video error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ ADD LINK
  const addLink = (): Promise<Attachment | null> => {
    return new Promise((resolve) => {
      Alert.prompt(
        'Add Link',
        'Enter the URL:',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => resolve(null),
          },
          {
            text: 'Add',
            onPress: (url: string | undefined) => {
              if (url && url.trim()) {
                const validUrl = url.trim().startsWith('http')
                  ? url.trim()
                  : `https://${url.trim()}`;
                resolve({
                  id: Date.now().toString(),
                  type: 'link',
                  name: 'Link',
                  url: validUrl,
                });
              } else {
                resolve(null);
              }
            },
          },
        ],
        'plain-text',
        'https://'
      );
    });
  };

  return {
    pickImage,
    pickVideo,
    captureImage,
    captureVideo,
    addLink,
    isLoading,
  };
};