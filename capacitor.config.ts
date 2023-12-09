import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'SharePhotos',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
