import _AsyncStorage from "@react-native-async-storage/async-storage";

export type StorageKeys = "session";

const AsyncStorage = {
  async getItem<T>(key: StorageKeys): Promise<T | null> {
    try {
      const value = await _AsyncStorage.getItem(key);
      return value !== null ? (JSON.parse(value) as T) : null;
    } catch (error) {
      console.log("Error getting data from AsyncStorage:", error);
      return null;
    }
  },

  async setItem(key: StorageKeys, value: unknown) {
    try {
      await _AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("Error setting data in AsyncStorage:", error);
    }
  },

  async removeItem(key: StorageKeys) {
    try {
      await _AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Error removing data from AsyncStorage:", error);
    }
  },
};

export default AsyncStorage;
