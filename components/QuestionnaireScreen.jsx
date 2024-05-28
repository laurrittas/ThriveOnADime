import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend URL

const QuestionnaireScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/questionnairedata`)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleTextInput = () => {
    handleAnswer(textInput);
    setTextInput('');
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'dropdown':
        return (
          <Picker
            selectedValue={answers[currentQuestionIndex]}
            onValueChange={(itemValue) => handleAnswer(itemValue)}
            style={styles.picker}
          >
            {question.answers.map((answer, index) => (
              <Picker.Item key={index} label={answer} value={answer} style={styles.pickerItem} />
            ))}
          </Picker>
        );
      case 'fill-in':
        return (
          <View style={styles.fillInContainer}>
            <TextInput
              value={textInput}
              onChangeText={setTextInput}
              onSubmitEditing={handleTextInput}
              style={styles.fillInInput}
              placeholder="Enter your answer"
              placeholderTextColor="#999"
            />
            <Button title="Submit" onPress={handleTextInput} color="#fff" />
          </View>
        );
      case 'button':
      default:
        return question.answers.map((answer, index) => (
          <Button key={index} title={answer} onPress={() => handleAnswer(answer)} color="#fff" />
        ));
    }
  };

  return (
    <View style={styles.container}>
      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <>
          <Progress.Bar progress={(currentQuestionIndex + 1) / questions.length} width={200} color="#fff" />
          <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
          {renderQuestion(questions[currentQuestionIndex])}
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  question: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    color: '#fff',
  },
  pickerItem: {
    color: '#fff',
  },
  fillInContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fillInInput: {
    flex: 1,
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
});

export default QuestionnaireScreen;