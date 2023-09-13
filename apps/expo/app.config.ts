import { ExpoConfig } from "@expo/config";
import { config } from "dotenv";
config();

const CLERK_PUBLISHABLE_KEY =
  process.env.CLERK_PUBLISHABLE_KEY ??
  "pk_test_ZXhwZXJ0LWFsaWVuLTkxLmNsZXJrLmFjY291bnRzLmRldiQ";

const defineConfig = (): ExpoConfig => ({
  scheme: "com.app.ai-gear",
  name: "AI Gear",
  slug: "ai-gear",
  jsEngine: "hermes",
  version: "1.5.3",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
  },
  updates: {
    url: "https://u.expo.dev/bf8e06ea-b001-46f1-afe2-779b7007b9d0",
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.app.ai-gear",
    infoPlist: {
      NSBluetoothAlwaysUsageDescription:
        "AI Gear streams kinamatic data through bluetooth to give you preformace metrics",
    },
  },

  currentFullName: "AI Gear",
  android: {
    package: "com.app.aigear",
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
  runtimeVersion: {
    policy: "appVersion",
  },
});

export default defineConfig;
