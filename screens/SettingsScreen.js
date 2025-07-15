import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { ThemeContext } from '../contexts/ThemeContext';

import { loadContacts } from '../storage/contactStorage';

import RNFS from 'react-native-fs';
import { PermissionsAndroid, Platform } from 'react-native';

const COLORS = ['#2196F3', '#4CAF50', '#FF5722', '#9C27B0', '#E91E63'];

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to storage to export contacts',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const generateVCard = contact => {
  return `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL;TYPE=CELL:${contact.mobile}
EMAIL:${contact.email}
ADR;TYPE=HOME:;;${contact.address}
END:VCARD`;
};

const generateVCardFileContent = contacts =>
  contacts.map(generateVCard).join('\n');

const exportContactsToFile = async contacts => {
  const granted = await requestStoragePermission();
  if (!granted) {
    Alert.alert('Permission Denied', 'Cannot write to storage');
    return;
  }

  const vcfContent = generateVCardFileContent(contacts);
  const fileName = `contacts_${Date.now()}.vcf`;
  const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

  try {
    await RNFS.writeFile(path, vcfContent, 'utf8');
    Alert.alert('Success', `Contacts exported to Downloads folder.`);
  } catch (err) {
    console.error('Export failed:', err);
    Alert.alert('Error', 'Failed to export contacts.');
  }
};

export default function SettingsScreen() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const stored = await loadContacts();
      setContacts(stored);
    };
    fetchContacts();
  }, []);

  const {
    themeMode,
    toggleTheme,
    themeColor,
    setThemeColor,
    fontSize,
    setFontSize,
  } = useContext(ThemeContext);

  const handleExport = async () => {
    const storedContacts = await loadContacts();
    exportContactsToFile(storedContacts);
  };

  const styles = getStyles(themeMode, themeColor);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeMode === 'dark' ? '#111' : '#fff' },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: themeMode === 'dark' ? '#fff' : '#000' },
        ]}
      >
        Theme Mode: {themeMode.toUpperCase()}
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} color={themeColor} />

      <Text
        style={[
          styles.title,
          { marginTop: 20, color: themeMode === 'dark' ? '#fff' : '#000' },
        ]}
      >
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

      <Text
        style={[
          styles.title,
          { marginTop: 20, color: themeMode === 'dark' ? '#fff' : '#000' },
        ]}
      >
        Theme Color
      </Text>
      <View style={styles.colorContainer}>
        {COLORS.map(color => (
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
      <View>
        <TouchableOpacity
          onPress={() => exportContactsToFile(contacts)}
          style={styles.exportBtn}
        >
          <Text style={{ color: themeColor }}>Export Contacts to .vcf</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (themeMode, themeColor) =>
  StyleSheet.create({
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
    exportBtn: {
      marginTop: 30,
      padding: 15,
      borderWidth: 2,
      borderColor: themeColor,
    },
  });
