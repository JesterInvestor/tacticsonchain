import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, Text, View, Linking, StyleSheet, ScrollView } from 'react-native';
import Waypoint from '@sky-mavis/waypoint-native';
import { v4 as uuidv4 } from 'uuid';
import { getWaypointOptions, NETWORK } from './waypointConfig';

const waypoint = new Waypoint(getWaypointOptions());

export default function App() {
  const [lastResponse, setLastResponse] = useState<string | null>(null);

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      try {
        const parsed = waypoint.onResponse(event.url);
        setLastResponse(JSON.stringify(parsed, null, 2));
      } catch (err) {
        setLastResponse('Failed to parse response: ' + String(err));
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink as any);

    // If opened from a cold start
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url } as any);
    });

    return () => subscription.remove();
  }, []);

  const authorize = async () => {
    const state = uuidv4();
    const deepLink = await waypoint.authorize(state, 'openid profile wallet');
    // trigger the deep link
    Linking.openURL(deepLink);
  };

  const sendNativeToken = async () => {
    const state = uuidv4();
    const to = '0xD36deD8E1927dCDD76Bfe0CC95a5C1D65c0a807a';
    const value = '100000000000000000'; // 0.1 RON in wei
    const deepLink = await waypoint.sendNativeToken(state, to, value);
    Linking.openURL(deepLink);
  };

  const personalSign = async () => {
    const state = uuidv4();
    const message = 'I accept the terms and conditions';
    const deepLink = await waypoint.personalSign(state, message);
    Linking.openURL(deepLink);
  };

  const signTypedData = async () => {
    const state = uuidv4();
    const typedData = JSON.stringify({ example: 'data' });
    const deepLink = await waypoint.signTypedData(state, typedData);
    Linking.openURL(deepLink);
  };

  const sendTransaction = async () => {
    const state = uuidv4();
    const to = '0x3c4e17b9056272ce1b49f6900d8cfd6171a1869d';
    const data = '0x';
    const value = '0x0';
    const deepLink = await waypoint.sendTransaction(state, to, data, value);
    Linking.openURL(deepLink);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
  <Text style={styles.title}>Ronin Waypoint RN Example ({NETWORK})</Text>
        <View style={styles.button}>
          <Button title="Authorize / Connect" onPress={authorize} />
        </View>
        <View style={styles.button}>
          <Button title="Send Native Token (0.1 RON)" onPress={sendNativeToken} />
        </View>
        <View style={styles.button}>
          <Button title="Personal Sign" onPress={personalSign} />
        </View>
        <View style={styles.button}>
          <Button title="Sign Typed Data" onPress={signTypedData} />
        </View>
        <View style={styles.button}>
          <Button title="Send Transaction" onPress={sendTransaction} />
        </View>

        <Text style={styles.subtitle}>Last response</Text>
        <Text style={styles.response}>{lastResponse ?? 'No response yet'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { padding: 16, alignItems: 'stretch' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  subtitle: { fontSize: 16, marginTop: 18, fontWeight: '600' },
  button: { marginVertical: 8 },
  response: { marginTop: 8, fontFamily: 'monospace' },
});
