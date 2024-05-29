import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SchedulerScreen = () => {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    // Fetch coaches from the backend
    axios.get('/api/coaches')
      .then(response => setCoaches(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCoachSelection = (coach) => {
    setSelectedCoach(coach);
    // Fetch available slots for the selected coach
    axios.get(`/api/coaches/${coach.id}/availability`)
      .then(response => setAvailableSlots(response.data))
      .catch(error => console.error(error));
  };

  const handleSlotSelection = (slot) => {
    // Book the selected slot for the user
    axios.post('/api/appointments', {
      userId: /* your user ID */,
      coachId: selectedCoach.id,
      slotId: slot.id,
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <View>
      <FlatList
        data={coaches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCoachSelection(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedCoach && (
        <View>
          <Text>Selected Coach: {selectedCoach.name}</Text>
          <FlatList
            data={availableSlots}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSlotSelection(item)}>
                <Text>{item.startTime} - {item.endTime}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default SchedulerScreen;