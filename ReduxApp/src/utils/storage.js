import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_KEY = 'USER_DATA';

// Save logged-in user data
export const saveUserData = async userData => {
  try {
    await AsyncStorage.setItem(
      USER_DATA_KEY,
      JSON.stringify(userData),
    );
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Get logged-in user data
export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_DATA_KEY);

    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Remove logged-in user data
export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
  } catch (error) {
    console.error('Error removing user data:', error);
  }
};