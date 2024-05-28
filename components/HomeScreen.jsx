import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Home = ({ navigation }) => {
  const handleStartQuestionnaire = () => {
    navigation.navigate('QuestionnaireScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thrive On A Dime</Text>
      <TouchableOpacity style={styles.banner} onPress={handleStartQuestionnaire}>
        <Text style={styles.bannerText}>Start Questionnaire</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  banner: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default Home;
