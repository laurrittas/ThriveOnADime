import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from '../components/LandingPage'; // Add the correct path to your LandingPage
import Home from '../components/HomeScreen';
import QuestionnaireScreen from '../components/QuestionnaireScreen';
// import ResultScreen from '../components/ResultScreen';
import AICoachScreen from '../components/AiCoachScreen';
import ForumScreen from '../components/ForumScreen';
import ThreadScreen from '../components/ThreadScreen';

const Stack = createNativeStackNavigator();

const Index = () => {
  console.log(Stack); // This will log the navigation prop

  return (
    <Stack.Navigator initialRouteName="LandingPage">
      <Stack.Screen 
        name="LandingPage" 
        component={LandingPage} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Home" 
        component={Home} 
      />
      <Stack.Screen 
        name="QuestionnaireScreen" 
        component={QuestionnaireScreen} 
      />
      {/* <Stack.Screen 
        name="ResultScreen" 
        component={ResultScreen} 
      /> */}
      {/* <Stack.Screen 
        name="AICoachScreen" 
        component={AICoachScreen} 
      /> */}
      <Stack.Screen 
        name="ForumScreen" 
        component={ForumScreen} 
      />
      <Stack.Screen 
        name="ThreadScreen" 
        component={ThreadScreen} 
      />
    </Stack.Navigator>
  );
};

export default Index;
