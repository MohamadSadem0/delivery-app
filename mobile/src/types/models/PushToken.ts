export type PushToken = {
  deviceId: string;         // SecureStore device id
  platform: 'ios' | 'android' | 'web';
  token: string;
  updatedAt: string;
};
