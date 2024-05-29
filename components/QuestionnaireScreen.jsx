import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const QuestionnaireScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [questionnaire, setQuestionnaire] = useState(null);
  const [questionnaireData, setQuestionnaireData] = useState([]);
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionnaireResponse = await axios.get(`${API_BASE_URL}/questionnaire/1`); // Replace 1 with the appropriate user ID
        const questionnaireDataResponse = await axios.get(`${API_BASE_URL}/questionnairedata/${questionnaireResponse.data.id}`);

        setQuestionnaire(questionnaireResponse.data);
        setQuestionnaireData(questionnaireDataResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestionIndex === questionnaireData.length - 1) {
      setIsSurveyCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
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
            {question.answer && (
              <Picker.Item
                label={question.answer}
                value={question.answer}
                style={styles.pickerItem}
              />
            )}
          </Picker>
        );
      case 'fill-in':
        return (
          <View style={styles.fillInContainer}>
            <TextInput
              value={textInput}
              onChangeText={setTextInput}
              style={styles.fillInInput}
              placeholder="Enter your answer"
              placeholderTextColor="#999"
            />
            <Button
              title="Submit"
              onPress={handleTextInput}
              color="#fff"
              style={styles.fillInButton}
            />
          </View>
        );
      case 'button':
      default:
        return question.answer && (
          <Button
            title={question.answer}
            onPress={() => handleAnswer(question.answer)}
            color="#fff"
          />
        );
    }
  };

  useEffect(() => {
    if (isSurveyCompleted) {
      navigation.navigate('ResultScreen');
    }
  }, [isSurveyCompleted, navigation]);

  return (
    <View style={styles.container}>
      {questionnaire && questionnaireData.length > 0 && currentQuestionIndex < questionnaireData.length && (
        <>
          <Progress.Bar
            progress={(currentQuestionIndex + 1) / questionnaireData.length}
            width={200}
            color="#fff"
          />
          <Text style={styles.question}>
            {questionnaireData[currentQuestionIndex].question_text}
          </Text>
          {console.log('currentQuestionIndex:', currentQuestionIndex)}
          {console.log('current question:', questionnaireData[currentQuestionIndex])}
          {renderQuestion(questionnaireData[currentQuestionIndex])}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  fillInInput: {
    flex: 1,
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: '#fff',
    marginRight: 10,
  },
  fillInButton: {
    height: 40,
  },
});

export default QuestionnaireScreen;