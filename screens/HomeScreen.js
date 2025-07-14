import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { loadContacts, saveContacts } from '../storage/contactStorage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ContactCard from '../componets/ContactCard';
import ContactModal from '../componets/ContactModal';

const HomeScreen = () => {
  const { themeMode, themeColor, fontSize } = useContext(ThemeContext);

  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentContactIndex, setCurrentContactIndex] = useState(null);
  const [contact, setContact] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
  });

  useEffect(() => {
    loadContacts().then(setContacts);
  }, []);

  const handleSave = async () => {
    if (!contact.name || !contact.mobile) {
      Alert.alert('Name and Mobile are required');
      return;
    }

    let updatedContacts = [...contacts];

    if (isEdit) {
      updatedContacts[currentContactIndex] = contact;
    } else {
      updatedContacts.push(contact);
    }

    setContacts(updatedContacts);
    await saveContacts(updatedContacts);
    closeModal();
  };

  const handleEdit = index => {
    setIsEdit(true);
    setCurrentContactIndex(index);
    setContact(contacts[index]);
    setModalVisible(true);
  };

  const handleDelete = async index => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            const updatedContacts = contacts.filter((_, i) => i !== index);
            setContacts(updatedContacts);
            await saveContacts(updatedContacts);
          },
          style: 'destructive',
        },
      ],
    );
  };

  const openAddModal = () => {
    setIsEdit(false);
    setContact({ name: '', email: '', mobile: '', address: '' });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setContact({ name: '', email: '', mobile: '', address: '' });
    setIsEdit(false);
  };

  const styles = getStyles(themeMode, themeColor, fontSize);

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No contacts found.</Text>
        }
        renderItem={({ item, index }) => (
          <ContactCard
            contact={item}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        )}
      />

      {/* FAB to Add Contact */}
      <TouchableOpacity style={styles.fab} onPress={openAddModal}>
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal for Add/Edit */}
      <ContactModal
        visible={modalVisible}
        onClose={closeModal}
        onSave={handleSave}
        contact={contact}
        setContact={setContact}
        isEdit={isEdit}
      />
    </View>
  );
};

const getStyles = (themeMode, themeColor, fontSize) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeMode === 'dark' ? '#111' : '#f0f0f0',
      padding: 10,
    },
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
    emptyText: {
      textAlign: 'center',
      fontSize,
      marginTop: 40,
      color: '#888',
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      backgroundColor: themeColor,
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
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

export default HomeScreen;
