import { ToastAndroid } from "react-native";

const Toast = (message: string) => {
  return ToastAndroid.show(message, 250);
};

export default Toast;
