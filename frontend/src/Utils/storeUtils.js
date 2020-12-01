import RNSInfo from 'react-native-sensitive-info';

const STORE_NAME = '5c8d0b519a6b863eb3ee2f8c2859686d';

export const saveDataToStore = async (key, value) =>
  await RNSInfo.setItem(key, value, {
    sharedPreferencesName: STORE_NAME,
    keychainService: STORE_NAME,
  });

export const getDataFromStore = async (key) =>
  await RNSInfo.getItem(key, {
    sharedPreferencesName: STORE_NAME,
    keychainService: STORE_NAME,
  });

export const deleteDataFromStore = async (key) => {
  return RNSInfo.deleteItem(key, {
    sharedPreferencesName: STORE_NAME,
    keychainService: STORE_NAME,
  });
};
