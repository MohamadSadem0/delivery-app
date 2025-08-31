import { Alert } from 'react-native';

export function toast(message: string, title = 'Info') {
  Alert.alert(title, message);
}
