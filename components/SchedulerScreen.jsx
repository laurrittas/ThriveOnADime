import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SchedulerScreen = () => {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [userAvailability, setUserAvailability] = useState([]);
  const [coachAvailability, setCoachAvailability] = useState([]);
  const [matchedSlots, setMatchedSlots] = useState([]);

  useEffect(() => {
    // Fetch coaches from the backend
    axios.get('/api/coaches')
      .then(response => setCoaches(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCoachSelection = (coach) => {
    setSelectedCoach(coach);
    // Fetch user availability
    axios.get(`/api/users/${user.id}/availability`)
      .then(response => setUserAvailability(response.data))
      .catch(error => console.error(error));

    // Fetch coach availability
    axios.get(`/api/coaches/${coach.id}/availability`)
      .then(response => setCoachAvailability(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    // Find matched slots between user and coach availability
    const matchedSlots = userAvailability.filter(userSlot =>
      coachAvailability.some(coachSlot =>
        userSlot.startTime >= coachSlot.startTime &&
        userSlot.endTime <= coachSlot.endTime
      )
    );
    setMatchedSlots(matchedSlots);
  }, [userAvailability, coachAvailability]);

  const handleSlotSelection = (slot) => {
    // Book the selected slot for the user
    axios.post('/api/appointments', {
      userId: user.id,
      coachId: selectedCoach.id,
      userAvailabilityId: slot.id,
      coachAvailabilityId: coaches.id,
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
            data={matchedSlots}
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