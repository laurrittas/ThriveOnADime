import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from '../components/LandingPage'; // Add the correct path to your LandingPage
import Home from '../components/HomeScreen';
import QuestionnaireScreen from '../components/QuestionnaireScreen';
// import ResultScreen from '../components/ResultScreen';
import AICoachScreen from '../components/AiCoachScreen';
import ForumScreen from '../components/ForumScreen';
import ThreadScreen from '../components/ThreadScreen';
import ResultScreen from '../components/ResultScreen';
import SchedulerScreen from '../components/SchedulerScreen';
import UserHome from '../components/UserHome';
import TalkCoach from '../components/TalkCoach';
import ScheduleCoach from '../components/ScheduleCoach';

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
      <Stack.Screen 
        name="ResultScreen" 
        component={ResultScreen} 
      />
      <Stack.Screen 
        name="SchedulerScreen" 
        component={SchedulerScreen} 
      />
      <Stack.Screen 
        name="ScheduleCoach" 
        component={ScheduleCoach} 
      />
          <Stack.Screen 
        name="UserHome" 
        component={UserHome} 
      />
      <Stack.Screen 
        name="TalkCoach" 
        component={TalkCoach} 
      />
    </Stack.Navigator>
  );
};

export default Index;
