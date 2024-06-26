import { MMKV } from "react-native-mmkv";

const mmkvStorage = new MMKV();

const storeKeyValue = (key: string, value: string) => mmkvStorage.set(key, value);
const getByKey = (key: string) => mmkvStorage.getString(key);
const deleteKey = (key: string) => mmkvStorage.delete(key);

export default { storeKeyValue, getByKey, deleteKey };
