import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';

const ScheduleCoach = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState('');

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleBookAppointment = () => {
    if (selectedDate && name) {
      alert(`Appointment booked for ${name} on ${selectedDate}`);
    } else {
      alert('Please select a date and enter your name');
    }
  };

  return (
    <View>
      <Calendar onDayPress={handleDayPress} />
      {selectedDate && <Text>Selected date: {selectedDate}</Text>}
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Book Appointment" onPress={handleBookAppointment} />
    </View>
  );
};

export default ScheduleCoach;