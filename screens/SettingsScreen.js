import React, { useContext } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { ThemeContext } from '../contexts/ThemeContext';

const COLORS = ['#2196F3', '#4CAF50', '#FF5722', '#9C27B0', '#E91E63'];

export default function SettingsScreen() {
  const {
    themeMode,
    toggleTheme,
    themeColor,
    setThemeColor,
    fontSize,
    setFontSize,
  } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: themeMode === 'dark' ? '#111' : '#fff' }]}>
      <Text style={[styles.title, { color: themeMode === 'dark' ? '#fff' : '#000' }]}>
        Theme Mode: {themeMode.toUpperCase()}
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} color={themeColor} />

      <Text style={[styles.title, { marginTop: 20, color: themeMode === 'dark' ? '#fff' : '#000' }]}>
        Font Size: {Math.round(fontSize)}
      </Text>
      <Slider
        minimumValue={12}
        maximumValue={24}
        value={fontSize}
        onValueChange={setFontSize}
        step={1}
        style={{ width: '100%' }}
        minimumTrackTintColor={themeColor}
        maximumTrackTintColor="#ccc"
        thumbTintColor={themeColor}
      />

      <Text style={[styles.title, { marginTop: 20, color: themeMode === 'dark' ? '#fff' : '#000' }]}>
        Theme Color
      </Text>
      <View style={styles.colorContainer}>
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorBox,
              {
                backgroundColor: color,
                borderWidth: color === themeColor ? 3 : 1,
                borderColor: '#888',
              },
            ]}
            onPress={() => setThemeColor(color)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
    flexWrap: 'wrap',
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
});
