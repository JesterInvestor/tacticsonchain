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

Overview

The Ronin Waypoint React Native SDK lets developers integrate the account and wallet features of the Ronin Waypoint service into Android and iOS apps developed with React Native. After the integration, users can sign in to your app with their Ronin Waypoint account and connect their keyless wallet for instant in-app transactions.

Usage

All functions of the SDK return a string in the format of the deep link schema that you registered in the Ronin Developer Console. For example, mydapp://.
To parse deep links returned by the SDK, use the Deep link parser utility or implement your own parser.
Package repository: @sky-mavis/waypoint-native.

Features

- Authorize users: let users sign in to your app with Ronin Waypoint to connect their keyless wallet and an optional externally owned account (EOA) wallet.
- Send transactions: transfer RON, ERC-20 tokens, and make contract calls for in-game transactions.
- Sign messages and typed data: have users sign messages and structured data to prove ownership of their wallet and authorize transactions.

Prerequisites

- React Native version 0.65 or later.
- To deploy to Android, Android API level 24 or later.
- To deploy to iOS, iOS 13.0 or later and Xcode 15.4 or later.
- An app created in the Ronin Developer Console.
- Initialize and set up configuration for your project following this guideline
- A client ID that you can find in the Ronin Developer Console under Wallet > Wallet & Authentication > CLIENT ID (PROJECT ID).
- A redirect URI registered in the Ronin Developer Console under Wallet > Wallet & Authentication > REDIRECT URI.
For more information about the initial setup, see Get started.

Example app

The React Native SDK includes an example app that demonstrates the SDK features. To run the app, follow these steps:

- Clone the skymavis/waypoint-native repository.
- Run yarn to install the dependencies.
- For Android example, run yarn example android to build and run the app on an Android emulator or device. For iOS, run yarn example ios.

Setup

Installation

Set Android SDK version

For Android apps, set the minimum Android SDK version to 24 in the gradle.properties file:

WaypointNative_minSdkVersion=24

Set up navigation and deep linking

To handle the deep links returned by the server, set up navigation and deep linking in your app. For more information, see the following guides:

React Navigation: Stack Navigator
React Navigation: Deep Linking

Install the package

Run the following command to install the SDK:

npm
Yarn
pnpm
npm install @sky-mavis/waypoint-native

Initialization

Initialize the client:

import Waypoint from "@sky-mavis/waypoint-native";

export const waypoint = new Waypoint({
	waypointOrigin: "https://waypoint.roninchain.com",
	clientId: "69359809-e7ab-4156-9a5f-bed4a6302cee",
	redirectUri: "mydapp://",
	rpcUrl: "https://api.roninchain.com/rpc",
	chainId: 2020,
});

Parameters:

waypointOrigin: the base URL of Ronin Waypoint for all API calls as https://waypoint.roninchain.com.
clientId: the client ID registered in the Ronin Developer Console.
redirectUri: the redirect URI registered in the Ronin Developer Console.
rpcUrl: the RPC endpoint through which you want to connect to Ronin. The example uses a public endpoint for the Saigon testnet: https://saigon-testnet.roninchain.com/rpc. For more information, see RPC endpoints.
chainId: the ID of the Ronin chain you want to connect to. Use 2021 for the Saigon testnet and 2020 for the Ronin mainnet.
To capture the response, put the waypoint.onResponse on your App.tsx method:

App.tsx
export default function App() {
	useEffect(() => {
		const handleDeepLink = async (event: { url: string }) => {
			waypoint.onResponse(event.url);
		};

		const unsubscribe = Linking.addEventListener("url", handleDeepLink);

		return () => {
			unsubscribe.remove();
		};
	}, []);
}

Usage

User authorization and wallet connection

Use the authorize function to sign in to a Ronin Waypoint account, connect the user's wallet, and return an ID token and the user's keyless wallet address.

authorize(state: string, scope?: string): Promise<string>

Parameters:

state: a unique random identifier used to manage requests from the client to Ronin Waypoint.
scope: The OAuth 2.0 scope. Available values are openid, profile, email, and wallet.
Example:

const authorize = async () => {
	const state = uuidv4();
	const result = await waypoint.authorize(state);
};

Wallet interactions

RON transfer

Use the sendNativeToken function to send RON tokens to a recipient's address. The function returns a response containing the transaction hash.

sendNativeToken(state: string, to: string, value: string, from?: string): Promise<string>

Parameters:

state: a unique random identifier used to manage requests from the client to Ronin Waypoint.
to: the recipient address.
value: the amount of RON to send, specified in wei (1 RON = 10^18 wei).
from: the sender address.
Example: transfer 0.1 RON to another address.

const sendNativeToken = async () => {
	const state = uuidv4();
	const to = "0xD36deD8E1927dCDD76Bfe0CC95a5C1D65c0a807a";
	const value = "100000000000000000";
	const result = await waypoint.sendNativeToken(state, to, value);
};

Message signing
