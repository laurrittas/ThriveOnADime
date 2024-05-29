import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const ResultScreen = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate('SchedulerScreen');
  };

  return (
    <View style={styles.container}>
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
      <Text style={styles.congratsText}>
        Congratulations, we will now pair you to a coach!
      </Text>
      <Button
        title="Continue"
        onPress={handleContinue}
        color="#fff"
        style={styles.continueButton}
      />
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
  congratsText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  continueButton: {
    marginTop: 20,
  },
});

export default ResultScreen;