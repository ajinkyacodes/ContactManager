import AsyncStorage from '@react-native-async-storage/async-storage';

const CONTACTS_KEY = '@contacts_list';

export const saveContacts = async (contacts) => {
  try {
    const jsonValue = JSON.stringify(contacts);
    await AsyncStorage.setItem(CONTACTS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save contacts:', e);
  }
};

export const loadContacts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CONTACTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load contacts:', e);
    return [];
  }
};
