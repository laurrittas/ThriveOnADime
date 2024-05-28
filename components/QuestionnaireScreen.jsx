import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import * as Progress from 'react-native-progress';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';


const questions = [
  {
    type: "picker",
    question: "What Brings You Here?",
    answers: ["A recent life change", "I'm just exploring"]
  },
  {
    type: "picker",
    question: "Which aspect of your life has been impacted by this change?",
    answers: ["Love", "Work", "Money", "Family", "Health", "Friends", "Other"]
  },
  {
    type: "picker",
    question: "Have you ever recieved any of these coaching services before?",
    answers: ["Relationship Coaching", "Career Coaching", "Life Coaching", "Health Coaching","Other","I have not recieved coaching services before"]
  },
  {
    type: "picker",
    question: "Have you ever recieved any of these Metaphysical services before?",
    answers: ["Astrology", "Phsycic", "Hypnotherapy", "Health Coaching","Tarot Reading", "I have not recieved coaching services before"]
  },
  {
    type: "picker",
    question: "What are you most interested in recieving now?",
    answers: ["Relationship Coaching", "Career Coaching", "Life Coaching", "Health Coaching","Astrology Reading", "Phsycic Reading", "Hypnotherapy Session","Tarot Reading", "Other"]
  },
  {
    type: "fill-in",
    question: "If you selcted other what are you looking for?",
    // answers: ["Relationship Coaching", "Career Coaching", "Life Coaching", "Health Coaching","Astrology Reading", "Phsycic Reading", "Hypnotherapy Session","Tarot Reading", "Other"]
  },
  {
    type: "fill-in",
    question: "Is there anything else we should know?",
    // answers: ["Relationship Coaching", "Career Coaching", "Life Coaching", "Health Coaching","Astrology Reading", "Phsycic Reading", "Hypnotherapy Session","Tarot Reading", "Other"]
  },
];

const QuestionnaireScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [textInput, setTextInput] = useState('');

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
      <Progress.Bar progress={(currentQuestionIndex + 1) / questions.length} width={200} color="#fff" />
      <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
      {renderQuestion(questions[currentQuestionIndex])}
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