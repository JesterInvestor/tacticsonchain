declare module 'react-native' {
  import * as React from 'react';

  export const SafeAreaView: React.ComponentType<any>;
  export const Button: React.ComponentType<any>;
  export const Text: React.ComponentType<any>;
  export const View: React.ComponentType<any>;
  export const ScrollView: React.ComponentType<any>;
  export const StyleSheet: {
    create(styles: Record<string, any>): Record<string, any>;
  };

  export const Linking: {
    getInitialURL(): Promise<string | null>;
    openURL(url: string): Promise<void>;
  };

  export default {} as any;
}
