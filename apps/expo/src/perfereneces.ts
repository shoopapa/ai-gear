import React from "react";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider, useTheme } from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  DefaultTheme,
} from "react-native-paper";
import merge from "deepmerge";
//custom

export type PreferencesContextType = {
  toggleTheme: () => void;
  isThemeDark: boolean;
};
export const initPreferencesContext: PreferencesContextType = {
  isThemeDark: false,
  toggleTheme: () => {},
};
export const PreferencesContext = React.createContext<PreferencesContextType>(
  initPreferencesContext,
);
//theme

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme1 = merge(MD3DarkTheme, LightTheme);
export const CombinedDarkTheme1 = merge(MD3LightTheme, DarkTheme);

export const CombinedDefaultTheme = {
  ...CombinedDefaultTheme1,
  colors: {
    ...CombinedDefaultTheme1.colors,
    defaultBackgroundColor: "white",
    primary: "#19489f",
    warningYellow: "#f69220",
    primaryByOpacity: () => {
      return "rgba(25, 72, 159, 1)";
    },
    disabledPrimary: "#19489fa6",
    accent: "#6595ed",
    gray: "#f1f3f3",
    error: DefaultTheme.colors.error,
    darkgray: "rgb(150 150 150)",
    success: "#66bb6a",
  },
};
export const CombinedDarkTheme: typeof CombinedDefaultTheme = {
  ...CombinedDarkTheme1,
  colors: {
    ...CombinedDarkTheme1.colors,
    defaultBackgroundColor: "black",
    primary: "#19489f",
    warningYellow: "#f69220",
    primaryByOpacity: () => {
      return "rgba(25, 72, 159, 1)";
    },
    disabledPrimary: "#19489fa6",
    accent: "#6595ed",
    gray: "#282c34",
    darkgray: "rgb(150 150 150)",
    error: "#9c2121",
    success: "#66bb6a",
  },
};

export const useMyTheme = useTheme<typeof CombinedDefaultTheme>;

export const styles = (theme: typeof CombinedDefaultTheme) => {
  return StyleSheet.create({
    TabHeaderContent: {
      color: "white",
      backgroundColor: theme.colors.defaultBackgroundColor,
    },
    navigatorContent: {
      backgroundColor: theme.colors.defaultBackgroundColor,
    },
    scrollcontainer: {
      flex: 1,
      backgroundColor: theme.colors.defaultBackgroundColor,
      alignItems: "center",
    },
    container: {
      backgroundColor: theme.colors.defaultBackgroundColor,
      flex: 1,
      paddingTop: 0,
      color: "black",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    TextInputWrapper: {
      width: "80%",
      height: 60,
      flex: 0,
    },
    centeredView: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      width: "80%",
      margin: 20,
      backgroundColor: theme.colors.defaultBackgroundColor,
      borderRadius: 15,
      padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      textTransform: "uppercase",
      margin: 15,
      textAlign: "center",
    },
  });
};
