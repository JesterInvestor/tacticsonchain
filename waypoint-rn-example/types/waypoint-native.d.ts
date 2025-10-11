declare module '@sky-mavis/waypoint-native' {
  type WaypointResponse = {
    state: string;
    success: boolean;
    error?: { code: number; message: string };
    data?: Record<string, string>;
  };

  type WaypointOptions = {
    waypointOrigin: string;
    clientId: string;
    redirectUri: string;
    rpcUrl: string;
    chainId: number;
  };

  export default class Waypoint {
    constructor(opts: WaypointOptions);
    authorize(state: string, scope?: string): Promise<string>;
    sendNativeToken(state: string, to: string, value: string, from?: string): Promise<string>;
    personalSign(state: string, message: string, from?: string): Promise<string>;
    signTypedData(state: string, typedData: string, from?: string): Promise<string>;
    sendTransaction(state: string, to: string, data?: string, value?: string, from?: string): Promise<string>;
    onResponse(deeplink: string): WaypointResponse;
    static parseDeeplink(deeplink: string): WaypointResponse;
  }
}
