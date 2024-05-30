import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const TalkCoach = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (message.trim() === '') return; // Don't send empty messages

    try {
      // Send the user's message to your Flask backend
      const response = await axios.post('http://localhost:5000/api/chat', { message });

      // Handle the response from the backend
      const claudeResponse = response.data.response;

      // Add the user's message and Claude's response to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: message },
        { sender: 'claude', text: claudeResponse },
      ]);

      setMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error communicating with the backend:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Talk to a Coach</Text>
      <View style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              msg.sender === 'user' ? styles.userMessage : styles.claudeMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: '#333333',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  claudeMessage: {
    backgroundColor: '#555555',
    alignSelf: 'flex-start',
    marginRight: 'auto',
  },
  messageText: {
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#333333',
    color: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#333333',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default TalkCoach;