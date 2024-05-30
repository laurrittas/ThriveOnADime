import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend URL

const UserHome = ({ navigation }) => {
  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleAccountPress = () => {
    setShowAccountModal(true);
  };

  const handleDeleteAccount = async () => {
    try {
      // Assuming you have a logged-in user's ID or some way to identify the user
      const userId = '1'; // Replace with the actual user ID

      const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
      if (response.status === 200) {
        console.log('Account deleted successfully:', response.data);
        // Navigate back to the landing page or perform any other necessary actions
        navigation.navigate('LandingPage');
      } else {
        console.error('Failed to delete account:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };


  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('userData');
  
      // Use react-navigation's useNavigation hook to get the navigation object
      const navigation = useNavigation();
  
      // Navigate to the landing page (replace 'LandingPage' with the name of your landing page)
      navigation.reset({
        index: 0,
        routes: [{ name: 'LandingPage' }],
      });
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };
  const handleSchedulePress = () => {
    navigation.navigate('ScheduleCoach'); // Navigate to the ScheduleCoach screen
  };

  const handleTalkPress = () => {
    navigation.navigate('TalkCoach'); // Navigate to the TalkCoach screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.accountIcon} onPress={handleAccountPress}>
        <Ionicons name="person-circle-outline" size={32} color="white" />
      </TouchableOpacity>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={handleSchedulePress}>
          <Text style={styles.tabText}>Schedule with a coach</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={handleTalkPress}>
          <Text style={styles.tabText}>Talk to a coach</Text>
        </TouchableOpacity>
      </View>
      {showAccountModal && (
        <View style={styles.accountModal}>
          <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
            <Text style={styles.modalButtonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() =>
              Alert.alert(
                'Delete Account',
                'Are you sure you want to delete your account?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', onPress: handleDeleteAccount, style: 'destructive' },
                ]
              )
            }
          >
            <Text style={styles.modalButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333333',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  tabText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountModal: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default UserHome;