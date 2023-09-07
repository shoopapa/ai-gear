import { useHeaderHeight } from '@react-navigation/elements';
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderAdjustedKeyboardAvoidingViewProps = {
  children: React.ReactNode;
  style?: ViewStyle
}

export const HeaderAdjustedKeyboardAvoidingView = ({ children, style }: HeaderAdjustedKeyboardAvoidingViewProps) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={StyleSheet.compose(style, { marginBottom: insets.bottom })}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={true}
      keyboardVerticalOffset={headerHeight + insets.bottom}>
      {children}
    </KeyboardAvoidingView>
  );
}
