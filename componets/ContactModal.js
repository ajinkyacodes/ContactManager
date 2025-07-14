import React, { useContext } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const ContactModal = ({
  visible,
  onClose,
  onSave,
  contact,
  setContact,
  isEdit
}) => {
  const { themeMode, themeColor, fontSize } = useContext(ThemeContext);

  const styles = getStyles(themeMode, themeColor, fontSize);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{isEdit ? 'Edit Contact' : 'Add Contact'}</Text>

          <TextInput
            placeholder="Name"
            value={contact.name}
            onChangeText={(text) => setContact({ ...contact, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={contact.email}
            onChangeText={(text) => setContact({ ...contact, email: text })}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Mobile"
            value={contact.mobile}
            onChangeText={(text) => setContact({ ...contact, mobile: text })}
            style={styles.input}
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="Address"
            value={contact.address}
            onChangeText={(text) => setContact({ ...contact, address: text })}
            style={styles.input}
            multiline
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSave} style={[styles.saveButton, { backgroundColor: themeColor }]}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (themeMode, themeColor, fontSize) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: themeMode === 'dark' ? '#333' : '#fff',
      width: '90%',
      borderRadius: 10,
      padding: 20,
    },
    modalTitle: {
      fontSize: fontSize + 2,
      fontWeight: 'bold',
      marginBottom: 10,
      color: themeMode === 'dark' ? '#fff' : '#000',
    },
    input: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
      fontSize,
      color: themeMode === 'dark' ? '#fff' : '#000',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 15,
    },
    cancelButton: {
      marginRight: 10,
    },
    cancelText: {
      color: 'red',
      fontSize,
    },
    saveButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 5,
    },
    saveText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize,
    },
  });

export default ContactModal;
