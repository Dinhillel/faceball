import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import LanguagePicker from './LanguagePicker';
import DarkModeToggle from './DarkModeToggle';
import UserImage from './UserImage';

const SettingsModal = ({ visible, onClose, isDarkMode, toggleDarkMode, language, changeLanguage, userImage, userName }) => {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={[styles.modalContainer, { backgroundColor: colors.backdrop }]}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>הגדרות</Text>

          <UserImage userImage={userImage} userName={userName} />
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <LanguagePicker language={language} changeLanguage={changeLanguage} />

          <Button mode="contained" onPress={onClose} color={colors.primary}>
            סגור
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default SettingsModal;
