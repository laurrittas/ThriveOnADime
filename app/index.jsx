
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Index, { handleStartQuestionnaire } from '/Users/new/Downloads/Projects/thriveona/thriveonadime/app/index.jsx';
import QuestionnaireScreen from '/Users/new/Downloads/Projects/thriveona/thriveonadime/components/QuestionnaireScreen.jsx';
// import ResultScreen from './Users/new/Downloads/Projects/thriveona/thriveonadime/components/ResultScreen.jsx';
// import AICoachScreen from './components/AICoachScreen';
// import ForumScreen from './components/ForumScreen';
// import ThreadScreen from './components/ThreadScreen';
// import Home from './components/HomeScreen';
import Home from '../components/HomeScreen';
import ResultScreen from '../components/ResultScreen';
import AICoachScreen from '../components/AiCoachScreen';
import ForumScreen from '../components/ForumScreen';
import ThreadScreen from '../components/ThreadScreen';



const Stack = createNativeStackNavigator();


const Index = () => {
  console.log( Stack ); // This will log the navigation prop

  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        // initialParams={{ handleStartQuestionnaire }}
      />
      <Stack.Screen name="QuestionnaireScreen" component={QuestionnaireScreen} />
      {/* <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="AICoach" component={AICoachScreen} />
      <Stack.Screen name="Forum" component={ForumScreen} />
      <Stack.Screen name="Thread" component={ThreadScreen} /> */}
    </Stack.Navigator>
  )
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

export default Index;