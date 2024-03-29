import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
//trpc
import { TRPCProvider } from "./utils/trpc";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
//theme
import { Provider as PaperProvider } from 'react-native-paper';
//custom
import { CombinedDarkTheme, CombinedDefaultTheme, PreferencesContext } from './perfereneces';
import { RootScreen } from './_root';
import { AuthRoot } from "./screens/auth/auth-tab";


export type AuthParamsList = {
  Home: Record<string, never>;
};

export const App = () => {

  const [isThemeDark, setIsThemeDark] = React.useState(false);

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <ClerkProvider
          publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
          tokenCache={tokenCache}
        >
          <SignedIn>
            <TRPCProvider>
              <SafeAreaProvider>
                <StatusBar />
                <RootScreen />
              </SafeAreaProvider>
            </TRPCProvider>
          </SignedIn>
          <SignedOut>
            <AuthRoot />
            <StatusBar />
          </SignedOut>
        </ClerkProvider>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};
