import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { Modal } from 'react-native';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend URL

const LandingPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const userData = {
        username,
        password,
      };
      const response = await axios.post(`${API_BASE_URL}/account/signin`, userData);
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        // Navigate to the HomeScreen after successful login
        navigation.navigate('Home');
      } else {
        console.error('Login failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      const userData = {
        username,
        email,
        password,
      };
      const response = await axios.post(`${API_BASE_URL}/account/create`, userData);
      if (response.status === 201) {
        console.log('Sign up successful:', response.data);
        // Navigate to the HomeScreen after successful sign-up
        navigation.navigate('Home');
      } else {
        console.error('Sign up failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleForgotPassword = async () => {
    if (newPassword !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
      const response = await axios.patch(`${API_BASE_URL}/user/1`, { password: newPassword });
      if (response.status === 200) {
        console.log('Password update successful:', response.data);
        setModalVisible(false);
      } else {
        console.error('Password update failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>THRIVE ON A DIME</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#FFFFFF"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#FFFFFF"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#FFFFFF"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Forgot Password</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalinput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.modalinput}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.modalinput}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#9B51E0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalInput: {
    width: '80%', // Adjust this value as needed
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  
});

export default LandingPage;