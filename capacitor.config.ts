import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.budsproductions.quickquoteauto',
  appName: 'QuickQuote Auto',
  webDir: 'www',
  server: {
    url: 'https://cosy-satellite-269.higgsfield.app',
    cleartext: false
  }
};

export default config;
