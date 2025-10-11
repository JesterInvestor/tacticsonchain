# Ronin Waypoint — React Native integration

This document explains how to integrate the Ronin Waypoint React Native SDK (`@sky-mavis/waypoint-native`) into a React Native app. The repository includes a minimal example at `waypoint-rn-example/`.

Overview
- SDK: `@sky-mavis/waypoint-native`
- Functionality: authorize, sendNativeToken, personalSign, signTypedData, sendTransaction
- Deep link flow: the SDK returns deep links using your app's registered scheme (e.g. `mydapp://`). Your app must listen to deep links and call `waypoint.onResponse(url)` to parse the response.

Prerequisites
- React Native v0.65 or later (example targets 0.71)
- Android API level 24+ for Android builds
- iOS 13.0+ and Xcode 15.4+ for iOS builds
- A registered app and client ID in the Ronin Developer Console (Wallet > Wallet & Authentication)

Quick start (example)

1) Install dependencies in the example folder:

```powershell
cd waypoint-rn-example
npm install
```

2) Edit `App.tsx` and replace `YOUR_CLIENT_ID` with the `clientId` from the Ronin Developer Console. Also register a redirect URI (e.g. `mydapp://`) in the console and set the same value in `redirectUri`.

3) Ensure your native projects are configured to handle the deep link scheme `mydapp://`:

- Android: add intent filter for your scheme in `AndroidManifest.xml` or configure `android/app/src/main/AndroidManifest.xml`.
- iOS: configure the URL Types in Xcode (Info -> URL Types) and add the scheme.

4) Run on Android or iOS emulator/device:

```powershell
cd waypoint-rn-example
npx react-native start
npx react-native run-android
# or
npx react-native run-ios
```

Notes
- The example initializes Waypoint with `chainId: 2021` (Saigon testnet). Change this to `2020` for Ronin mainnet.
- You can quickly toggle networks by editing `waypoint-rn-example/waypointConfig.ts` and changing `export const NETWORK` to `'mainnet'` or `'saigon'`. The `getWaypointOptions()` helper will return the correct `chainId` and `rpcUrl`.
- Deep link parsing: the example registers a listener using `Linking.addEventListener('url', ...)` and calls `waypoint.onResponse(url)`.
- All SDK functions return a deep link string; the example opens that link with `Linking.openURL(deeplink)` to hand control to the Waypoint app/UX.

Security
- Keep `clientId` private for your project; store it in secure env configuration or native secrets storage where possible.

If you'd like, I can:
- Add a simple TypeScript declaration for `@sky-mavis/waypoint-native` used in this project (if the package doesn't ship types).
- Add deeper Android/iOS manifest examples and RN config snippets.
