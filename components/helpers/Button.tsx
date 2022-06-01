import React from 'react';
import { Platform, Text, View, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
    const {
        onPress,
        style = styles.button,
        styleText = styles.text,
        title = 'Save',
        styleDisabled = styles.buttonDisabled,
        styleTextDisable = styles.textDisabled
    } = props;

    const disabled =
      props.disabled != null
        ? props.disabled
        : props.accessibilityState?.disabled;

    if (disabled) {
      style.push(styleDisabled);
      textStyles.push(styleTextDisabled);
    }

    return (
        <Pressable style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.text, styleText]}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      backgroundColor: '#3996d1',
      borderRadius: 2,
    },
  }),
  text: {
    textAlign: 'center',
    margin: 8,
    ...Platform.select({
      ios: {
        color: '#3996d1',
        fontSize: 18,
      },
      android: {
        color: '#083b66',
        fontWeight: '500',
      },
    }),
  },
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf',
    },
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#cdcdcd',
    },
    android: {
      color: '#a1a1a1',
    },
  }),
});
