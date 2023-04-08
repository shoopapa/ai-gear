import { ExpoConfig, ConfigContext } from "@expo/config";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_ZXhwZXJ0LWFsaWVuLTkxLmNsZXJrLmFjY291bnRzLmRldiQ";

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
  scheme: "com.jdavis.ai-gear",
  name: "AI Gear",
  slug: "ai-gear",
  jsEngine: "hermes",
  version: "1.2.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
  },
  updates: {
    url: "https://u.expo.dev/bf8e06ea-b001-46f1-afe2-779b7007b9d0",
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.jdavis.ai-gear",
    infoPlist: {
      NSBluetoothAlwaysUsageDescription: "Can I use bluetooth",
    },
  },

  currentFullName: "@joedavis29@ai-gear",
  originalFullName: "@joedavis29@ai-gear",
  android: {
    package: "com.jdavis.aigear",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#2e026d",
    },
  },
  extra: {
    eas: {
      projectId: "bf8e06ea-b001-46f1-afe2-779b7007b9d0",
    },
    CLERK_PUBLISHABLE_KEY,
  },
  plugins: [
    ["./expo-plugins/with-modify-gradle.js"],
    ["./expo-plugins/fix-rn-codegen.js"],
    [
      "expo-build-properties",
      {
        ios: {
          deploymentTarget: "14.0",
        },
      },
    ],
  ],
  runtimeVersion: "1.0.0",
});

export default defineConfig;
