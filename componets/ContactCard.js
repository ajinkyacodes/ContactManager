import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../contexts/ThemeContext';

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const { themeMode, themeColor, fontSize } = useContext(ThemeContext);

  const styles = getStyles(themeMode, themeColor, fontSize);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{contact.name}</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={onEdit}>
            <Icon name="edit" size={24} color={themeColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={{ marginLeft: 10 }}>
            <Icon name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.detail}>📧 {contact.email}</Text>
      <Text style={styles.detail}>📱 {contact.mobile}</Text>
      <Text style={styles.detail}>🏠 {contact.address}</Text>
    </View>
  );
};

const getStyles = (themeMode, themeColor, fontSize) =>
  StyleSheet.create({
    card: {
      backgroundColor: themeMode === 'dark' ? '#222' : '#fff',
      borderRadius: 8,
      padding: 12,
      marginVertical: 6,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    name: {
      fontSize: fontSize + 2,
      fontWeight: 'bold',
      color: themeMode === 'dark' ? '#fff' : '#000',
    },
    iconRow: {
      flexDirection: 'row',
    },
    detail: {
      marginTop: 4,
      fontSize,
      color: themeMode === 'dark' ? '#ccc' : '#333',
    },
  });

export default ContactCard;
