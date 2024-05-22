import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const ForumScreen = ({ navigation }) => {
  // Dummy data for forum topics
  const topics = [
    { id: 1, name: 'Topic 1' },
    { id: 2, name: 'Topic 2' },
    // ... add more topics here
  ];

  const renderTopic = ({ item }) => (
    <Button
      title={item.name}
      onPress={() => navigation.navigate('Thread', { topicId: item.id })}
    />
  );

  return (
    <View>
      <Text>Forum Screen</Text>
      <FlatList
        data={topics}
        renderItem={renderTopic}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ForumScreen;