import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/users'; // Replace with your local IP address

// Axios request interceptor
axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

// Axios response interceptor
axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.error('Response Error:', error);
  return Promise.reject(error);
});

const LandingPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in both email and password');
      return;
    }

    try {
      const userData = { email, password };
      const response = await axios.post(`${API_BASE_URL}/login`, userData);
      console.log('Login successful:', response.data);
      // Navigate to the HomeScreen after successful login
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', `Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleSignUp = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in both email and password');
      return;
    }

    try {
      const userData = { email, password };
      const response = await axios.post(`${API_BASE_URL}/users`, userData);
      console.log('Sign up successful:', response.data);
      // Navigate to the HomeScreen after successful sign-up
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Error', `Sign up failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>THRIVE ON A DIME</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
  signUpButton: {
    backgroundColor: '#6A1B9A',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LandingPage;
